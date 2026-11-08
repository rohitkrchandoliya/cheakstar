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

/* ---------------- display language (added 2026-11-08) ----------------
   The Settings page has always saved a display language (device
   copy in localStorage "ck_lang", account copy in the
   display_language metadata), but nothing ever consumed the saved
   value. This runtime closes that gap with the same two-layer rule
   as the theme above: the device copy applies on every page at
   once; at sign-in the account copy wins (adopted once, then the
   page reloads so the new language applies cleanly). Translation
   itself is Google Translate's page widget, driven by its
   "googtrans" cookie: English is the site's own text, so English
   clears the cookie and loads nothing. The widget's banner and
   gadget are hidden by the stylesheets — the language is chosen in
   Settings, never in a Google dropdown. Failure-isolated: if the
   widget cannot be reached, the page simply stays in English. */
(function () {
  // Shared boot guard: this same runtime also ships in script.js
  // and in the tools pages' tools.js, and some pages load two of
  // those files. The first copy to run claims the slot; the others
  // step aside, so the translate element is never injected twice.
  if (window.__csLangBoot) return;
  window.__csLangBoot = true;
  var LANGS = ["en", "hi", "bn", "te", "mr", "ta", "ur", "gu", "kn", "ml", "pa", "es", "fr", "de", "ar", "zh-CN", "ja"];
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function ssGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }

  function savedLang() {
    var v = lsGet("ck_lang") || "en";
    return LANGS.indexOf(v) >= 0 ? v : "en";
  }
  function cookieVariants(write) {
    // The translate widget reads a host cookie; some setups also see
    // a domain cookie, so both are written/cleared the same way.
    write("");
    try {
      var host = window.location.hostname || "";
      if (host && host.indexOf(".") > 0) write("; domain=" + host);
    } catch (e) {}
  }
  function setTransCookie(lang) {
    cookieVariants(function (suffix) {
      try {
        document.cookie = "googtrans=/en/" + lang + suffix + "; path=/; max-age=31536000; SameSite=Lax";
      } catch (e) {}
    });
  }
  function clearTransCookie() {
    cookieVariants(function (suffix) {
      try {
        document.cookie = "googtrans=" + suffix + "; path=/; max-age=0; SameSite=Lax";
      } catch (e) {}
    });
  }

  var started = false;
  function applyLanguage() {
    if (started) return;
    started = true;
    var lang = savedLang();
    if (lang === "en") { clearTransCookie(); return; }
    setTransCookie(lang);
    var holder = document.createElement("div");
    holder.id = "google_translate_element";
    holder.setAttribute("aria-hidden", "true");
    (document.body || document.documentElement).appendChild(holder);
    window.csGoogleTranslateInit = function () {
      try {
        new window.google.translate.TranslateElement({
          pageLanguage: "en",
          includedLanguages: LANGS.join(","),
          autoDisplay: false
        }, "google_translate_element");
      } catch (e) { /* widget failed: the page stays in English */ }
    };
    var s = document.createElement("script");
    s.src = "https://translate.google.com/translate_a/element.js?cb=csGoogleTranslateInit";
    s.async = true;
    (document.head || document.documentElement).appendChild(s);
  }

  /* Account layer: at sign-in, a different saved language on the
     account is adopted to this device and applied through one
     reload (the session flag stops any reload loop). */
  function adoptFromAccount(user) {
    try {
      var meta = (user && user.user_metadata) || {};
      var want = meta.display_language;
      if (typeof want !== "string" || LANGS.indexOf(want) < 0) return;
      if (want === savedLang()) return;
      lsSet("ck_lang", want);
      if (ssGet("csLangAdopt") === want) return;
      ssSet("csLangAdopt", want);
      window.location.reload();
    } catch (e) {}
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

  if (document.body) applyLanguage();
  else document.addEventListener("DOMContentLoaded", applyLanguage);
})();
