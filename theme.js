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

  // The set cookie only asks the widget to restore the saved
  // language; it does not by itself start a translation pass.
  // Once the widget has built its language selector, select
  // the saved language in it and fire its change event — the
  // same step a visitor's own selection in the gadget takes,
  // and the step cookie-driven translate integrations perform
  // after the widget loads. The selector is built
  // asynchronously, so poll briefly; give up silently if it
  // never appears (the page then simply stays in English).
  function driveGadget(lang) {
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var combo = null;
      try { combo = document.querySelector("select.goog-te-combo"); } catch (e) {}
      if (combo) {
        if (combo.value === lang) { clearInterval(iv); return; }
        var has = false;
        for (var i = 0; i < combo.options.length; i++) {
          if (combo.options[i].value === lang) { has = true; break; }
        }
        if (has) {
          combo.value = lang;
          var ev = null;
          try { ev = new window.Event("change", { bubbles: true }); }
          catch (e) {
            try { ev = document.createEvent("HTMLEvents"); ev.initEvent("change", true, true); } catch (e2) {}
          }
          if (ev) combo.dispatchEvent(ev);
          if (combo.value === lang) { clearInterval(iv); return; }
        }
      }
      if (tries >= 30) clearInterval(iv);
    }, 200);
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
        driveGadget(lang);
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

/* ---------------- public theme + language controls (2026-11-14) ----------
   Owner's order: theme switching and language choice are PUBLIC — no
   sign-in needed. This block is appended, identical, to every file
   that can carry it (script.js, tools.js, theme.js, games-nav.js);
   the first copy to run claims window.__csPubControls and the
   others step aside, so a page loading two of those files still
   gets exactly one set of controls (the same boot-guard pattern
   the language runtime below already uses).

   THEME: the toggle drives the site's existing appearance system —
   the localStorage key "ck_theme_mode" and the data-theme attribute
   the stylesheets switch on; nothing parallel is invented. When
   theme.js is on the page, its window.CSTheme.setMode() is used
   (it also mirrors the choice to the signed-in account); otherwise
   the key is written directly and data-theme is re-applied here
   with the shells' own resolution rule (mode "system" follows
   prefers-color-scheme). The button is a two-state dark/light
   switch: a click pins the explicit opposite of the theme that is
   currently resolved. The three-state choice (incl. "system")
   stays on the Settings page and is honoured — never overwritten
   except by an explicit click here.

   LANGUAGE: the footer dropdown writes the same localStorage key
   "ck_lang" the Settings page saves and the language boot in
   these files consumes, sets/clears the Google Translate
   "googtrans" cookie exactly as that boot does, mirrors the
   choice to the account for signed-in users, and reloads once so
   the boot applies it — the same apply path the boot's own
   account-language adoption uses. "Auto (browser)" removes the
   saved key: the boot then falls back to the site's own English
   text and no translation is loaded. The language list matches
   the widget's includedLanguages in the language boot, so every
   offered language can actually translate.

   All styles are injected by this block (no stylesheet changes),
   so the main, tools and games sections render the controls
   identically even though their stylesheets are separate copies.
   The Google Translate banner/gadget suppression rules are
   included here as well: the tools stylesheet copy lacks them,
   and the widget's top banner must never push page content. */
(function () {
  "use strict";
  if (window.__csPubControls) return;
  window.__csPubControls = true;

  var THEME_KEY = "ck_theme_mode"; // system | light | dark (site's own key)
  var LANG_KEY = "ck_lang";        // site's own key (Settings page writes it)
  var LANGS = [
    ["en", "English"], ["hi", "Hindi — हिन्दी"], ["bn", "Bengali — বাংলা"],
    ["te", "Telugu — తెలుగు"], ["mr", "Marathi — मराठी"], ["ta", "Tamil — தமிழ்"],
    ["ur", "Urdu — اردو"], ["gu", "Gujarati — ગુજરાતી"], ["kn", "Kannada — ಕನ್ನಡ"],
    ["ml", "Malayalam — മലയാളം"], ["pa", "Punjabi — ਪੰਜਾਬੀ"],
    ["es", "Spanish — Español"], ["fr", "French — Français"],
    ["de", "German — Deutsch"], ["ar", "Arabic — العربية"],
    ["zh-CN", "Chinese — 中文"], ["ja", "Japanese — 日本語"]
  ];
  var SUN = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2.4M12 19.1v2.4M2.5 12h2.4M19.1 12h2.4M5 5l1.7 1.7M17.3 17.3L19 19M19 5l-1.7 1.7M6.7 17.3L5 19"/></svg>';
  var MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.6 14.5A8.5 8.5 0 1 1 9.5 3.4a7 7 0 0 0 11.1 11.1z"/></svg>';

  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { window.localStorage.removeItem(k); } catch (e) {} }

  /* ---------------- styles ---------------- */
  function injectStyles() {
    if (document.getElementById("csPubControlsCss")) return;
    var css = [
      ".cs-pub-theme-row{padding:10px 12px 0}",
      ".cs-pub-theme{display:flex;align-items:center;gap:9px;width:100%;padding:9px 10px;border-radius:8px;background:rgba(212,175,55,.12);border:1px solid var(--line,rgba(212,175,55,.35));color:var(--gold,#d4af37);font-weight:600;cursor:pointer;font-size:.88rem;font-family:inherit;text-align:left;transition:background .2s ease}",
      ".cs-pub-theme:hover{background:rgba(212,175,55,.22)}",
      ".cs-pub-theme svg{width:18px;height:18px;flex:0 0 auto;fill:none;stroke:currentColor;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}",
      ".cs-pub-theme-state{margin-left:auto;font-weight:500;color:var(--muted,#a9b8cf);font-size:.8rem}",
      "body.cs-rail .cs-pub-theme-row{padding:10px 8px 0}",
      "body.cs-rail .cs-pub-theme{justify-content:center;padding:9px 0}",
      "body.cs-rail .cs-pub-theme-label,body.cs-rail .cs-pub-theme-state{display:none}",
      ".cs-foot-controls{display:flex;align-items:center;gap:14px;flex-wrap:wrap;max-width:1100px;margin:10px auto 0;padding:10px 20px 14px;border-top:1px solid var(--line,rgba(212,175,55,.35))}",
      ".cs-foot-controls .cs-pub-theme{width:auto}",
      ".auth-foot .cs-foot-controls{justify-content:center;border-top:none;margin-top:4px}",
      ".cs-foot-lang{display:flex;align-items:center;gap:8px;font-size:.9rem;color:var(--muted,#a9b8cf)}",
      ".cs-foot-lang select{background:var(--card,#10233f);color:var(--ink,#eef2f8);border:1px solid var(--line,rgba(212,175,55,.35));border-radius:8px;padding:7px 9px;font:inherit;font-size:.9rem;cursor:pointer;max-width:230px}",
      ".goog-te-banner-frame.skiptranslate,.goog-te-banner-frame{display:none!important}",
      "body{top:0!important}",
      "#goog-gt-tt,.goog-te-balloon-frame{display:none!important}",
      ".goog-te-gadget{font-size:0!important;color:transparent!important}",
      ".goog-text-highlight{background:none!important;box-shadow:none!important}"
    ].join("\n");
    var st = document.createElement("style");
    st.id = "csPubControlsCss";
    st.textContent = css;
    (document.head || document.documentElement).appendChild(st);
  }

  /* ---------------- theme ---------------- */
  function themeMode() {
    var m = lsGet(THEME_KEY);
    return (m === "light" || m === "dark" || m === "system") ? m : "system";
  }
  function resolvedTheme() {
    var m = themeMode();
    if (m === "light" || m === "dark") return m;
    return (window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark";
  }
  function setThemeMode(mode) {
    if (window.CSTheme && window.CSTheme.setMode) { window.CSTheme.setMode(mode); return; }
    lsSet(THEME_KEY, mode);
    document.documentElement.setAttribute("data-theme", resolvedTheme());
  }
  function paintToggle(btn) {
    var r = resolvedTheme();
    btn.innerHTML = (r === "dark" ? MOON : SUN) +
      '<span class="cs-pub-theme-label">Theme</span>' +
      '<span class="cs-pub-theme-state">' + (r === "dark" ? "Dark" : "Light") + "</span>";
    btn.setAttribute("aria-label", r === "dark" ? "Switch to light theme" : "Switch to dark theme");
    btn.title = r === "dark" ? "Switch to light theme" : "Switch to dark theme";
  }
  function buildToggle() {
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cs-pub-theme";
    btn.id = "csPubThemeBtn";
    paintToggle(btn);
    btn.addEventListener("click", function () {
      setThemeMode(resolvedTheme() === "dark" ? "light" : "dark");
      paintToggle(btn);
    });
    return btn;
  }

  /* ---------------- language ---------------- */
  function savedLang() {
    var v = lsGet(LANG_KEY);
    if (!v) return "auto";
    for (var i = 0; i < LANGS.length; i++) { if (LANGS[i][0] === v) return v; }
    return "auto";
  }
  function cookieVariants(write) {
    write("");
    try {
      var host = window.location.hostname || "";
      if (host && host.indexOf(".") > 0) write("; domain=" + host);
    } catch (e) {}
  }
  function setTransCookie(lang) {
    cookieVariants(function (suffix) {
      try { document.cookie = "googtrans=/en/" + lang + suffix + "; path=/; max-age=31536000; SameSite=Lax"; } catch (e) {}
    });
  }
  function clearTransCookie() {
    cookieVariants(function (suffix) {
      try { document.cookie = "googtrans=" + suffix + "; path=/; max-age=0; SameSite=Lax"; } catch (e) {}
    });
  }
  function chooseLanguage(v) {
    if (v === "auto") { lsDel(LANG_KEY); clearTransCookie(); }
    else if (v === "en") { lsSet(LANG_KEY, "en"); clearTransCookie(); }
    else { lsSet(LANG_KEY, v); setTransCookie(v); }
    // Keep the account layer in step for signed-in users, the same
    // best-effort mirror theme.js performs for the theme choice.
    try {
      if (window.CSAuth && window.CSAuth.getUser && window.CSAuth.getUser() && window.CSAuth.savePrefs) {
        window.CSAuth.savePrefs({ display_language: v === "auto" ? "en" : v }).then(function () {}, function () {});
      }
    } catch (e) {}
    // One reload: the language boot in these files reads ck_lang on
    // load and drives the widget — its own apply path.
    window.location.reload();
  }
  function buildLangLabel() {
    var label = document.createElement("label");
    label.className = "cs-foot-lang notranslate";
    var span = document.createElement("span");
    span.textContent = "Language:";
    var sel = document.createElement("select");
    sel.id = "csLangSelect";
    sel.setAttribute("aria-label", "Display language");
    var auto = document.createElement("option");
    auto.value = "auto";
    auto.textContent = "Auto (browser)";
    sel.appendChild(auto);
    for (var i = 0; i < LANGS.length; i++) {
      var o = document.createElement("option");
      o.value = LANGS[i][0];
      o.textContent = LANGS[i][1];
      sel.appendChild(o);
    }
    sel.value = savedLang();
    sel.addEventListener("change", function () { chooseLanguage(sel.value); });
    label.appendChild(span);
    label.appendChild(sel);
    return label;
  }

  /* ---------------- placement ---------------- */
  function shellScriptPresent() {
    return !!document.querySelector('script[src*="script.js"],script[src*="tools.js"],script[src*="games-nav.js"]');
  }
  function placeControls() {
    injectStyles();
    // Theme toggle: into the sidebar, directly above the Collapse
    // row (.cs-side-foot) — the same spot in all three shells.
    if (!document.getElementById("csPubThemeBtn")) {
      var sideFoot = document.querySelector(".cs-side-foot");
      var aside = document.getElementById("csSide") || document.querySelector("aside.cs-side");
      if (sideFoot && sideFoot.parentNode) {
        var row = document.createElement("div");
        row.className = "cs-pub-theme-row notranslate";
        row.appendChild(buildToggle());
        sideFoot.parentNode.insertBefore(row, sideFoot);
      } else if (aside) {
        var row2 = document.createElement("div");
        row2.className = "cs-pub-theme-row notranslate";
        row2.appendChild(buildToggle());
        aside.appendChild(row2);
      }
      // No sidebar yet: if a shell file is on the page it will
      // build the sidebar — the retry loop below places the
      // toggle then. Only pages with no shell at all (sign-in,
      // sign-up) get the toggle in the footer row instead.
    }
    // Footer row: language dropdown (+ theme toggle fallback).
    var foot = document.querySelector("footer.site") || document.querySelector("footer");
    if (foot && !document.getElementById("csLangSelect")) {
      var wrap = document.createElement("div");
      wrap.className = "cs-foot-controls";
      if (!document.getElementById("csPubThemeBtn") && !shellScriptPresent()) {
        wrap.appendChild(buildToggle());
      }
      wrap.appendChild(buildLangLabel());
      foot.appendChild(wrap);
    }
  }
  function init() {
    try { placeControls(); } catch (e) {}
    // The shells build their sidebar synchronously while their file
    // parses, but when this copy runs from theme.js the shell file
    // may parse later in the page — retry briefly so the toggle
    // still lands in the sidebar instead of the footer.
    var tries = 0;
    var iv = setInterval(function () {
      tries++;
      var done = document.getElementById("csPubThemeBtn") && document.getElementById("csLangSelect");
      if (done || tries > 20) { clearInterval(iv); return; }
      try { placeControls(); } catch (e) {}
    }, 250);
    if (window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: light)");
      if (mq.addEventListener) mq.addEventListener("change", function () {
        var b = document.getElementById("csPubThemeBtn");
        if (b) paintToggle(b);
      });
    }
    window.addEventListener("storage", function (e) {
      if (e.key === THEME_KEY) {
        var b = document.getElementById("csPubThemeBtn");
        if (b) paintToggle(b);
      }
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
  else init();
})();
