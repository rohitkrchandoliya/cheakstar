/* Cheakstar theme-boot.js -- the pre-paint appearance boot.
   Loaded synchronously in the <head> of every page. Applies the
   visitor's saved appearance choices (localStorage: ck_theme_mode,
   ck_reduce_motion, ck_text_size -- set on the Settings page and by
   the public theme toggle) to the <html> element before first paint,
   so no page ever flashes the wrong theme. The full runtime --
   live system-theme tracking plus account sync -- is theme.js;
   this file is only the boot, and it is the single copy of it
   (it replaces the boot block shell.js used to carry and the
   inline snippets individual pages used to bake in). */

// Appearance: apply the visitor's saved theme choices on every page.
// The choices live in localStorage (set on the Settings page; the full
// runtime, including account sync, is theme.js). Pages that do not load
// theme.js still honour the choices here, because this file loads on
// every page and the stylesheet switches on the data-theme attribute.
// The device copy survives refresh and sign-out; nothing here clears it.
(function () {
  try {
    var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
    function currentMode() {
      try { return window.localStorage.getItem("ck_theme_mode") || "system"; } catch (e) { return "system"; }
    }
    function applyAppearance() {
      var mode = currentMode();
      var dark = mode === "dark" || (mode !== "light" && !(mq && mq.matches));
      var root = document.documentElement;
      root.setAttribute("data-theme", dark ? "dark" : "light");
      try {
        root.setAttribute("data-motion", window.localStorage.getItem("ck_reduce_motion") === "1" ? "reduced" : "full");
        root.setAttribute("data-textsize", window.localStorage.getItem("ck_text_size") === "large" ? "large" : "comfortable");
      } catch (e) {}
    }
    applyAppearance();
    if (mq && mq.addEventListener) {
      mq.addEventListener("change", function () {
        if (currentMode() === "system") applyAppearance();
      });
    }
  } catch (e) { /* appearance is cosmetic; never break the page */ }
})();

// Referrer policy (security headers, the part a static host can
// carry): send only the origin to other sites, the full address
// only within this site. Pages that already declare a referrer
// policy keep theirs; this fills the gap on every other page.
(function () {
  try {
    if (!document.querySelector('meta[name="referrer"]')) {
      var m = document.createElement("meta");
      m.name = "referrer";
      m.content = "strict-origin-when-cross-origin";
      document.head.appendChild(m);
    }
  } catch (e) { /* a missing referrer policy must never break a page */ }
})();
