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

  /* Level presentation metadata, parallel to RANKS: one simple
     stroke icon (inner SVG markup for a 24x24 viewBox) and one colour
     per rank. Used by the leaderboard, the account page and the
     floating points card so a level looks the same everywhere. */
  var LEVEL_STYLE = [
    { icon: '<path d="M5.5 18.5C5.5 11 11 5.8 19 5c-.7 8.5-5.5 13.5-13.5 13.5z"/><path d="M5.5 18.5C7.5 13.5 10.5 10 14.5 8"/>', color: "#93a7c4" }, // Newcomer — leaf
    { icon: '<circle cx="12" cy="12" r="8.5"/><path d="M15.2 8.8 13.4 13.4 8.8 15.2 10.6 10.6z"/>', color: "#5b8dd9" }, // Explorer — compass
    { icon: '<circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="0.6"/>', color: "#37a6a0" }, // Tracker — target
    { icon: '<path d="M4 4v15.5h16"/><path d="M8 16v-4.5M12 16V8M16 16v-6.5"/>', color: "#43a673" }, // Analyst — chart
    { icon: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"/>', color: "#8a7fd6" }, // Specialist — gear
    { icon: '<path d="M12 3l7 2.4v5.4c0 4.7-2.9 7.9-7 9.7C7.9 18.7 5 15.5 5 10.8V5.4z"/><path d="M9 11.6l2.2 2.2 3.8-4"/>', color: "#b8912a" }, // Guardian — shield
    { icon: '<path d="M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6z"/><circle cx="12" cy="12" r="2.8"/>', color: "#d4af37" }, // Sentinel — eye
    { icon: '<path d="M12 3.6l2.55 5.2 5.75.8-4.15 4.05 1 5.7L12 16.7l-5.15 2.65 1-5.7L3.7 9.6l5.75-.8z"/>', color: "#e3c565" }, // Elite — star
    { icon: '<path d="M3.5 18 2.6 8.4 8 12l4-6.6L16 12l5.4-3.6L20.5 18z"/><path d="M4 20.8h16"/>', color: "#e08a3c" }, // Master — crown
    { icon: '<path d="M7 4h10l3.4 4.8L12 20.2 3.6 8.8z"/><path d="M3.6 8.8h16.8"/><path d="M8.8 8.8 12 20.2 15.2 8.8"/>', color: "#eec95c" }  // Legend — diamond
  ];
  var LEVELS = RANKS.map(function (r, i) {
    return { at: r[0], name: r[1], icon: LEVEL_STYLE[i].icon, color: LEVEL_STYLE[i].color };
  });
  function levelFor(points) {
    var lv = LEVELS[0];
    for (var i = 0; i < LEVELS.length; i++) if (points >= LEVELS[i].at) lv = LEVELS[i];
    return lv;
  }
  function levelByName(name) {
    for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].name === name) return LEVELS[i];
    return LEVELS[0];
  }
  function iconSvg(name, size) {
    var lv = levelByName(name);
    size = size || 16;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size +
      '" fill="none" stroke="' + lv.color + '" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
      lv.icon + "</svg>";
  }
  function crownSvg(color, size) {
    size = size || 24;
    return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="' + color + '" aria-hidden="true">' +
      '<path d="M3.2 18.4 2.5 8.8 7.9 12.2 12 5.6l4.1 6.6 5.4-3.4-.7 9.6z"/>' +
      '<rect x="3.4" y="19.6" width="17.2" height="1.8" rx="0.9"/></svg>';
  }

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
  function sessionMeta() {
    var s = readSession();
    return (s && s.user && s.user.user_metadata) || {};
  }
  function snapshot() {
    if (readSession() && myStatus) {
      var meta = sessionMeta();
      return { signedIn: true, points: myStatus.totalPoints, rank: myStatus.rankTier,
               position: myStatus.position, pointsToday: myStatus.pointsToday,
               showOnLeaderboard: myStatus.showOnLeaderboard,
               name: myStatus.displayName || meta.display_name || null,
               totalSeconds: (myStatus.totalActiveSeconds != null ? myStatus.totalActiveSeconds : null),
               avatar: (typeof meta.avatar === "string" && meta.avatar.indexOf("data:image/") === 0) ? meta.avatar : null };
    }
    if (readSession()) return { signedIn: true, points: null, rank: null };
    var g = guestLoad();
    var pts = Math.floor(g.sec / 60);
    return { signedIn: false, points: pts, rank: rankFor(pts), guestSeconds: g.sec, totalSeconds: g.sec };
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

  /* ---------------- avatar sync -------------------------------------
     The public board may show a member's profile photo (only while
     their "show on leaderboard" switch is on — the leaderboard view
     enforces that). The photo lives in the auth user metadata as a
     data URL; here we keep a small copy on the member's own rewards
     row: downscale to at most 64x64, re-encode as JPEG, and send it
     through set_rewards_avatar() only when it actually changed since
     the last successful sync. Best-effort throughout: any failure is
     swallowed and the site behaves exactly as before. */
  var AVATAR_SYNC_KEY = "csAvatarSynced";
  function syncAvatar() {
    try {
      if (!readSession()) return;
      var meta = sessionMeta();
      var av = meta.avatar;
      if (typeof av !== "string" || av.indexOf("data:image/") !== 0) {
        // No photo on the account: clear the board copy once, if a
        // previous sync left one behind.
        if (lsGet(AVATAR_SYNC_KEY)) {
          rpc("set_rewards_avatar", { p_avatar: null }).then(function () {
            lsDel(AVATAR_SYNC_KEY);
          }, function () {});
        }
        return;
      }
      var img = new Image();
      img.onload = function () {
        try {
          var scale = Math.min(1, 64 / Math.max(img.width, img.height));
          var w = Math.max(1, Math.round(img.width * scale));
          var h = Math.max(1, Math.round(img.height * scale));
          var cv = document.createElement("canvas");
          cv.width = w; cv.height = h;
          var cx = cv.getContext("2d");
          if (!cx) return;
          cx.fillStyle = "#ffffff";
          cx.fillRect(0, 0, w, h);
          cx.drawImage(img, 0, 0, w, h);
          var out = cv.toDataURL("image/jpeg", 0.82);
          if (out.length > 16000) out = cv.toDataURL("image/jpeg", 0.6);
          if (!out || out.indexOf("data:image/jpeg") !== 0 || out.length > 16000) return;
          if (lsGet(AVATAR_SYNC_KEY) === out) return; // unchanged
          rpc("set_rewards_avatar", { p_avatar: out }).then(function () {
            lsSet(AVATAR_SYNC_KEY, out);
          }, function () {});
        } catch (e) {}
      };
      img.src = av;
    } catch (e) {}
  }

  // After sign-in: sync the display name once, claim any guest time,
  // then load the true status.
  function onSignedIn() {
    var user = (window.CSAuth && window.CSAuth.getUser && window.CSAuth.getUser()) || null;
    var meta = (user && user.user_metadata) || {};
    var name = meta.display_name || null;
    rpc("update_reward_profile", { p_display_name: name, p_show: null }).then(function () {}, function () {});
    syncAvatar();
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

  /* ---------------- floating points card -----------------------------
     Site-wide card fixed to the bottom-right corner: the visitor's
     level badge, leaderboard position, points and total active time,
     with progress toward the next rank. A close button collapses it
     to a small pill; the choice is remembered. Built once, then kept
     live by the same snapshot flow as every other rewards surface.
     Fully failure-isolated: if anything here fails, tracking above is
     unaffected and the page simply has no card. Styles live with the
     site stylesheets under the .cs-pc- prefix. */
  var PC_OPEN_KEY = "csPointsCardOpen";
  var TROPHY_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 4h10v4.5a5 5 0 0 1-10 0z"/><path d="M7 5.6H4.3A2.7 2.7 0 0 0 7 9.4M17 5.6h2.7A2.7 2.7 0 0 1 17 9.4"/><path d="M12 13.5V17"/><path d="M10 20v-3h4v3"/><path d="M8.2 20h7.6"/></svg>';
  var USER_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg>';
  function pcEsc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function siteRootPrefix() {
    // Tools pages live one folder deeper (tools-preview/...).
    return (window.location.pathname.indexOf("/tools-preview/") > -1) ? "../../" : "";
  }
  function fmtDuration(sec) {
    var s = Math.max(0, Math.floor(sec || 0));
    var m = Math.floor(s / 60);
    if (m < 60) return m + " min";
    var h = Math.floor(m / 60), rem = m % 60;
    if (h >= 100) return h + " h";
    return rem ? (h + " h " + rem + " min") : (h + " h");
  }

  var pcCard = null, pcPill = null;
  function pcSetOpen(open) {
    try {
      lsSet(PC_OPEN_KEY, open ? "1" : "0");
      if (pcCard) pcCard.hidden = !open;
      if (pcPill) pcPill.hidden = open;
    } catch (e) {}
  }
  function pcBuild() {
    try {
      if (pcCard || document.getElementById("csPointsCard")) return; // build once
      if (!document.body) return;
      var prefix = siteRootPrefix();
      pcCard = document.createElement("div");
      pcCard.className = "cs-pc-card";
      pcCard.id = "csPointsCard";
      pcCard.setAttribute("role", "complementary");
      pcCard.setAttribute("aria-label", "Your Cheakstar rewards");
      pcCard.innerHTML =
        '<div class="cs-pc-head"><span class="cs-pc-avawrap" id="csPcAvatar"></span>' +
        '<span class="cs-pc-name" id="csPcName">Your rewards</span>' +
        '<button type="button" class="cs-pc-close" id="csPcClose" aria-label="Hide points card">&times;</button></div>' +
        '<div class="cs-pc-badgerow"><span id="csPcBadge"></span></div>' +
        '<div class="cs-pc-points"><span id="csPcPoints">&mdash;</span> <span class="cs-pc-points-label">points</span></div>' +
        '<p class="cs-pc-line" id="csPcRankLine"></p>' +
        '<p class="cs-pc-line" id="csPcTimeLine"></p>' +
        '<div id="csPcProgress" hidden><div class="cs-pc-bar"><i id="csPcBarFill"></i></div>' +
        '<p class="cs-pc-line" id="csPcNextLine"></p></div>' +
        '<p class="cs-pc-line" id="csPcTodayLine"></p>' +
        '<p class="cs-pc-note" id="csPcGuestNote" hidden>Guest time is kept in this browser and joins your account as points when you sign in &mdash; nothing is lost.</p>' +
        '<div class="cs-pc-actions"><a class="cs-pc-link" href="' + prefix + 'leaderboard.html">Leaderboard</a>' +
        '<a class="btn cs-pc-signin" id="csPcSignIn" href="' + prefix + 'login.html" hidden>Sign in</a></div>';
      document.body.appendChild(pcCard);
      pcPill = document.createElement("button");
      pcPill.type = "button";
      pcPill.className = "cs-pc-pill";
      pcPill.id = "csPointsPill";
      pcPill.setAttribute("aria-label", "Show points card");
      pcPill.innerHTML = TROPHY_ICON + '<span id="csPcPillPoints">0</span>';
      document.body.appendChild(pcPill);
      pcCard.querySelector("#csPcClose").addEventListener("click", function () { pcSetOpen(false); });
      pcPill.addEventListener("click", function () { pcSetOpen(true); });
      pcSetOpen(lsGet(PC_OPEN_KEY) !== "0"); // default: open
      pcRender(snapshot());
      listeners.push(pcRender);
    } catch (e) { pcCard = null; pcPill = null; }
  }
  function pcRender(snap) {
    if (!pcCard) return;
    try {
      var name = snap.signedIn ? (snap.name || "Member") : "Guest";
      var ava = pcCard.querySelector("#csPcAvatar");
      if (snap.signedIn && snap.avatar) {
        ava.innerHTML = '<img class="cs-pc-avatar" src="' + snap.avatar + '" alt="">';
      } else if (snap.signedIn) {
        ava.innerHTML = '<span class="cs-pc-initials" aria-hidden="true">' + pcEsc((name.charAt(0) || "M").toUpperCase()) + "</span>";
      } else {
        ava.innerHTML = '<span class="cs-pc-initials cs-pc-guestico" aria-hidden="true">' + USER_ICON + "</span>";
      }
      pcCard.querySelector("#csPcName").textContent = name;

      // Signed in, but the server status has not arrived yet.
      if (snap.signedIn && snap.points == null) {
        pcCard.querySelector("#csPcPoints").textContent = "—";
        pcCard.querySelector("#csPcBadge").innerHTML = "";
        pcCard.querySelector("#csPcRankLine").textContent = "Loading your rewards…";
        pcCard.querySelector("#csPcTimeLine").textContent = "";
        pcCard.querySelector("#csPcProgress").hidden = true;
        pcCard.querySelector("#csPcTodayLine").textContent = "";
        pcCard.querySelector("#csPcSignIn").hidden = true;
        pcCard.querySelector("#csPcGuestNote").hidden = true;
        return;
      }

      var pts = snap.points || 0;
      pcCard.querySelector("#csPcPoints").textContent = Number(pts).toLocaleString("en-IN");
      var pillPts = document.getElementById("csPcPillPoints");
      if (pillPts) pillPts.textContent = Number(pts).toLocaleString("en-IN");
      var lv = levelFor(pts);
      pcCard.querySelector("#csPcBadge").innerHTML =
        '<span class="cs-pc-badge" style="color:' + lv.color + ";border-color:" + lv.color + '">' +
        iconSvg(lv.name, 14) + pcEsc(lv.name) + "</span>";
      var rankLine = pcCard.querySelector("#csPcRankLine");
      if (snap.signedIn) {
        rankLine.innerHTML = snap.position
          ? "Leaderboard rank <strong>#" + snap.position + "</strong>"
          : "Not on the board yet";
      } else {
        rankLine.textContent = "Browsing as a guest";
      }
      // Total active time: exact earned seconds when known, otherwise
      // the points themselves (1 point = 1 active minute).
      var totalSec = (snap.totalSeconds != null) ? snap.totalSeconds : pts * 60;
      pcCard.querySelector("#csPcTimeLine").innerHTML =
        "Total active time here: <strong>" + fmtDuration(totalSec) + "</strong>";
      var nx = nextRank(pts);
      var prog = pcCard.querySelector("#csPcProgress");
      prog.hidden = false;
      if (nx) {
        var pct = Math.max(0, Math.min(100, Math.round((pts - lv.at) / (nx.at - lv.at) * 100)));
        pcCard.querySelector("#csPcBarFill").style.width = pct + "%";
        pcCard.querySelector("#csPcNextLine").innerHTML =
          "<strong>" + (nx.at - pts).toLocaleString("en-IN") + "</strong> points to " + pcEsc(nx.name);
      } else {
        pcCard.querySelector("#csPcBarFill").style.width = "100%";
        pcCard.querySelector("#csPcNextLine").textContent = "Highest rank reached";
      }
      if (snap.signedIn) {
        pcCard.querySelector("#csPcTodayLine").textContent =
          "Today: " + (snap.pointsToday != null ? snap.pointsToday : 0) + " / " + DAY_CAP_MIN + " points";
      } else {
        pcCard.querySelector("#csPcTodayLine").textContent =
          "Today: " + Math.floor(guestLoad().daySec / 60) + " / " + DAY_CAP_MIN + " points";
      }
      pcCard.querySelector("#csPcSignIn").hidden = snap.signedIn;
      pcCard.querySelector("#csPcGuestNote").hidden = snap.signedIn;
    } catch (e) {}
  }
  if (document.body) pcBuild();
  else document.addEventListener("DOMContentLoaded", pcBuild);

  /* ---------------- public API -------------------------------------- */
  window.CSRewards = {
    RANKS: RANKS,
    LEVELS: LEVELS,
    rankFor: rankFor,
    nextRank: nextRank,
    levelFor: levelFor,
    levelByName: levelByName,
    iconSvg: iconSvg,
    crownSvg: crownSvg,
    snapshot: snapshot,
    onUpdate: function (cb) {
      if (typeof cb === "function") { listeners.push(cb); cb(snapshot()); }
    },
    // Games and interactive tools call this on real input (canvas keys,
    // moves) so play counts as activity even without page scrolling.
    pingActivity: poke,
    refreshStatus: refreshStatus,
    getLeaderboard: function (limit) {
      var lim = (limit || 100);
      function mapRows(rows) {
        return (rows || []).map(function (r) {
          // Only canvas-produced JPEG data URLs are ever rendered
          // (that is all set_rewards_avatar sync ever stores), so
          // anything else is dropped here as a second line of defence.
          var av = (typeof r.avatar === "string" && r.avatar.indexOf("data:image/jpeg;base64,") === 0) ? r.avatar : null;
          return { position: r.position, name: r.display_name, points: r.total_points, rank: r.rank_tier, avatar: av };
        });
      }
      return call("leaderboard?select=position,display_name,total_points,rank_tier,avatar&order=position.asc&limit=" + lim, { anon: true })
        .then(mapRows, function () {
          // If the v2 avatar column is not live yet, fall back to the
          // original column set so the board keeps working.
          return call("leaderboard?select=position,display_name,total_points,rank_tier&order=position.asc&limit=" + lim, { anon: true }).then(mapRows);
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
