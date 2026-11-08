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
    [0, "Newcomer"], [60, "Explorer"], [150, "Learner"], [270, "Discoverer"],
    [420, "Apprentice"], [600, "Initiate"], [810, "Seeker"], [1050, "Pathfinder"],
    [1320, "Rookie"], [1620, "Rising Star"], [1950, "Contributor"], [2310, "Achiever"],
    [2700, "Practitioner"], [3120, "Tracker"], [3570, "Analyst"], [4050, "Strategist"],
    [4560, "Specialist"], [5100, "Operator"], [5670, "Guardian"], [6270, "Sentinel"],
    [6900, "Proficient"], [7560, "Challenger"], [8250, "Veteran"], [8970, "Expert"],
    [9720, "Innovator"], [10500, "Tactician"], [11310, "Pioneer"], [12150, "Virtuoso"],
    [13020, "Champion"], [13920, "Elite"], [14850, "Master"], [15810, "Grandmaster"],
    [16800, "Commander"], [17820, "Overseer"], [18870, "Warden"], [19950, "Conqueror"],
    [21060, "Paragon"], [22200, "Exemplar"], [23370, "Legend"], [24570, "Icon"],
    [25800, "Mythic"], [27060, "Titan"], [28350, "Apex"], [29670, "Sovereign"],
    [31020, "Immortal"], [32400, "Overlord"], [33810, "Ascendant"], [35250, "Transcendent"],
    [36720, "Celestial"], [38220, "Eternal"]
  ];

  /* Level presentation metadata, parallel to RANKS: one simple
     stroke icon (inner SVG markup for a 24x24 viewBox) and one colour
     per rank. Used by the leaderboard, the account page and the
     floating points card so a level looks the same everywhere. */
  var LEVEL_STYLE = [
    { icon: '<path d="M5.5 18.5C5.5 11 11 5.8 19 5c-.7 8.5-5.5 13.5-13.5 13.5z"/><path d="M5.5 18.5C7.5 13.5 10.5 10 14.5 8"/>', color: "#93a7c4" }, // 1 Newcomer — leaf
    { icon: '<circle cx="12" cy="12" r="8.5"/><path d="M15.2 8.8 13.4 13.4 8.8 15.2 10.6 10.6z"/>', color: "#5b8dd9" }, // 2 Explorer — compass
    { icon: '<path d="M12 6.2C10.2 4.7 8 4.2 4.5 4.2v13.2c3.5 0 5.7.5 7.5 2 1.8-1.5 4-2 7.5-2V4.2c-3.5 0-5.7.5-7.5 2z"/><path d="M12 6.2v13.2"/>', color: "#4a9fd8" }, // 3 Learner — book
    { icon: '<path d="M12 21s-6.5-5.5-6.5-10.3A6.5 6.5 0 0 1 12 4.2a6.5 6.5 0 0 1 6.5 6.5C18.5 15.5 12 21 12 21z"/><circle cx="12" cy="10.7" r="2.3"/>', color: "#37a6a0" }, // 4 Discoverer — pin
    { icon: '<path d="M4.5 19.5 5.5 15 16.8 3.7a2.1 2.1 0 0 1 3 3L8.5 18z"/><path d="M14.8 5.7l3 3"/>', color: "#2fa383" }, // 5 Apprentice — pencil
    { icon: '<circle cx="8" cy="15" r="4.5"/><path d="M11.3 11.7 19.5 3.5"/><path d="M16 7l2.8 2.8M13.8 9.2l2.2 2.2"/>', color: "#43a673" }, // 6 Initiate — key
    { icon: '<circle cx="11" cy="11" r="6.5"/><path d="M15.8 15.8 20.5 20.5"/>', color: "#63b04b" }, // 7 Seeker — magnifier
    { icon: '<path d="M5.5 21.5v-17"/><path d="M5.5 4.8h11.8l-2.6 3.7 2.6 3.7H5.5"/>', color: "#8ab53a" }, // 8 Pathfinder — flag
    { icon: '<path d="M12 21v-7.5"/><path d="M12 13.5C12 10 9.3 8 5.6 8c0 3.7 2.2 5.5 6.4 5.5z"/><path d="M12 11c0-3 2.2-4.7 5.6-4.7 0 3.1-1.9 4.7-5.6 4.7z"/>', color: "#a8ad2e" }, // 9 Rookie — sprout
    { icon: '<path d="M12 3.6l2.55 5.2 5.75.8-4.15 4.05 1 5.7L12 16.7l-5.15 2.65 1-5.7L3.7 9.6l5.75-.8z"/>', color: "#d9b83a" }, // 10 Rising Star — star
    { icon: '<path d="M12 20.3S3.8 15.3 3.8 9.8A4.5 4.5 0 0 1 12 6.9a4.5 4.5 0 0 1 8.2 2.9c0 5.5-8.2 10.5-8.2 10.5z"/>', color: "#e0aa32" }, // 11 Contributor — heart
    { icon: '<circle cx="12" cy="14.5" r="5.2"/><path d="M9 10 6 3.8h3.8L12 7l2.2-3.2H18L15 10"/>', color: "#e69c30" }, // 12 Achiever — medal
    { icon: '<rect x="5.5" y="4.5" width="13" height="16.5" rx="2"/><path d="M9.5 4.8V3.2h5v1.6M9 13.5l2 2 4-4.2"/>', color: "#ec8a35" }, // 13 Practitioner — clipboard
    { icon: '<circle cx="12" cy="12" r="8.2"/><circle cx="12" cy="12" r="4.4"/><circle cx="12" cy="12" r="0.6"/>', color: "#ef773f" }, // 14 Tracker — target
    { icon: '<path d="M4 4v15.5h16"/><path d="M8 16v-4.5M12 16V8M16 16v-6.5"/>', color: "#ef6349" }, // 15 Analyst — chart
    { icon: '<circle cx="5.5" cy="18.5" r="2.4"/><circle cx="18.5" cy="5.5" r="2.4"/><circle cx="12" cy="12" r="1.5"/><path d="M7.3 16.7 10.8 13.2M13.2 10.8 16.7 7.3"/>', color: "#e84f55" }, // 16 Strategist — route nodes
    { icon: '<circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"/>', color: "#dd4266" }, // 17 Specialist — gear
    { icon: '<path d="M4 7h8.5M17.5 7H20M4 12h2.5M11.5 12H20M4 17h10.5M19.5 17H20"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="12" r="2.2"/><circle cx="17" cy="17" r="2.2"/>', color: "#ce3a78" }, // 18 Operator — sliders
    { icon: '<path d="M12 3l7 2.4v5.4c0 4.7-2.9 7.9-7 9.7C7.9 18.7 5 15.5 5 10.8V5.4z"/><path d="M9 11.6l2.2 2.2 3.8-4"/>', color: "#bf3a8a" }, // 19 Guardian — shield
    { icon: '<path d="M2.8 12S6.2 6 12 6s9.2 6 9.2 6-3.4 6-9.2 6-9.2-6-9.2-6z"/><circle cx="12" cy="12" r="2.8"/>', color: "#a83fa0" }, // 20 Sentinel — eye
    { icon: '<circle cx="12" cy="9.8" r="5.4"/><path d="M12 6.9l.95 2 2.15.3-1.55 1.5.37 2.15L12 11.9l-1.92.95.37-2.15-1.55-1.5 2.15-.3z"/><path d="M8.9 14.2 7.2 20.8l4.8-2.5 4.8 2.5-1.7-6.6"/>', color: "#9347b3" }, // 21 Proficient — rosette
    { icon: '<path d="M3 20 9.8 7.5l3.4 5.3L15.8 9 21 20z"/>', color: "#7f52c4" }, // 22 Challenger — peaks
    { icon: '<path d="M5 14.5 12 8l7 6.5"/><path d="M5 20 12 13.5 19 20"/>', color: "#6d5fd2" }, // 23 Veteran — chevrons
    { icon: '<path d="M2.5 9.3 12 4.8l9.5 4.5L12 13.8z"/><path d="M6.2 11.3v4.4c0 1.6 2.6 3 5.8 3s5.8-1.4 5.8-3v-4.4"/><path d="M21.5 9.3v5.2"/>', color: "#5d72dd" }, // 24 Expert — grad cap
    { icon: '<path d="M12 3a6 6 0 0 1 3.4 10.9c-.65.5-.95 1-.95 2h-4.9c0-1-.3-1.5-.95-2A6 6 0 0 1 12 3z"/><path d="M9.8 18.6h4.4M10.6 21h2.8"/>', color: "#4f83e6" }, // 25 Innovator — bulb
    { icon: '<circle cx="12" cy="5.8" r="2.5"/><path d="M9.6 9.3h4.8l.8 3.7H8.8z"/><path d="M8.6 16.5h6.8l1.1 4.3H7.5z"/><path d="M7.5 20.8h9"/>', color: "#8a7fd6" }, // 26 Tactician — pawn
    { icon: '<path d="M12 2.8c1.9 2.3 3.1 4 3.1 6a3.1 3.1 0 0 1-6.2 0c0-2 1.2-3.7 3.1-6z"/><path d="M10.8 12.5h2.4l-.5 3h-1.4z"/><path d="M11.3 15.5 10 21h4l-1.3-5.5"/>', color: "#d97b4f" }, // 27 Pioneer — torch
    { icon: '<path d="M9.5 18.3V6.2L19 4.3v11.9"/><circle cx="7.1" cy="18.3" r="2.4"/><circle cx="16.6" cy="16.2" r="2.4"/>', color: "#c65d8f" }, // 28 Virtuoso — music
    { icon: '<path d="M7 4h10v4.8a5 5 0 0 1-10 0z"/><path d="M7 5.6H4.3A2.9 2.9 0 0 0 7.1 10M17 5.6h2.7A2.9 2.9 0 0 1 16.9 10"/><path d="M12 13.8v2.4M9.2 20.5h5.6M10.2 16.2h3.6l.8 4.3H9.4z"/>', color: "#e3b341" }, // 29 Champion — trophy
    { icon: '<circle cx="12" cy="12" r="8.6"/><path d="M12 7.3l1.45 3 3.3.45-2.4 2.3.6 3.25L12 14.7l-2.95 1.6.6-3.25-2.4-2.3 3.3-.45z"/>', color: "#e3c565" }, // 30 Elite — star in circle
    { icon: '<path d="M3.5 18 2.6 8.4 8 12l4-6.6L16 12l5.4-3.6L20.5 18z"/><path d="M4 20.8h16"/>', color: "#e08a3c" }, // 31 Master — crown
    { icon: '<path d="M3.5 17.5 2.6 8.4 8 11.7l4-6.3 4 6.3 5.4-3.3-.9 9.1z"/><path d="M4 20.8h16"/><circle cx="12" cy="14.6" r="1.25"/>', color: "#f0a04b" }, // 32 Grandmaster — crown gem
    { icon: '<path d="M12 3l7 2.4v5.4c0 4.7-2.9 7.9-7 9.7C7.9 18.7 5 15.5 5 10.8V5.4z"/><path d="M12 7.8l1.05 2.15 2.4.35-1.75 1.7.42 2.35L12 13.3l-2.12 1.05.42-2.35-1.75-1.7 2.4-.35z"/>', color: "#c94f6d" }, // 33 Commander — shield star
    { icon: '<path d="M3 12s3.3-5.6 9-5.6 9 5.6 9 5.6-3.3 5.6-9 5.6-9-5.6-9-5.6z"/><circle cx="12" cy="12" r="2.6"/><path d="M12 2.6v1.8M5 4.9l1.3 1.3M19 4.9l-1.3 1.3"/>', color: "#9d6bc9" }, // 34 Overseer — eye rays
    { icon: '<path d="M6.5 21V5h3v2.5h5V5h3v16"/><path d="M4 21h16"/><path d="M10.9 21v-3.6a1.1 1.1 0 0 1 2.2 0V21"/>', color: "#7d8ca3" }, // 35 Warden — castle
    { icon: '<circle cx="12" cy="12" r="8.6"/><path d="M3.4 12h17.2M12 3.4c2.35 2.25 3.55 5.2 3.55 8.6s-1.2 6.35-3.55 8.6c-2.35-2.25-3.55-5.2-3.55-8.6S9.65 5.65 12 3.4z"/>', color: "#4f9ec4" }, // 36 Conqueror — globe
    { icon: '<path d="M12 3l7.6 4.5v9L12 21l-7.6-4.5v-9z"/><circle cx="12" cy="12" r="2.9"/>', color: "#5fd0c5" }, // 37 Paragon — hex gem
    { icon: '<circle cx="12" cy="12" r="3.9"/><path d="M12 3v2.2M12 18.8V21M3 12h2.2M18.8 12H21M5.5 5.5l1.6 1.6M16.9 16.9l1.6 1.6M18.5 5.5l-1.6 1.6M7.1 16.9l-1.6 1.6"/>', color: "#ffd23f" }, // 38 Exemplar — sun
    { icon: '<path d="M7 4h10l3.4 4.8L12 20.2 3.6 8.8z"/><path d="M3.6 8.8h16.8"/><path d="M8.8 8.8 12 20.2 15.2 8.8"/>', color: "#eec95c" }, // 39 Legend — diamond
    { icon: '<path d="M12 2.8c.75 5.2 2.6 7.4 7.7 9.2-5.1 1.8-6.95 4-7.7 9.2-.75-5.2-2.6-7.4-7.7-9.2 5.1-1.8 6.95-4 7.7-9.2z"/>', color: "#f5d76e" }, // 40 Icon — sparkle
    { icon: '<path d="M12 2.6c2.4 3.1 5 5.6 5 9.2a5 5 0 0 1-10 0c0-2 .85-3.6 2-5.1.4 1.2 1.1 2.1 2.1 2.7C10.6 6.5 11.1 4.5 12 2.6z"/><path d="M12 21.4a2.7 2.7 0 0 1-2.7-2.7c0-1.75 1.25-3 2.7-4.3 1.45 1.3 2.7 2.55 2.7 4.3a2.7 2.7 0 0 1-2.7 2.7z"/>', color: "#ff9a3c" }, // 41 Mythic — phoenix flame
    { icon: '<path d="M4.5 4h15"/><path d="M7.3 4v16M12 4v16M16.7 4v16"/><path d="M4.5 20h15"/>', color: "#b8c4d4" }, // 42 Titan — pillars
    { icon: '<path d="M12 3.5 21.5 20h-19z"/><path d="M12 10.8 16.3 20H7.7z"/>', color: "#e5484d" }, // 43 Apex — nested peak
    { icon: '<path d="M3.5 17.5 2.8 9.2l5 2.9L12 6.2l4.2 5.9 5-2.9-.7 8.3z"/><path d="M4.5 20.8h15"/><circle cx="7.9" cy="14.9" r="0.7"/><circle cx="12" cy="14.9" r="0.7"/><circle cx="16.1" cy="14.9" r="0.7"/>', color: "#f5c542" }, // 44 Sovereign — royal crown
    { icon: '<circle cx="8.2" cy="12" r="4.1"/><circle cx="15.8" cy="12" r="4.1"/>', color: "#7fe0c3" }, // 45 Immortal — infinity rings
    { icon: '<circle cx="12" cy="4.8" r="2.3"/><path d="M12 7.1V20.5"/><path d="M8.2 12h7.6M9.2 16.5h5.6"/>', color: "#b388ff" }, // 46 Overlord — scepter
    { icon: '<path d="M12 21V7"/><path d="M6 12.5 12 6.5l6 6"/><path d="M6 3.8h12"/>', color: "#69c7ff" }, // 47 Ascendant — rising arrow
    { icon: '<path d="M12 3l6.2 9L12 21l-6.2-9z"/><path d="M12 7.6 15.3 12 12 16.4 8.7 12z"/>', color: "#e0aaff" }, // 48 Transcendent — nested diamond
    { icon: '<path d="M19.8 14.8A8.6 8.6 0 1 1 9.2 4.2a6.9 6.9 0 0 0 10.6 10.6z"/><path d="M17.8 3.2l.55 1.55 1.55.55-1.55.55-.55 1.55-.55-1.55-1.55-.55 1.55-.55z"/>', color: "#a8c8ff" }, // 49 Celestial — crescent
    { icon: '<circle cx="12" cy="12" r="8.7" stroke-dasharray="3.2 2.6"/><path d="M12 7.4l1.35 2.8 3.1.42-2.25 2.18.55 3.05L12 14.4l-2.75 1.45.55-3.05-2.25-2.18 3.1-.42z"/>', color: "#fff3b0" }  // 50 Eternal — eternal ring
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
