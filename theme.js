// Cheakstar — appearance preferences: theme mode, reduced motion, text
// size. Applies the saved choices on every page that loads this file and
// keeps the account copy (Supabase user_metadata) in step for signed-in
// users, using the same two-layer rule as favourites: the device layer
// (localStorage) applies instantly and while signed out; at sign-in the
// account layer wins; any later change writes both layers.
//
// The matching inline snippet for <head> (no flash of the wrong theme)
// lives in theme-head-snippet.html and rides the head-injection pass;
// this file is the full runtime (live system-theme tracking + sync).
(function () {
  "use strict";
  if (window.CSTheme) return;

  var THEME_KEY = "ck_theme_mode";      // system | light | dark
  var MOTION_KEY = "ck_reduce_motion";  // "1" | ""
  var TEXT_KEY = "ck_text_size";        // comfortable | large

  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }

  function getMode() {
    var m = lsGet(THEME_KEY);
    return (m === "light" || m === "dark" || m === "system") ? m : "system";
  }
  var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
  function resolvedTheme() {
    var m = getMode();
    if (m === "light" || m === "dark") return m;
    return (mq && mq.matches) ? "light" : "dark";
  }

  function apply() {
    var root = document.documentElement;
    root.setAttribute("data-theme", resolvedTheme());
    root.setAttribute("data-motion", lsGet(MOTION_KEY) === "1" ? "reduced" : "full");
    root.setAttribute("data-textsize", lsGet(TEXT_KEY) === "large" ? "large" : "comfortable");
  }

  /* Account sync: at sign-in, account values (when set) win over the
     device copy; local edits afterwards write both layers. */
  var syncing = false;
  function mirror(patch) {
    if (syncing) return;
    if (window.CSAuth && window.CSAuth.getUser && window.CSAuth.getUser()) {
      try { window.CSAuth.savePrefs(patch).then(function () {}, function () {}); } catch (e) {}
    }
  }
  function adoptFromAccount(user) {
    try {
      var meta = (user && user.user_metadata) || {};
      syncing = true;
      if (meta.theme_mode === "light" || meta.theme_mode === "dark" || meta.theme_mode === "system") {
        lsSet(THEME_KEY, meta.theme_mode);
      }
      if (typeof meta.reduce_motion === "boolean") lsSet(MOTION_KEY, meta.reduce_motion ? "1" : "");
      if (meta.text_size === "large" || meta.text_size === "comfortable") lsSet(TEXT_KEY, meta.text_size);
      syncing = false;
      apply();
    } catch (e) { syncing = false; }
  }
  function hookAuth() {
    if (!window.CSAuth || !window.CSAuth.onChange) return false;
    window.CSAuth.onChange(function (user, event) {
      if (user && (event === "SIGNED_IN" || event === "INITIAL")) adoptFromAccount(user);
    });
    return true;
  }
  if (!hookAuth()) {
    var tries = 0;
    var iv = setInterval(function () { if (hookAuth() || ++tries > 40) clearInterval(iv); }, 250);
  }

  if (mq && mq.addEventListener) {
    mq.addEventListener("change", function () { if (getMode() === "system") apply(); });
  }

  window.CSTheme = {
    apply: apply,
    getMode: getMode,
    resolvedTheme: resolvedTheme,
    setMode: function (mode) {
      if (mode !== "light" && mode !== "dark" && mode !== "system") mode = "system";
      lsSet(THEME_KEY, mode);
      apply();
      mirror({ theme_mode: mode });
    },
    getReduceMotion: function () { return lsGet(MOTION_KEY) === "1"; },
    setReduceMotion: function (on) {
      lsSet(MOTION_KEY, on ? "1" : "");
      apply();
      mirror({ reduce_motion: !!on });
    },
    getTextSize: function () { return lsGet(TEXT_KEY) === "large" ? "large" : "comfortable"; },
    setTextSize: function (size) {
      size = size === "large" ? "large" : "comfortable";
      lsSet(TEXT_KEY, size);
      apply();
      mirror({ text_size: size });
    }
  };

  apply();
})();
