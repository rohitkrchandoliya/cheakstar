// Cheakstar Rewards — active-time points tracker.
// Earns 1 point per full minute of GENUINE activity on the site:
// the tab must be visible and the visitor must actually be doing
// something (mouse, keyboard, scroll, touch or game input). Idle
// time never counts. Only one tab earns at a time. Points have no
// cash value; they are recognition and rank only.
// Failure-isolated: if the rewards service cannot be reached, the
// website works exactly as before and nothing is shown as broken.
(function () {
  "use strict";
  if (window.CSRewards) return; // load once

  var REST = "https://otubxsildmovyopebxvg.supabase.co/rest/v1/";
  var KEY = "sb_publishable_MWBG3vuN6lN196eihsPlAQ_7nhldag_";
  var SESSION_KEY = "sb-otubxsildmovyopebxvg-auth-token";
  var GUEST_KEY = "csGuestTime";
  var LEAD_KEY = "csRewardLead";
  var IDLE_MS = 60000;        // 60 s without activity = paused
  var SEND_AFTER = 30;        // flush every 30 earned seconds
  var DAY_CAP_MIN = 240;      // max 240 points/day (mirrors server)
  var RANKS = [               // MUST match rank_for_points() in SQL
    [0, "Newcomer"], [60, "Explorer"], [300, "Tracker"], [900, "Analyst"],
    [2400, "Specialist"], [5000, "Guardian"], [10000, "Sentinel"],
    [20000, "Elite"], [40000, "Master"], [75000, "Legend"]
  ];

  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { window.localStorage.removeItem(k); } catch (e) {} }
  function dayKey() { // Asia/Kolkata calendar day (no DST in IST)
    return new Date(Date.now() + 19800000).toISOString().slice(0, 10);
  }
  function rankFor(points) {
    var name = RANKS[0][1];
    for (var i = 0; i < RANKS.length; i++) if (points >= RANKS[i][0]) name = RANKS[i][1];
    return name;
  }
  function nextRank(points) {
    for (var i = 0; i < RANKS.length; i++) {
      if (points < RANKS[i][0]) return { name: RANKS[i][1], at: RANKS[i][0] };
    }
    return null;
  }

  /* ---------------- session (read-only; CSAuth owns sign-in) ------ */
  function readSession() {
    try {
      var raw = lsGet(SESSION_KEY);
      if (!raw) return null;
      var s = JSON.parse(raw);
      if (!s || !s.access_token || !s.user || !s.user.id) return null;
      if (s.expires_at && s.expires_at * 1000 < Date.now()) return null;
      return s;
    } catch (e) { return null; }
  }

  /* ---------------- guest store (pre-account time) ----------------- */
  function guestLoad() {
    try {
      var g = JSON.parse(lsGet(GUEST_KEY) || "null");
      if (!g || typeof g.sec !== "number") g = { sec: 0, day: dayKey(), daySec: 0 };
      if (g.day !== dayKey()) { g.day = dayKey(); g.daySec = 0; }
      return g;
    } catch (e) { return { sec: 0, day: dayKey(), daySec: 0 }; }
  }
  function guestSave(g) { lsSet(GUEST_KEY, JSON.stringify(g)); }
  // Credit seconds to the guest store under the same daily cap the
  // server uses: seconds past the cap are discarded, not carried over.
  function guestCredit(sec) {
    var g = guestLoad();
    var capSec = DAY_CAP_MIN * 60;
    var room = capSec - g.daySec;
    if (room > 0) {
      var add = Math.min(sec, room);
      g.sec += add; g.daySec += add;
      guestSave(g);
    }
    return g;
  }

  /* ---------------- requests --------------------------------------- */
  function call(path, opts) {
    opts = opts || {};
    var headers = { "apikey": KEY, "Content-Type": "application/json" };
    var s = readSession();
    headers["Authorization"] = "Bearer " + (opts.anon || !s ? KEY : s.access_token);
    if (opts.prefer) headers["Prefer"] = opts.prefer;
    return fetch(REST + path, {
      method: opts.method || "GET",
      headers: headers,
      body: opts.body ? JSON.stringify(opts.body) : undefined,
      keepalive: !!opts.keepalive
    }).then(function (r) {
      if (!r.ok) throw new Error("rewards request failed: " + r.status);
      return r.status === 204 ? null : r.json();
    });
  }
  function rpc(name, args, keepalive) {
    return call("rpc/" + name, { method: "POST", body: args || {}, keepalive: keepalive });
  }

  /* ---------------- tracker state ---------------------------------- */
  var lastActivity = Date.now();
  var buffer = 0;             // earned seconds not yet flushed
  var leader = false;         // only the leader tab earns
  var wasSignedIn = !!readSession();
  var myStatus = null;        // last known server status (signed-in)
  var listeners = [];

  function emit() {
    var snap = snapshot();
    listeners.slice().forEach(function (cb) { try { cb(snap); } catch (e) {} });
  }
  function snapshot() {
    if (readSession() && myStatus) {
      return { signedIn: true, points: myStatus.totalPoints, rank: myStatus.rankTier,
               position: myStatus.position, pointsToday: myStatus.pointsToday,
               showOnLeaderboard: myStatus.showOnLeaderboard };
    }
    if (readSession()) return { signedIn: true, points: null, rank: null };
    var g = guestLoad();
    var pts = Math.floor(g.sec / 60);
    return { signedIn: false, points: pts, rank: rankFor(pts), guestSeconds: g.sec };
  }

  function flush(keepalive) {
    if (!buffer) return;
    var sec = buffer; buffer = 0;
    if (readSession()) {
      rpc("award_active_time", { p_seconds: sec }, keepalive).then(function (rows) {
        refreshStatus();
      }, function () { buffer += sec; }); // retry next cycle
    } else {
      guestCredit(sec);
      emit();
    }
  }

  function refreshStatus() {
    if (!readSession()) { myStatus = null; emit(); return; }
    rpc("my_reward_status", {}).then(function (st) {
      if (st && st.signedIn) { myStatus = st; emit(); }
    }, function () {});
  }

  // After sign-in: sync the display name once, claim any guest time,
  // then load the true status.
  function onSignedIn() {
    var user = (window.CSAuth && window.CSAuth.getUser && window.CSAuth.getUser()) || null;
    var meta = (user && user.user_metadata) || {};
    var name = meta.display_name || null;
    rpc("update_reward_profile", { p_display_name: name, p_show: null }).then(function () {}, function () {});
    var g = guestLoad();
    if (g.sec >= 60) {
      rpc("claim_guest_time", { p_seconds: g.sec }).then(function () {
        lsDel(GUEST_KEY); refreshStatus();
      }, function () { refreshStatus(); });
    } else {
      if (g.sec > 0) lsDel(GUEST_KEY);
      refreshStatus();
    }
  }

  /* ---------------- single-tab leadership -------------------------- */
  var myTabId = Math.random().toString(36).slice(2) + Date.now();
  function leadClaim() {
    try {
      var raw = JSON.parse(lsGet(LEAD_KEY) || "null");
      var now = Date.now();
      if (!raw || raw.id === myTabId || now - raw.at > 8000) {
        lsSet(LEAD_KEY, JSON.stringify({ id: myTabId, at: now }));
        leader = true;
      } else {
        leader = (raw.id === myTabId);
        if (leader) lsSet(LEAD_KEY, JSON.stringify({ id: myTabId, at: now }));
      }
    } catch (e) { leader = true; }
  }
  if (navigator.locks && navigator.locks.request) {
    try {
      navigator.locks.request("cs-rewards-leader", function () {
        leader = true;
        return new Promise(function () {}); // hold for the page lifetime
      });
    } catch (e) { leadClaim(); setInterval(leadClaim, 4000); }
  } else {
    leadClaim(); setInterval(leadClaim, 4000);
  }

  /* ---------------- activity + tick -------------------------------- */
  function poke() { lastActivity = Date.now(); }
  ["pointermove", "pointerdown", "keydown", "scroll", "touchstart", "click"].forEach(function (ev) {
    window.addEventListener(ev, poke, { passive: true });
  });
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) flush(true);
    poke();
  });
  window.addEventListener("pagehide", function () { flush(true); });

  setInterval(function () {
    var signed = !!readSession();
    if (signed !== wasSignedIn) {
      wasSignedIn = signed;
      if (signed) onSignedIn(); else { myStatus = null; emit(); }
    }
    if (!leader || document.hidden) return;
    if (Date.now() - lastActivity > IDLE_MS) return; // idle: no earning
    buffer += 1;
    if (buffer >= SEND_AFTER) flush(false);
  }, 1000);

  if (window.CSAuth && window.CSAuth.onChange) {
    window.CSAuth.onChange(function (user, event) {
      if (event === "SIGNED_IN" && user) { wasSignedIn = true; onSignedIn(); }
      if (event === "SIGNED_OUT") { wasSignedIn = false; myStatus = null; emit(); }
    });
  }
  if (wasSignedIn) onSignedIn();

  /* ---------------- public API -------------------------------------- */
  window.CSRewards = {
    RANKS: RANKS,
    rankFor: rankFor,
    nextRank: nextRank,
    snapshot: snapshot,
    onUpdate: function (cb) {
      if (typeof cb === "function") { listeners.push(cb); cb(snapshot()); }
    },
    // Games and interactive tools call this on real input (canvas keys,
    // moves) so play counts as activity even without page scrolling.
    pingActivity: poke,
    refreshStatus: refreshStatus,
    getLeaderboard: function (limit) {
      return call("leaderboard?select=position,display_name,total_points,rank_tier&order=position.asc&limit=" + (limit || 100), { anon: true })
        .then(function (rows) {
          return (rows || []).map(function (r) {
            return { position: r.position, name: r.display_name, points: r.total_points, rank: r.rank_tier };
          });
        });
    },
    setProfile: function (displayName, show) {
      return rpc("update_reward_profile", {
        p_display_name: (displayName == null ? null : String(displayName)),
        p_show: (show == null ? null : !!show)
      }).then(function () { refreshStatus(); });
    }
  };
})();
