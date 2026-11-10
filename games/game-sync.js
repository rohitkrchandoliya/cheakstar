// Cheakstar — game progress account sync, shared module.
// When a visitor is signed in, this adapter mirrors the games'
// on-device progress (the cgx store, keys "cheakstar.games.<slug>.<key>")
// into their account in Supabase table public.user_game_progress, so
// bests, saved games and settings follow them across devices. Signed
// out, it does nothing at all: games keep their progress on the device,
// exactly as they always have.
//
// Design rules:
//   * Fail-soft, always. Every network or storage failure leaves the
//     game fully playable on local storage. Nothing here may throw,
//     and nothing here ever shows UI.
//   * Guest mode makes ZERO network requests. The adapter only wakes
//     up when a stored sign-in session exists on this origin.
//   * Downloads go through cgx.store.applyRemote(), which never fires
//     the sync notification, so a pull can never echo back as a push.
//   * The publishable key below is public by design (the same value
//     the site's auth.js ships). Row-level security on the table is
//     what protects the data: a signed-in user can only ever touch
//     their own rows. No secret key is used anywhere in this file.
//
// Pages opt in with one script tag after the cgx layer:
//   <script src="../game-sync.js"></script>
(function () {
  "use strict";
  if (window.CSGameSync) return;

  var VERSION = "1.0.0";
  var SUPABASE_URL = "https://otubxsildmovyopebxvg.supabase.co";
  var SUPABASE_KEY = "sb_publishable_MWBG3vuN6lN196eihsPlAQ_7nhldag_";
  var SESSION_KEY = "sb-otubxsildmovyopebxvg-auth-token";
  var TABLE_PATH = "/rest/v1/user_game_progress";
  var STORE_PREFIX = "cheakstar.games.";
  var META_KEY = "cheakstar.gamesync.meta";
  var MAX_VALUE_BYTES = 64 * 1024;
  var DEBOUNCE_MS = 800;

  /* ---------- diagnostics surface ----------
     Read-only status for support and testing. It changes no behaviour
     and holds no data beyond the state name and the last sync time. */
  var status = "guest"; // guest | syncing | synced | offline-softfail
  var lastSyncAt = null;
  window.CSGameSync = {
    version: VERSION,
    state: function () {
      return { status: status, lastSync: lastSyncAt };
    }
  };
  function markSynced() {
    status = "synced";
    lastSyncAt = new Date().toISOString();
  }
  function markSoftfail() { status = "offline-softfail"; }

  /* ---------- local storage helpers (fail-soft) ---------- */
  function lsGet(k) {
    try { return window.localStorage.getItem(k); } catch (e) { return null; }
  }
  function lsSet(k, v) {
    try { window.localStorage.setItem(k, v); } catch (e) {}
  }

  /* ---------- small pure helpers ---------- */
  // Canonical JSON text: parse and re-serialise, so a value read back
  // from the database compares equal to the same value written locally
  // even though the database does not preserve key order or spacing.
  function canon(json) {
    try { return JSON.stringify(JSON.parse(json)); } catch (e) { return json; }
  }
  function hashOf(json) {
    var s = canon(json), h = 0x811c9dc5, i;
    for (i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 0x01000193);
    }
    return ("0000000" + (h >>> 0).toString(16)).slice(-8);
  }
  function byteLen(s) {
    try { return unescape(encodeURIComponent(s)).length; } catch (e) { return s.length; }
  }
  // "cheakstar.games.solitaire.state" -> { slug: "solitaire", item: "state" }.
  // The split is on the FIRST dot after the prefix: slugs contain
  // dashes, never dots, and item keys may themselves contain dots.
  function parseKey(fullKey) {
    if (typeof fullKey !== "string" || fullKey.indexOf(STORE_PREFIX) !== 0) return null;
    var rest = fullKey.slice(STORE_PREFIX.length);
    var dot = rest.indexOf(".");
    if (dot <= 0 || dot === rest.length - 1) return null;
    return { slug: rest.slice(0, dot), item: rest.slice(dot + 1) };
  }

  /* ---------- sync meta ----------
     One record in local storage: for each synced key, the hash of the
     value both sides agreed on at the last sync, the account copy's
     updated_at at that moment, and when the local copy last changed
     (reported by the cgx sync notification). That is all the merge
     needs to tell "I changed", "the account changed" and "both
     changed" apart. */
  var meta = {};
  function loadMeta() {
    var raw = lsGet(META_KEY), m = null;
    meta = {};
    if (!raw) return;
    try { m = JSON.parse(raw); } catch (e) { m = null; }
    if (m && typeof m === "object") meta = m;
  }
  function saveMeta() { lsSet(META_KEY, JSON.stringify(meta)); }

  /* ---------- session ----------
     The site's sign-in (supabase-js) stores its session as JSON under
     SESSION_KEY on this same origin, so a game page can read it
     directly: access_token, refresh_token, expires_at (unix seconds)
     and user.id. Anything missing or unreadable means "signed out". */
  function readSession() {
    var raw = lsGet(SESSION_KEY), s = null;
    if (!raw) return null;
    try { s = JSON.parse(raw); } catch (e) { return null; }
    if (!s || typeof s !== "object") return null;
    if (typeof s.access_token !== "string" || !s.access_token) return null;
    if (!s.user || typeof s.user.id !== "string" || !s.user.id) return null;
    return s;
  }
  function sessionExpired(s) {
    if (!s.expires_at) return false; // no expiry recorded: try it as-is
    return s.expires_at * 1000 <= Date.now() + 10000;
  }
  // One refresh attempt. On success the fresh session is stored back
  // under the same key in the same shape supabase-js uses, so the rest
  // of the site sees the refreshed sign-in too.
  function refreshSession(sess, done) {
    var p;
    try {
      p = window.fetch(SUPABASE_URL + "/auth/v1/token?grant_type=refresh_token", {
        method: "POST",
        headers: { "apikey": SUPABASE_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token: sess.refresh_token })
      });
    } catch (e) { done(null); return; }
    p.then(function (res) {
      if (!res.ok) return null;
      return res.json();
    }).then(function (j) {
      if (!j || !j.access_token || !j.user || !j.user.id) { done(null); return; }
      lsSet(SESSION_KEY, JSON.stringify(j));
      done(j);
    }).catch(function () { done(null); });
  }

  /* ---------- REST calls ---------- */
  var token = null;
  var userId = null;
  var ready = false; // true once a usable access token is in hand

  function apiFetch(method, path, bodyObj, done) {
    var headers = {
      "apikey": SUPABASE_KEY,
      "Authorization": "Bearer " + token
    };
    var opts = { method: method, headers: headers };
    if (method === "POST") headers["Prefer"] = "resolution=merge-duplicates,return=minimal";
    if (bodyObj !== null && bodyObj !== undefined) {
      headers["Content-Type"] = "application/json";
      opts.body = JSON.stringify(bodyObj);
    }
    var p;
    try { p = window.fetch(SUPABASE_URL + path, opts); }
    catch (e) { done(new Error("fetch unavailable")); return; }
    p.then(function (res) {
      if (!res.ok) { done(new Error("HTTP " + res.status)); return null; }
      if (res.status === 204) { done(null, null); return null; }
      return res.text().then(function (t) {
        if (!t) { done(null, null); return; }
        var j = null;
        try { j = JSON.parse(t); } catch (e) { done(new Error("bad JSON")); return; }
        done(null, j);
      });
    }).catch(function (e) { done(e || new Error("network error")); });
  }

  /* ---------- outgoing queue ----------
     One slot per key, newest value wins, sent after a short debounce
     so a burst of writes becomes one request. A queued snapshot is
     only sent while it still matches the value in local storage; if
     the local value moved on without a new notification (a merge
     download overwrote it), the snapshot is stale and is dropped. */
  var pending = {}; // fullKey -> { json: string|null, timer: id|null }

  function queueOp(fullKey, jsonOrNull) {
    var p = pending[fullKey];
    if (!p) { p = pending[fullKey] = { json: jsonOrNull, timer: null }; }
    p.json = jsonOrNull;
    if (p.timer) { clearTimeout(p.timer); p.timer = null; }
    p.timer = setTimeout(function () {
      p.timer = null;
      sendOp(fullKey);
    }, DEBOUNCE_MS);
  }
  function requeue(fullKey, jsonOrNull) {
    // A failed send keeps its slot without a timer. It goes out with
    // the next flush, and the load-time merge on any later page view
    // reconciles whatever is left, so nothing is ever lost silently.
    var p = pending[fullKey];
    if (!p) pending[fullKey] = { json: jsonOrNull, timer: null };
    else if (!p.timer) p.json = jsonOrNull;
  }
  function sendNow(fullKey, jsonOrNull) {
    var p = pending[fullKey];
    if (!p) { p = pending[fullKey] = { json: jsonOrNull, timer: null }; }
    else {
      p.json = jsonOrNull;
      if (p.timer) { clearTimeout(p.timer); p.timer = null; }
    }
    sendOp(fullKey);
  }
  function sendOp(fullKey) {
    var p = pending[fullKey];
    if (!p) return;
    if (!ready) return; // flushPending() sends it once the token lands
    var parsed = parseKey(fullKey);
    if (!parsed) { delete pending[fullKey]; return; }
    var json = p.json;
    var current = lsGet(fullKey);
    // Staleness guard: never push a snapshot local storage has left
    // behind, and never delete a value that has come back locally.
    if (json === null ? current !== null : current !== json) {
      delete pending[fullKey];
      return;
    }
    delete pending[fullKey];
    if (json === null) {
      var delPath = TABLE_PATH +
        "?user_id=eq." + encodeURIComponent(userId) +
        "&game_slug=eq." + encodeURIComponent(parsed.slug) +
        "&item_key=eq." + encodeURIComponent(parsed.item);
      apiFetch("DELETE", delPath, null, function (err) {
        if (err) { markSoftfail(); requeue(fullKey, null); return; }
        delete meta[fullKey];
        saveMeta();
        markSynced();
      });
      return;
    }
    if (byteLen(json) > MAX_VALUE_BYTES) return; // oversized: local-only
    var value;
    try { value = JSON.parse(json); } catch (e) { return; }
    var nowIso = new Date().toISOString();
    var row = {
      user_id: userId,
      game_slug: parsed.slug,
      item_key: parsed.item,
      value: value,
      updated_at: nowIso
    };
    apiFetch("POST", TABLE_PATH, [row], function (err) {
      if (err) { markSoftfail(); requeue(fullKey, json); return; }
      meta[fullKey] = { hash: hashOf(json), remoteAt: nowIso, localModAt: null };
      saveMeta();
      markSynced();
    });
  }
  function flushPending() {
    var k;
    for (k in pending) {
      if (Object.prototype.hasOwnProperty.call(pending, k)) sendOp(k);
    }
  }

  /* ---------- load-time merge ----------
     The account and this device each hold some keys. The meta record
     says which side changed since the last sync; where neither side
     has a meta entry yet (the first sync), an account copy wins a
     conflict, and device-only keys upload — so progress earned as a
     guest is carried into a fresh account untouched, while progress
     already in the account is never overwritten by an older device. */
  function localGameKeys() {
    var out = [], i, k;
    try {
      for (i = 0; i < window.localStorage.length; i++) {
        k = window.localStorage.key(i);
        if (k && k.indexOf(STORE_PREFIX) === 0 && parseKey(k)) out.push(k);
      }
    } catch (e) {}
    return out;
  }
  function downloadNow(fullKey, remoteJson, updatedAt) {
    window.cgx.store.applyRemote(fullKey, canon(remoteJson));
    meta[fullKey] = { hash: hashOf(remoteJson), remoteAt: updatedAt || null, localModAt: null };
  }
  function mergeOne(fullKey, localJson, remoteEntry) {
    var remoteJson = remoteEntry ? remoteEntry.json : null;
    // Oversized values are out of sync's reach in both directions.
    if (localJson !== null && byteLen(localJson) > MAX_VALUE_BYTES) return;
    if (remoteJson !== null && byteLen(remoteJson) > MAX_VALUE_BYTES) return;

    var m = meta[fullKey] || null;
    var localHash = localJson !== null ? hashOf(localJson) : null;
    var remoteHash = remoteJson !== null ? hashOf(remoteJson) : null;

    if (localJson === null && remoteJson === null) return;

    if (remoteJson === null) {
      // Device only. If meta says this exact value was already synced
      // and the account row has since vanished, another device deleted
      // it: follow the account and remove the local copy.
      if (m && m.hash !== null && m.hash === localHash) {
        window.cgx.store.applyRemote(fullKey, null);
        delete meta[fullKey];
        return;
      }
      sendNow(fullKey, localJson); // first sync or changed locally: upload
      return;
    }
    if (localJson === null) {
      // Account only. If meta says this exact value was synced before
      // and it is now missing here, it was deleted on this device:
      // delete the account row too.
      if (m && m.hash !== null && m.hash === remoteHash) {
        sendNow(fullKey, null);
        delete meta[fullKey];
        return;
      }
      downloadNow(fullKey, remoteJson, remoteEntry.updatedAt);
      return;
    }
    // Both sides hold the key.
    if (localHash === remoteHash) {
      meta[fullKey] = { hash: localHash, remoteAt: remoteEntry.updatedAt, localModAt: null };
      return;
    }
    if (!m || m.hash === null) {
      // First sync for this key: the account copy wins the conflict.
      downloadNow(fullKey, remoteJson, remoteEntry.updatedAt);
      return;
    }
    var localChanged = m.hash !== localHash;
    var remoteChanged = m.hash !== remoteHash;
    if (localChanged && !remoteChanged) { sendNow(fullKey, localJson); return; }
    if (remoteChanged && !localChanged) { downloadNow(fullKey, remoteJson, remoteEntry.updatedAt); return; }
    if (localChanged && remoteChanged) {
      // Both moved: the newer change wins.
      var localAt = m.localModAt || 0;
      var remoteAt = remoteEntry.updatedAt ? Date.parse(remoteEntry.updatedAt) : 0;
      if (localAt > remoteAt) { sendNow(fullKey, localJson); return; }
      downloadNow(fullKey, remoteJson, remoteEntry.updatedAt);
      return;
    }
    // The hashes differ yet neither side moved against meta (a stale
    // meta hash from an older representation): the account copy wins.
    downloadNow(fullKey, remoteJson, remoteEntry.updatedAt);
  }
  function merge(rows) {
    var remote = {}, i, r, fk;
    for (i = 0; i < rows.length; i++) {
      r = rows[i];
      if (!r || typeof r.game_slug !== "string" || typeof r.item_key !== "string") continue;
      if (r.value === null || r.value === undefined) continue; // a null row carries nothing
      fk = STORE_PREFIX + r.game_slug + "." + r.item_key;
      remote[fk] = { json: JSON.stringify(r.value), updatedAt: r.updated_at || null };
    }
    var seen = {}, all = [], keys = localGameKeys();
    for (i = 0; i < keys.length; i++) { seen[keys[i]] = true; all.push(keys[i]); }
    for (fk in remote) {
      if (Object.prototype.hasOwnProperty.call(remote, fk) && !seen[fk]) {
        seen[fk] = true;
        all.push(fk);
      }
    }
    for (i = 0; i < all.length; i++) {
      mergeOne(all[i], lsGet(all[i]), remote[all[i]] || null);
    }
    saveMeta();
  }
  function initialSync() {
    status = "syncing";
    var path = TABLE_PATH +
      "?user_id=eq." + encodeURIComponent(userId) +
      "&select=game_slug,item_key,value,updated_at";
    apiFetch("GET", path, null, function (err, rows) {
      if (err || !rows || Object.prototype.toString.call(rows) !== "[object Array]") {
        markSoftfail();
        return;
      }
      merge(rows);
      flushPending();
      markSynced();
    });
  }

  /* ---------- live writes ----------
     cgx calls this after every local set/remove, with the full key
     and the stored JSON text (or null after a remove). Record when it
     changed for the merge, then let the queue debounce and send. */
  function onLocalWrite(fullKey, jsonOrNull) {
    if (!parseKey(fullKey)) return;
    var m = meta[fullKey];
    if (!m) { m = meta[fullKey] = { hash: null, remoteAt: null, localModAt: null }; }
    m.localModAt = Date.now();
    saveMeta();
    queueOp(fullKey, jsonOrNull);
  }

  /* ---------- start ---------- */
  function start() {
    if (!window.cgx || !window.cgx.store ||
        typeof window.cgx.store.registerSync !== "function" ||
        typeof window.cgx.store.applyRemote !== "function") {
      return; // no shared layer on this page: nothing to sync, ever
    }
    var sess = readSession();
    if (!sess) return; // signed out: status stays "guest", zero requests
    loadMeta();
    status = "syncing";
    // Register before the first network call so writes made while the
    // token is being sorted out are queued, not lost.
    try { window.cgx.store.registerSync(onLocalWrite); } catch (e) {}
    userId = sess.user.id;
    token = sess.access_token;
    if (!sessionExpired(sess)) {
      ready = true;
      initialSync();
      return;
    }
    if (!sess.refresh_token) { status = "offline-softfail"; return; }
    refreshSession(sess, function (fresh) {
      if (!fresh) { status = "offline-softfail"; return; }
      token = fresh.access_token;
      userId = fresh.user.id;
      ready = true;
      initialSync();
    });
  }
  try { start(); } catch (e) { /* a sync failure must never break a game */ }
})();
