/* Cheakstar games/cgx.js -- the games shared layer: storage, canvas
   fit + fullscreen, dialogs, confetti and sound, shared by all 29
   games. One global only: cgx. (Extracted 2026-11-18 from the
   per-game inline copies, which were identical apart from blank
   lines and one stray comment; this file is now the single copy.) */
"use strict";
/* ============ CHEAKSTAR GAMES SHARED LAYER (cgx) ============
   Polish pass step 1: storage, canvas fit + fullscreen, dialogs,
   confetti and sound, shared by all 29 games. One global only: cgx. */
var cgx = (function () {
  var VERSION = "1.0.0";
  function mk(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined && text !== null) e.textContent = text;
    return e;
  }
  /* Dialogs and confetti must live inside the fullscreen element while
     fullscreen is active, or the browser will not paint them. */
  function host() {
    return document.fullscreenElement || document.webkitFullscreenElement || document.body;
  }

  /* ---------------- storage ----------------
     Keys: cheakstar.games.<slug>.<key>, values are JSON. Falls back to
     an in-memory store (session only) when localStorage is unavailable
     or a write fails. Account-sync plug-in: after store.registerSync(fn),
     every set/remove calls fn(fullKey, jsonOrNull); store.applyRemote()
     writes a downloaded value WITHOUT notifying, so a pull cannot echo
     back as a push. Game call sites never change when sync lands. */
  var STORE_PREFIX = "cheakstar.games.";
  var storeOk = false;
  try {
    window.localStorage.setItem("__cgx_probe__", "1");
    window.localStorage.removeItem("__cgx_probe__");
    storeOk = true;
  } catch (e) { storeOk = false; }
  var memData = {};
  var memBackend = {
    get: function (k) { return Object.prototype.hasOwnProperty.call(memData, k) ? memData[k] : null; },
    set: function (k, v) { memData[k] = v; return true; },
    remove: function (k) { if (Object.prototype.hasOwnProperty.call(memData, k)) delete memData[k]; },
    keys: function () { var out = []; for (var k in memData) if (Object.prototype.hasOwnProperty.call(memData, k)) out.push(k); return out; }
  };
  var mainBackend = {
    get: function (k) {
      var v = null;
      if (storeOk) { try { v = window.localStorage.getItem(k); } catch (e) { v = null; } }
      return v !== null ? v : memBackend.get(k);
    },
    set: function (k, v) {
      if (storeOk) { try { window.localStorage.setItem(k, v); return true; } catch (e) { /* fall through to memory */ } }
      return memBackend.set(k, v);
    },
    remove: function (k) {
      if (storeOk) { try { window.localStorage.removeItem(k); } catch (e) { /* ignore */ } }
      memBackend.remove(k);
    },
    keys: function () {
      var out = memBackend.keys(), i, k;
      if (storeOk) {
        try {
          for (i = 0; i < window.localStorage.length; i++) {
            k = window.localStorage.key(i);
            if (k && out.indexOf(k) === -1) out.push(k);
          }
        } catch (e) { /* ignore */ }
      }
      return out;
    }
  };
  var syncFn = null;
  function syncNotify(fullKey, jsonOrNull) {
    if (!syncFn) return;
    try { syncFn(fullKey, jsonOrNull); } catch (e) { /* an adapter error must never break a game */ }
  }
  function makeStore(slug, backend) {
    var prefix = STORE_PREFIX + slug + ".";
    return {
      get: function (key, fallback) {
        var raw = backend.get(prefix + key);
        if (raw === null || raw === undefined) return fallback;
        try { return JSON.parse(raw); } catch (e) { return fallback; }
      },
      set: function (key, value) {
        var raw;
        try { raw = JSON.stringify(value); } catch (e) { return false; }
        if (raw === undefined) return false;
        var done = backend.set(prefix + key, raw);
        if (done) syncNotify(prefix + key, raw);
        return done;
      },
      remove: function (key) { backend.remove(prefix + key); syncNotify(prefix + key, null); },
      keys: function () {
        var all = backend.keys(), out = [], i;
        for (i = 0; i < all.length; i++) if (all[i].indexOf(prefix) === 0) out.push(all[i].slice(prefix.length));
        return out;
      }
    };
  }
  function store(slug) { return makeStore(slug, mainBackend); }
  store.available = storeOk;
  store.PREFIX = STORE_PREFIX;
  store.registerSync = function (fn) { syncFn = (typeof fn === "function") ? fn : null; };
  store.applyRemote = function (fullKey, jsonOrNull) {
    if (typeof fullKey !== "string" || fullKey.indexOf(STORE_PREFIX) !== 0) return false;
    if (jsonOrNull === null) mainBackend.remove(fullKey);
    else mainBackend.set(fullKey, String(jsonOrNull));
    return true;
  };

  /* ---------------- sound (WebAudio beeps, muted by default) ---------------- */
  var settingsStore = store("settings");
  var audioCtx = null;
  function soundMuted() { return settingsStore.get("soundMuted", true) !== false; }
  function setMuted(m) { settingsStore.set("soundMuted", !!m); return !!m; }
  function beep(freq, ms, opts) {
    if (soundMuted()) return false;
    opts = opts || {};
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return false;
      if (!audioCtx) audioCtx = new AC();
      if (audioCtx.state === "suspended" && audioCtx.resume) audioCtx.resume();
      var dur = (ms || 120) / 1000, t = audioCtx.currentTime;
      var osc = audioCtx.createOscillator(), gain = audioCtx.createGain();
      osc.type = opts.type || "sine";
      osc.frequency.value = freq || 660;
      gain.gain.setValueAtTime(opts.gain || 0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(t);
      osc.stop(t + dur + 0.05);
      return true;
    } catch (e) { return false; }
  }
  /* Named effects; sequences are [freq, ms, delayMs] triples. */
  var SFX = {
    click: [[620, 60, 0]], place: [[440, 70, 0]],
    good: [[660, 90, 0], [880, 130, 85]], bad: [[150, 160, 0]],
    win: [[523, 110, 0], [659, 110, 95], [784, 110, 190], [1047, 230, 285]],
    lose: [[392, 140, 0], [330, 140, 130], [262, 250, 260]]
  };
  var SFX_OPTS = { click: { type: "square", gain: 0.05 }, bad: { type: "sawtooth", gain: 0.08 } };
  function sfx(name) {
    if (soundMuted()) return false;
    var seq = SFX[name], i, note;
    if (!seq) return beep(660, 100);
    for (i = 0; i < seq.length; i++) {
      note = seq[i];
      if (note[2] === 0) beep(note[0], note[1], SFX_OPTS[name] || null);
      else (function (f, m, d) { window.setTimeout(function () { beep(f, m); }, d); })(note[0], note[1], note[2]);
    }
    return true;
  }
  function attachMuteToggle(btn) {
    if (!btn) return;
    function sync() {
      btn.textContent = soundMuted() ? "Sound: Off" : "Sound: On";
      btn.setAttribute("aria-pressed", soundMuted() ? "false" : "true");
    }
    btn.addEventListener("click", function () {
      setMuted(!soundMuted());
      sync();
      if (!soundMuted()) sfx("click");
    });
    sync();
  }

  /* ---------------- canvas fit + fullscreen ---------------- */
  function dpr() { var d = window.devicePixelRatio || 1; return d > 2 ? 2 : d; }
  /* Sizes the backing store to CSS box x devicePixelRatio and sets the
     transform so drawing uses logical units (pass logicalW/logicalH, e.g.
     480/360) or CSS pixels (omit them). Resizing clears the canvas, so
     always redraw after a fit. Returns null when the canvas is unsized. */
  function fit(canvas, logicalW, logicalH) {
    if (!canvas) return null;
    var rect = canvas.getBoundingClientRect();
    var cssW = Math.round(rect.width), cssH = Math.round(rect.height);
    if (cssW < 1 || cssH < 1) return null;
    var ratio = dpr();
    var bw = Math.round(cssW * ratio), bh = Math.round(cssH * ratio);
    if (canvas.width !== bw) canvas.width = bw;
    if (canvas.height !== bh) canvas.height = bh;
    var ctx = canvas.getContext("2d");
    if (ctx) {
      if (logicalW && logicalH) ctx.setTransform(bw / logicalW, 0, 0, bh / logicalH, 0, 0);
      else ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }
    return { cssW: cssW, cssH: cssH, dpr: ratio, width: bw, height: bh };
  }
  /* Fits now and re-fits on window resize and on fullscreen change - the
     backing store follows the screen, which is the spec 0.2 fix.
     onResize(info) must redraw. Returns { refit, destroy }. */
  function watchFit(canvas, opts, onResize) {
    if (typeof opts === "function") { onResize = opts; opts = null; }
    opts = opts || {};
    var destroyed = false, queued = false;
    function refit() {
      var info = fit(canvas, opts.logicalW, opts.logicalH);
      if (info && onResize) onResize(info);
      return info;
    }
    function schedule() {
      if (destroyed || queued) return;
      queued = true;
      window.requestAnimationFrame(function () { queued = false; if (!destroyed) refit(); });
    }
    function onFsChange() {
      schedule();
      window.setTimeout(function () { if (!destroyed) refit(); }, 80); /* layout can settle a frame late */
    }
    window.addEventListener("resize", schedule);
    document.addEventListener("fullscreenchange", onFsChange);
    document.addEventListener("webkitfullscreenchange", onFsChange);
    refit();
    return {
      refit: refit,
      destroy: function () {
        destroyed = true;
        window.removeEventListener("resize", schedule);
        document.removeEventListener("fullscreenchange", onFsChange);
        document.removeEventListener("webkitfullscreenchange", onFsChange);
      }
    };
  }
  function fsElement() { return document.fullscreenElement || document.webkitFullscreenElement || null; }
  function isFullscreen() { return !!fsElement(); }
  function requestFullscreen(elm) {
    if (!elm) return false;
    if (elm.requestFullscreen) { elm.requestFullscreen(); return true; }
    if (elm.webkitRequestFullscreen) { elm.webkitRequestFullscreen(); return true; }
    return false;
  }
  function exitFullscreen() {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
  }
  function toggleFullscreen(elm) {
    if (isFullscreen()) { exitFullscreen(); return true; }
    return requestFullscreen(elm);
  }
  function onFullscreenChange(fn) {
    document.addEventListener("fullscreenchange", fn);
    document.addEventListener("webkitfullscreenchange", fn);
    return function () {
      document.removeEventListener("fullscreenchange", fn);
      document.removeEventListener("webkitfullscreenchange", fn);
    };
  }

  /* ---------------- dialog ---------------- */
  var dlg = null, dlgKeyHandler = null;
  function ensureDialog() {
    if (!dlg) {
      var overlay = mk("div", "cgx-overlay");
      overlay.id = "cgx-overlay";
      overlay.innerHTML = '<div class="cgx-dialog" role="dialog" aria-modal="true"><h3></h3><div class="cgx-dialog-body"></div><div class="cgx-btn-row"></div></div>';
      overlay.addEventListener("click", function (ev) {
        if (ev.target === overlay && overlay.getAttribute("data-dismiss") === "1") closeDialog();
      });
      dlg = { overlay: overlay, title: overlay.querySelector("h3"), body: overlay.querySelector(".cgx-dialog-body"), btnRow: overlay.querySelector(".cgx-btn-row") };
    }
    if (dlg.overlay.parentNode !== host()) host().appendChild(dlg.overlay);
    return dlg;
  }
  function closeDialog() {
    if (!dlg) return;
    dlg.overlay.className = "cgx-overlay";
    if (dlgKeyHandler) { document.removeEventListener("keydown", dlgKeyHandler); dlgKeyHandler = null; }
  }
  /* dialog({ title, bodyText | lines | bodyHtml | buildBody(el),
       buttons: [{ label, primary, value, onClick }], onAction(value),
       dismissible }) -> close function. A button click closes the dialog
     first, then runs its onClick and the dialog's onAction. */
  function dialog(opts) {
    opts = opts || {};
    var d = ensureDialog(), i;
    d.title.textContent = opts.title || "";
    d.body.innerHTML = "";
    if (typeof opts.buildBody === "function") opts.buildBody(d.body);
    else if (opts.bodyHtml) d.body.innerHTML = opts.bodyHtml;
    else if (opts.lines || opts.bodyText) {
      var lines = opts.lines || [opts.bodyText];
      for (i = 0; i < lines.length; i++) d.body.appendChild(mk("p", null, lines[i]));
    }
    d.btnRow.innerHTML = "";
    var buttons = (opts.buttons && opts.buttons.length) ? opts.buttons : [{ label: "OK", primary: true, value: "ok" }];
    var focusBtn = null;
    for (i = 0; i < buttons.length; i++) {
      (function (b) {
        var btn = mk("button", "cgx-btn" + (b.primary ? " cgx-btn-primary" : ""), b.label || "OK");
        btn.type = "button";
        btn.addEventListener("click", function () {
          closeDialog();
          if (b.onClick) b.onClick();
          if (opts.onAction) opts.onAction(b.value);
        });
        d.btnRow.appendChild(btn);
        if (b.primary) focusBtn = btn;
      })(buttons[i]);
    }
    d.overlay.setAttribute("data-dismiss", opts.dismissible === false ? "0" : "1");
    d.overlay.className = "cgx-overlay open";
    if (dlgKeyHandler) document.removeEventListener("keydown", dlgKeyHandler);
    dlgKeyHandler = function (ev) { if (ev.key === "Escape" && opts.dismissible !== false) closeDialog(); };
    document.addEventListener("keydown", dlgKeyHandler);
    if (focusBtn && focusBtn.focus) focusBtn.focus();
    return closeDialog;
  }
  function confirmDialog(title, message, onOk) {
    return dialog({
      title: title,
      bodyText: message,
      buttons: [
        { label: "Cancel", value: "cancel" },
        { label: "OK", primary: true, value: "ok", onClick: function () { if (onOk) onOk(); } }
      ]
    });
  }
  /* Win/lose end screen (spec 0.6): score + best rows, a "New best!"
     badge, optional 0-3 stars and medal line, Play Again + Close.
     Fires confetti and the win/lose sound unless told not to. */
  function showResult(opts) {
    opts = opts || {};
    var won = opts.won !== false;
    var close = dialog({
      title: opts.title || (won ? "You win!" : "Game over"),
      buildBody: function (body) {
        var rows = [], i, row, stars, s;
        if (opts.message) body.appendChild(mk("p", null, opts.message));
        if (opts.score !== undefined && opts.score !== null) rows.push([opts.scoreLabel || "Score", opts.score]);
        if (opts.best !== undefined && opts.best !== null) rows.push([opts.bestLabel || "Best", opts.best]);
        if (rows.length) {
          var table = mk("div", "cgx-score-table");
          for (i = 0; i < rows.length; i++) {
            row = mk("div", "cgx-score-row");
            row.appendChild(mk("span", null, rows[i][0]));
            row.appendChild(mk("span", null, String(rows[i][1])));
            table.appendChild(row);
          }
          body.appendChild(table);
        }
        if (opts.newBest) body.appendChild(mk("span", "cgx-newbest", "New best!"));
        if (typeof opts.stars === "number") {
          stars = mk("div", "cgx-stars");
          for (i = 0; i < 3; i++) {
            s = mk("span", i >= opts.stars ? "off" : null, "\u2605");
            stars.appendChild(s);
          }
          body.appendChild(stars);
        }
        if (opts.medal) body.appendChild(mk("p", null, opts.medal));
      },
      buttons: [
        { label: opts.playAgainLabel || "Play again", primary: true, value: "again", onClick: function () { if (opts.onPlayAgain) opts.onPlayAgain(); } },
        { label: opts.closeLabel || "Close", value: "close", onClick: function () { if (opts.onClose) opts.onClose(); } }
      ]
    });
    if (won && opts.confetti !== false) confetti();
    if (opts.sound !== false) sfx(won ? "win" : "lose");
    return close;
  }

  /* ---------------- confetti ---------------- */
  var confettiState = null;
  function confettiStop() {
    if (!confettiState) return;
    confettiState.running = false;
    if (confettiState.raf) window.cancelAnimationFrame(confettiState.raf);
    if (confettiState.canvas.parentNode) confettiState.canvas.parentNode.removeChild(confettiState.canvas);
    confettiState = null;
  }
  /* confetti({ count, duration, colors }) -> { stop, count }.
     Lightweight canvas burst, no assets; removes itself when done. */
  function confetti(opts) {
    opts = opts || {};
    confettiStop();
    var colors = opts.colors || ["#c9a227", "#f3d67c", "#ffffff", "#38bdf8", "#f87171", "#4ade80"];
    var count = opts.count || 130, duration = opts.duration || 2600;
    var canvas = mk("canvas", "cgx-confetti-canvas");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    host().appendChild(canvas);
    var ctx = canvas.getContext("2d");
    if (!ctx) {
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      return { stop: function () { /* nothing running */ }, count: 0 };
    }
    var parts = [], i;
    for (i = 0; i < count; i++) {
      parts.push({
        x: Math.random() * canvas.width, y: -30 - Math.random() * canvas.height * 0.35,
        w: 5 + Math.random() * 5, h: 8 + Math.random() * 7,
        vx: -45 + Math.random() * 90, vy: 130 + Math.random() * 170,
        rot: Math.random() * Math.PI, vr: -4 + Math.random() * 8,
        color: colors[i % colors.length]
      });
    }
    var state = { canvas: canvas, running: true, raf: 0, started: performance.now(), last: performance.now() };
    confettiState = state;
    function frame(now) {
      if (!state.running) return;
      var dt = Math.min(0.05, (now - state.last) / 1000), j, pt;
      state.last = now;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (j = 0; j < parts.length; j++) {
        pt = parts[j];
        pt.vy += 60 * dt;
        pt.x += pt.vx * dt;
        pt.y += pt.vy * dt;
        pt.rot += pt.vr * dt;
        ctx.save();
        ctx.translate(pt.x, pt.y);
        ctx.rotate(pt.rot);
        ctx.fillStyle = pt.color;
        ctx.fillRect(-pt.w / 2, -pt.h / 2, pt.w, pt.h);
        ctx.restore();
      }
      if (now - state.started < duration) state.raf = window.requestAnimationFrame(frame);
      else confettiStop();
    }
    state.raf = window.requestAnimationFrame(frame);
    return { stop: confettiStop, count: parts.length };
  }
  function confettiRunning() { return !!confettiState; }

  /* Keep an open dialog and running confetti inside the fullscreen
     element when fullscreen starts or ends mid-display. */
  function rehost() {
    var h = host();
    if (dlg && dlg.overlay.parentNode !== h) h.appendChild(dlg.overlay);
    if (confettiState && confettiState.canvas.parentNode !== h) h.appendChild(confettiState.canvas);
  }
  document.addEventListener("fullscreenchange", rehost);
  document.addEventListener("webkitfullscreenchange", rehost);

  return {
    version: VERSION,
    store: store, fit: fit, watchFit: watchFit,
    isFullscreen: isFullscreen, requestFullscreen: requestFullscreen,
    exitFullscreen: exitFullscreen, toggleFullscreen: toggleFullscreen,
    onFullscreenChange: onFullscreenChange,
    dialog: dialog, confirm: confirmDialog, showResult: showResult, closeDialog: closeDialog,
    confetti: confetti, confettiStop: confettiStop, confettiRunning: confettiRunning,
    beep: beep, sfx: sfx,
    muted: soundMuted, setMuted: setMuted,
    toggleMuted: function () { return setMuted(!soundMuted()); },
    attachMuteToggle: attachMuteToggle
  };
})();
