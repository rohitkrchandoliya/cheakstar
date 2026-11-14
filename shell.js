/* Cheakstar shell.js -- the ONE site shell (unified 2026-11-14).
   Owner's order: a navigation or shell change must be made in ONE
   place and apply everywhere. This file replaces the three shell
   copies the site used to carry (script.js for the main pages,
   tools-preview/assets/tools.js for the tool pages and
   games/assets/games-nav.js for the games pages):

   - every page loads this file from the site root and it builds the
     sidebar + navigation (ONE definition of every nav link), the
     mobile top bar and drawer, the collapse rail, the search box,
     the sidebar account block, the floating points card loader and
     the site footer;
   - the public theme toggle and the footer language dropdown live
     here once (folded in from the 2026-11-14 controls build);
   - the site-root prefix is derived from this file's own script
     URL, so the same file works at every page depth;
   - the auth pages (body.auth-page) get no sidebar, exactly as
     before: only the appearance boot, the language runtime and the
     public controls run there.
   Hand-rolled vanilla JS, no libraries, no external calls except
   the site's own lazy modules (auth.js, rewards.js, guide.js) and
   the Google Translate widget the language runtime drives. Every
   block is failure-isolated. */

// (The appearance boot below is the first of shell.js's blocks; the
// file header at the very top of shell.js describes the whole file.)

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

document.addEventListener("DOMContentLoaded", function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

// Mobile navbar: hide on scroll down, show again on scroll up.
// Active only at widths up to 768px; on desktop the header is always visible.
(function () {
  var header = document.querySelector("header.site");
  if (!header || !window.matchMedia) return;
  var mq = window.matchMedia("(max-width: 768px)");
  var lastY = window.scrollY || window.pageYOffset || 0;
  var hidden = false;

  function setHidden(value) {
    if (value === hidden) return;
    hidden = value;
    header.classList.toggle("nav-hidden", value);
  }

  function onScroll() {
    var y = window.scrollY || window.pageYOffset || 0;
    if (!mq.matches) {
      setHidden(false);
      lastY = y;
      return;
    }
    if (y < 100) {
      setHidden(false);
      lastY = y;
      return;
    }
    if (Math.abs(y - lastY) <= 4) return; // ignore tiny jitter
    if (y > lastY) setHidden(true);        // scrolling down
    else setHidden(false);                 // scrolling up
    lastY = y;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  if (mq.addEventListener) mq.addEventListener("change", onScroll);
  else if (mq.addListener) mq.addListener(onScroll);
  onScroll();
})();

// ==== Cheakstar shell (2026-11-06): preloader, sidebar, scroll UI, reveal.
// Hand-rolled vanilla JS, no libraries, no external calls. Every block is
// failure-isolated: if anything throws, the page keeps working and the
// original top header (the no-JS fallback) is restored. ====

// ==== Cheakstar shell: preloader, sidebar, scroll UI, reveal. ====
(function () {
  "use strict";
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function ssGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }
  var reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* Appearance is applied by the boot block at the top of this file
     (the same code the main site's script.js used to carry). */

  // Auth pages (sign-in, sign-up, reset password) carry no sidebar by
  // design. Flag that mode and skip the shell build entirely; the
  // public-controls block at the end of this file still places the
  // theme toggle and language dropdown into their footer.
  var isAuthPage = !!(document.body && document.body.classList && document.body.classList.contains("auth-page"));
  if (isAuthPage) { window.__csShellAuth = true; return; }

  // Site root prefix, derived from this script's own URL
  // ("<site-root>shell.js"), so the SAME file works at every depth:
  // the site root, /tools-preview/, /tools-preview/<tool>/, /games/
  // and /games/<game>/. Every link the shell builds is prefixed with
  // one of these three roots -- this is the single definition of the
  // site navigation (the unification of 2026-11-14: script.js,
  // tools.js and games-nav.js used to each carry their own copy).
  var sitePrefix = "";
  try {
    var scriptEl = document.currentScript;
    if (scriptEl && scriptEl.src) {
      var marker = "shell.js";
      var idx = scriptEl.src.indexOf(marker);
      if (idx > -1) { sitePrefix = scriptEl.src.slice(0, idx); }
    }
  } catch (e) { /* keep the empty fallback (correct at the site root) */ }
  var toolsPrefix = sitePrefix + "tools-preview/";
  var gamesPrefix = sitePrefix + "games/";

  /* ---------------- Preloader (same design and timing as the main site) ---------------- */
  var preStart = Date.now();
  var pre = null, statusTimer = null, preHidden = false;
  try {
    var seen = !!ssGet("csPreSeen");
    ssSet("csPreSeen", "1");
    // The branded preloader belongs to the first page of a session.
    // On later navigations it only slows the site down, so once this
    // session has seen it, it is not created at all.
    if (!seen) {
      pre = document.createElement("div");
      pre.className = "cs-preloader";
      pre.id = "csPreloader";
      pre.setAttribute("aria-hidden", "true");
      pre.innerHTML =
        '<svg class="cs-pre-shield" viewBox="0 0 24 24" aria-hidden="true">' +
        '<path pathLength="100" d="M12 2.8l7.2 2.9v5.5c0 4.6-3 7.7-7.2 9.2C7.8 18.9 4.8 15.8 4.8 11.2V5.7z"/>' +
        '<path class="cs-pre-check" pathLength="100" d="M8.9 11.9l2.1 2.1 4-4.1"/></svg>' +
        '<div class="cs-pre-brand">CHEAK<span>STAR</span></div>' +
        '<div class="cs-pre-bar"><i></i></div>' +
        '<div class="cs-pre-status" id="csPreStatus">Initialising secure session</div>';
      document.body.insertBefore(pre, document.body.firstChild);
      if (!reduced) {
        var phases = ["Initialising secure session", "Scanning modules", "Verifying integrity", "Loading interface"];
        var phase = 0, statusEl = document.getElementById("csPreStatus");
        statusTimer = setInterval(function () {
          phase = Math.min(phase + 1, phases.length - 1);
          if (statusEl) statusEl.textContent = phases[phase];
        }, 420);
      }
    }
    window.__csPreSeen = seen;
  } catch (e) { pre = null; }

  function hidePre() {
    if (preHidden) return;
    preHidden = true;
    if (statusTimer) { clearInterval(statusTimer); statusTimer = null; }
    var minMs = reduced ? 0 : (window.__csPreSeen ? 120 : 500);
    var wait = Math.max(0, minMs - (Date.now() - preStart));
    setTimeout(function () {
      document.body.classList.add("cs-loaded");
      if (pre) {
        pre.classList.add("cs-done");
        setTimeout(function () { if (pre && pre.parentNode) pre.parentNode.removeChild(pre); }, 700);
      }
    }, wait);
  }
  if (document.readyState === "complete") hidePre();
  else {
    window.addEventListener("load", hidePre);
    document.addEventListener("DOMContentLoaded", function () { setTimeout(hidePre, 450); });
  }
  setTimeout(hidePre, 1800); // hard failsafe: the overlay can never trap the page

  /* ---------------- Sidebar shell (identical structure to the main site) ---------------- */
  try {
    var ICONS = {
      home: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.8V21h14V9.8"/><path d="M9.5 21v-6h5v6"/>',
      book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
      cap: '<path d="M2.5 9.2 12 4.5l9.5 4.7L12 13.9z"/><path d="M6.5 11.4v4.3c0 1.4 2.5 2.6 5.5 2.6s5.5-1.2 5.5-2.6v-4.3"/><path d="M21.5 9.2v4.6"/>',
      shield: '<path d="M12 3l7 2.8v5.4c0 4.4-2.9 7.4-7 8.8-4.1-1.4-7-4.4-7-8.8V5.8z"/><path d="M9.2 11.8l2 2 3.8-3.8"/>',
      pen: '<path d="M12 20h9"/><path d="M16.6 3.6a2.1 2.1 0 0 1 3 3L8 18.2l-4.2 1.1L4.9 15z"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5.2"/><path d="M12 7.8h.01"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/>',
      checklist: '<path d="M10 6h10M10 12h10M10 18h10"/><path d="M3.4 5.5 4.9 7 7.4 4.3"/><path d="M3.4 11.5 4.9 13l2.5-2.7"/><path d="M3.4 17.5 4.9 19l2.5-2.7"/>',
      gift: '<rect x="3" y="8" width="18" height="4"/><path d="M5 12v9h14v-9"/><path d="M12 8v13"/><path d="M12 8c-4 0-4.6-4.6-2.1-4.6C11.7 3.4 12 8 12 8z"/><path d="M12 8c4 0 4.6-4.6 2.1-4.6C12.3 3.4 12 8 12 8z"/>',
      cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="10" y="10" width="4" height="4"/><path d="M9 2.5V6M15 2.5V6M9 18v3.5M15 18v3.5M2.5 9H6M2.5 15H6M18 9h3.5M18 15h3.5"/>',
      grid: '<rect x="3.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="3.5" width="7" height="7" rx="1.2"/><rect x="3.5" y="13.5" width="7" height="7" rx="1.2"/><rect x="13.5" y="13.5" width="7" height="7" rx="1.2"/>',
      qr: '<rect x="3.5" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="14" y="3.5" width="6.5" height="6.5" rx="1"/><rect x="3.5" y="14" width="6.5" height="6.5" rx="1"/><path d="M14 14h3v3h-3z"/><path d="M20.5 14v.01M14 20.5v.01M17.5 17.5h3v3h-3z"/>',
      doc: '<path d="M6 2.8h8L19 8v13.2H6z"/><path d="M13.5 2.8V8H19"/>',
      image: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16.5 16 12l-8.5 8.5"/>',
      play: '<circle cx="12" cy="12" r="9"/><path d="M10 8.5 16 12l-6 3.5z"/>',
      dice: '<rect x="3.5" y="3.5" width="17" height="17" rx="4"/><path d="M8.3 8.3h.01M15.7 8.3h.01M12 12h.01M8.3 15.7h.01M15.7 15.7h.01"/>',
      archive: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9"/><path d="M10 13h4"/>',
      calc: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8.5 6.5h7"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>',
      clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3.2 2"/>',
      trophy: '<path d="M7.5 4h9v4.2a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 5.8H4.8a2.7 2.7 0 0 0 2.9 3.4M16.5 5.8h2.7a2.7 2.7 0 0 1-2.9 3.4"/><path d="M12 12.7v3.3"/><path d="M8.8 20h6.4"/><path d="M10.2 16h3.6l.7 4H9.5z"/>'
    };
    function icon(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.grid) + "</svg>"; }
    var CHEV = '<svg class="cs-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 9.5 12 15.5 18 9.5"/></svg>';

    function siteLink(file, label, ic) { return [sitePrefix + file, label, ic]; }
    function toolLink(slug, label) { return [toolsPrefix + slug + "/", label]; }
    function gameLink(slug, label) { return [gamesPrefix + slug + "/", label]; }
    var NAV = [
      { id: "main", name: "Main", links: [
        siteLink("index.html", "Home", "home"),
        siteLink("books.html", "Books & Store", "book"),
        siteLink("training.html", "Training", "cap"),
        siteLink("services.html", "Security Services", "shield"),
        siteLink("blog.html", "Blog", "pen"),
        siteLink("leaderboard.html", "Leaderboard", "trophy"),
        siteLink("about.html", "About", "info"),
        siteLink("contact.html", "Contact", "mail")
      ]},
      { id: "learn", name: "Learn Free", links: [
        siteLink("checklist.html", "Free Checklist", "checklist"),
        siteLink("free-resources.html", "Free Resources", "gift"),
        siteLink("knowledge-brain.html", "Knowledge Brain", "cpu")
      ]},
      { id: "tools", name: "Tools", links: [
        [toolsPrefix, "All Tools", "grid"]
      ], cats: [
        { id: "qr-video", name: "QR & Video Links", icon: "qr", links: [
          toolLink("qr-code-generator", "QR Code Generator"),
          toolLink("qr-code-scanner", "QR Code Scanner"),
          toolLink("youtube-thumbnail-downloader", "YouTube Thumbnail Downloader"),
          toolLink("video-link-info", "Video Link Info")
        ]},
        { id: "image", name: "Image Tools", icon: "image", links: [
          toolLink("image-information", "Image Information"),
          toolLink("image-compressor", "Image Compressor"),
          toolLink("image-converter", "Image Converter"),
          toolLink("image-resizer-cropper", "Image Resizer & Cropper"),
          toolLink("passport-photo-maker", "Passport Photo Maker"),
          toolLink("resize-image-to-kb", "Resize Image to KB"),
          toolLink("color-picker-from-image", "Color Picker from Image"),
          toolLink("favicon-generator", "Favicon Generator"),
          toolLink("barcode-generator", "Barcode Generator"),
          toolLink("image-to-base64", "Image to Base64 Converter"),
          toolLink("meme-generator", "Meme Generator"),
          toolLink("collage-maker", "Photo Collage Maker")
        ]},
        { id: "pdf", name: "PDF Tools", icon: "doc", links: [
          toolLink("pdf-merge", "PDF Merge"),
          toolLink("pdf-split", "PDF Split"),
          toolLink("images-to-pdf", "Images to PDF"),
          toolLink("pdf-to-images", "PDF to Images"),
          toolLink("pdf-compressor", "PDF Compressor"),
          toolLink("rotate-pdf", "Rotate PDF"),
          toolLink("pdf-to-text", "PDF to Text"),
          toolLink("text-to-pdf", "Text to PDF"),
          toolLink("pdf-watermark", "Add Watermark to PDF"),
          toolLink("pdf-page-numbers", "Add Page Numbers to PDF"),
          toolLink("pdf-delete-pages", "Delete Pages from PDF")
        ]},
        { id: "audio-video", name: "Audio & Video Tools", icon: "play", links: [
          toolLink("media-info", "Media Info"),
          toolLink("audio-converter", "Audio Converter"),
          toolLink("extract-audio", "Extract Audio from Video"),
          toolLink("video-trimmer", "Video Trimmer"),
          toolLink("gif-maker", "GIF Maker"),
          toolLink("video-converter", "Video Converter"),
          toolLink("video-compressor", "Video Compressor"),
          toolLink("video-speed-changer", "Video Speed Changer"),
          toolLink("audio-merger", "Audio Merger"),
          toolLink("video-merger", "Video Merger"),
          toolLink("voice-recorder", "Voice Recorder"),
          toolLink("screen-recorder", "Screen Recorder"),
          toolLink("microphone-test", "Microphone Test"),
          toolLink("webcam-test", "Webcam Test"),
          toolLink("speaker-test", "Speaker / Headphone Test")
        ]},
        { id: "text", name: "Text Tools", icon: "pen", links: [
          toolLink("word-counter", "Word & Character Counter"),
          toolLink("case-converter", "Case Converter & Line Tools"),
          toolLink("csv-json-converter", "CSV / JSON Converter"),
          toolLink("base64-encoder-decoder", "Base64 Encoder & Decoder"),
          toolLink("json-formatter", "JSON Formatter & Validator"),
          toolLink("text-diff-checker", "Text Diff Checker"),
          toolLink("url-encoder-decoder", "URL Encoder & Decoder"),
          toolLink("text-repeater", "Text Repeater"),
          toolLink("remove-duplicate-lines", "Remove Duplicate Lines"),
          toolLink("line-sorter", "Line Sorter"),
          toolLink("lorem-ipsum-generator", "Lorem Ipsum Generator"),
          toolLink("reverse-text", "Reverse Text Generator"),
          toolLink("typing-speed-test", "Typing Speed Test")
        ]},
         { id: "web-dev", name: "Web & Dev", icon: "cpu", links: [
          toolLink("slug-generator", "Slug Generator"),
          toolLink("uuid-generator", "UUID Generator"),
          toolLink("markdown-preview", "Markdown Preview"),
          toolLink("code-formatter", "Code Formatter & Minifier"),
          toolLink("regex-tester", "Regex Tester"),
          toolLink("timestamp-converter", "Unix Timestamp Converter"),
          toolLink("jwt-decoder", "JWT Decoder"),
          toolLink("color-palette-generator", "Color Palette Generator"),
          toolLink("gradient-generator", "CSS Gradient Generator")
        ]},
         { id: "security", name: "Security & OSINT", icon: "shield", links: [
          toolLink("dns-lookup", "DNS Lookup"),
          toolLink("rdap-whois-lookup", "Domain Info (WHOIS / RDAP)"),
          toolLink("ip-lookup", "IP Address Lookup"),
          toolLink("whats-my-ip", "What's My IP"),
          toolLink("subdomain-finder", "Subdomain Finder"),
          toolLink("photo-privacy-checker", "Photo Privacy Checker (EXIF)"),
          toolLink("phone-number-checker", "Phone Number Checker"),
          toolLink("security-headers-check", "Website Security Headers Check"),
          toolLink("email-breach-check", "Email Breach Check"),
          toolLink("password-breach-check", "Leaked Password Check"),
          toolLink("password-generator", "Password Generator"),
          toolLink("password-strength-checker", "Password Strength Checker")
        ]},
        { id: "files", name: "Daily File Tools", icon: "archive", links: [
          toolLink("zip-extractor", "ZIP Extractor"),
          toolLink("file-hash-checker", "File Hash Checker")
        ]},
        { id: "calculators", name: "Calculators", icon: "calc", links: [
          toolLink("age-calculator", "Age Calculator"),
          toolLink("emi-calculator", "EMI Calculator"),
          toolLink("sip-calculator", "SIP Calculator"),
          toolLink("gst-calculator", "GST Calculator"),
          toolLink("date-difference-calculator", "Date Difference Calculator"),
          toolLink("percentage-calculator", "Percentage Calculator"),
          toolLink("unit-converter", "Unit Converter"),
          toolLink("bmi-calculator", "BMI Calculator"),
          toolLink("compound-interest-calculator", "Compound Interest Calculator"),
          toolLink("fd-calculator", "FD Calculator"),
          toolLink("rd-calculator", "RD Calculator"),
          toolLink("ppf-calculator", "PPF Calculator"),
          toolLink("discount-calculator", "Discount Calculator"),
          toolLink("income-tax-calculator", "Income Tax Calculator India"),
          toolLink("bmr-calculator", "BMR & Calorie Calculator"),
          toolLink("cgpa-calculator", "CGPA Calculator"),
          toolLink("pregnancy-due-date-calculator", "Pregnancy Due Date Calculator"),
          toolLink("water-intake-calculator", "Water Intake Calculator"),
          toolLink("scientific-calculator", "Scientific Calculator"),
          toolLink("loan-amortization-calculator", "Loan Amortization Calculator")
        ]},
        { id: "daily", name: "Daily Utilities", icon: "clock", links: [
          toolLink("stopwatch", "Stopwatch"),
          toolLink("online-timer", "Online Timer"),
          toolLink("pomodoro-timer", "Pomodoro Timer"),
          toolLink("world-clock", "World Clock"),
          toolLink("time-zone-converter", "Time Zone Converter"),
          toolLink("countdown-timer", "Countdown Timer"),
          toolLink("tip-calculator", "Tip Calculator"),
          toolLink("random-number-generator", "Random Number Generator"),
          toolLink("coin-flip", "Coin Flip"),
          toolLink("dice-roller", "Dice Roller"),
          toolLink("currency-converter", "Currency Converter"),
          toolLink("internet-speed-test", "Internet Speed Test")
        ]}
      ]},
      { id: "games", name: "Games", links: [
        [gamesPrefix + "index.html", "All Games", "dice"],
        gameLink("gem-smash", "Gem Smash"),
        gameLink("memory-match", "Memory Match"),
        gameLink("number-merge-2048", "Number Merge 2048"),
        gameLink("blockfit-puzzle", "BlockFit Puzzle"),
        gameLink("classic-ludo", "Classic Ludo"),
        gameLink("snake-classic", "Snake Classic"),
        gameLink("breakout-brick-smash", "Breakout Brick Smash"),
        gameLink("flappy-wing", "Flappy Wing"),
        gameLink("traffic-dodger", "Traffic Dodger"),
        gameLink("target-range", "Target Range"),
        gameLink("whack-a-bug", "Whack-a-Bug"),
        gameLink("simon-sequence", "Simon Sequence"),
        gameLink("stack-tower", "Stack Tower"),
        gameLink("turbo-lane-racer", "Turbo Lane Racer"),
        gameLink("space-blaster", "Space Blaster"),
        gameLink("minesweeper", "Minesweeper"),
        gameLink("sliding-puzzle", "Sliding Puzzle"),
        gameLink("hangman-tech-words", "Hangman: Tech Words"),
        gameLink("word-finder", "Word Finder"),
        gameLink("connect-four", "Connect Four"),
        gameLink("color-flood", "Color Flood"),
        gameLink("sudoku", "Sudoku"),
        gameLink("parking-master", "Parking Master"),
        gameLink("paper-plane-pilot", "Paper Plane Pilot"),
        gameLink("archery-master", "Archery Master"),
        gameLink("pinball-mini", "Pinball Mini"),
        gameLink("chess-puzzles", "Chess Puzzles"),
        gameLink("solitaire", "Solitaire"),
        gameLink("aim-trainer", "Aim Trainer")

      ]}
    ];
    var TOOL_CATS = NAV[2].cats;
    var GAME_LINKS = NAV[3].links;

    // Which link is the current page? One unified detector for the
    // whole site (the three old shells each had their own):
    // - a /tools-preview/ path resolves its tool slug against the
    //   tool categories (and marks the category);
    // - a /games/ path resolves its game slug against the Games
    //   group links;
    // - anything else matches a Main / Learn Free file name, or
    //   stays unmatched (a blog article highlights nothing).
    var path = window.location.pathname || "/";
    var currentHref = null, currentCat = null, pageGroup = null;
    (function detectCurrent() {
      var tp = path.indexOf("/tools-preview/");
      if (tp >= 0) {
        var rest = path.slice(tp + "/tools-preview/".length);
        var segName = rest.split("/")[0];
        pageGroup = "tools";
        if (segName && segName !== "index.html") {
          for (var c = 0; c < TOOL_CATS.length; c++) {
            for (var i = 0; i < TOOL_CATS[c].links.length; i++) {
              if (TOOL_CATS[c].links[i][0] === toolsPrefix + segName + "/") {
                currentHref = TOOL_CATS[c].links[i][0];
                currentCat = TOOL_CATS[c].id;
                return;
              }
            }
          }
        }
        currentHref = toolsPrefix; // tools hub or an unknown tools path
        return;
      }
      var gp = path.indexOf("/games/");
      if (gp >= 0) {
        var grest = path.slice(gp + "/games/".length);
        var gseg = grest.split("/")[0];
        pageGroup = "games";
        if (gseg && gseg !== "index.html") {
          for (var gi = 0; gi < GAME_LINKS.length; gi++) {
            if (GAME_LINKS[gi][0] === gamesPrefix + gseg + "/") {
              currentHref = GAME_LINKS[gi][0];
              return;
            }
          }
        }
        currentHref = gamesPrefix + "index.html"; // games hub or an unknown games path
        return;
      }
      var file = path.split("/").pop() || "index.html";
      if (file === "") file = "index.html";
      for (var g = 0; g < NAV.length; g++) {
        for (var i2 = 0; i2 < NAV[g].links.length; i2++) {
          if (NAV[g].links[i2][0] === sitePrefix + file) {
            currentHref = NAV[g].links[i2][0];
            pageGroup = NAV[g].id;
            return;
          }
        }
      }
      currentHref = sitePrefix + file; // e.g. a blog article: no nav item
    })();

    // Accordion state -- EXCLUSIVE, same rules and same storage keys
    // on every page (csGroups / csToolCats): at most one top-level
    // group and at most one tool category open at any time. The
    // current page's group/category is forced open on load (tool
    // pages force Tools + their category, game pages force Games,
    // main pages force their own group); otherwise the single stored
    // open section wins, falling back to Main / no category.
    var storedGroups = {}, storedCats = {};
    try { storedGroups = JSON.parse(lsGet("csGroups") || "{}") || {}; } catch (e) { storedGroups = {}; }
    try { storedCats = JSON.parse(lsGet("csToolCats") || "{}") || {}; } catch (e) { storedCats = {}; }
    var groupOpen = {}, catOpen = {};
    (function resolveOpen() {
      var og = pageGroup, oc = currentCat, g, c;
      if (!og) { for (g = 0; g < NAV.length; g++) { if (storedGroups[NAV[g].id] === true) { og = NAV[g].id; break; } } }
      if (!og) og = "main";
      NAV.forEach(function (gr) { groupOpen[gr.id] = gr.id === og; });
      if (!oc) { for (c = 0; c < TOOL_CATS.length; c++) { if (storedCats[TOOL_CATS[c].id] === true) { oc = TOOL_CATS[c].id; break; } } }
      TOOL_CATS.forEach(function (ct) { catOpen[ct.id] = ct.id === oc; });
    })();
    function persistGroups() { lsSet("csGroups", JSON.stringify(groupOpen)); }
    function persistCats() { lsSet("csToolCats", JSON.stringify(catOpen)); }
    function esc(s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
      });
    }

    // Build the shell DOM — the same markup the main site builds.
    var html = "";
    html += '<aside class="cs-side" id="csSide" aria-label="Site navigation">';
    html += '<div class="cs-side-head"><a class="cs-logo cs-logo-full" href="' + sitePrefix + 'index.html">CHEAK<span>STAR</span></a>' +
            '<a class="cs-logo cs-logo-mini" href="' + sitePrefix + 'index.html" aria-label="Cheakstar home">C<span>S</span></a>' +
            '<button class="cs-side-close" id="csSideClose" type="button" aria-label="Close menu">&times;</button></div>';
    html += '<div class="cs-filter"><input type="search" id="csFilter" placeholder="Search pages" aria-label="Search pages" autocomplete="off"></div>';
    html += '<nav class="cs-nav" id="csNav">';
    NAV.forEach(function (g) {
      html += '<div class="cs-group' + (groupOpen[g.id] ? " open" : "") + '" data-group="' + g.id + '">';
      html += '<button class="cs-group-head" type="button" aria-expanded="' + (groupOpen[g.id] ? "true" : "false") + '"><span class="cs-group-name">' + g.name + "</span>" + CHEV + "</button>";
      html += '<div class="cs-group-body"><div class="cs-group-inner">';
      g.links.forEach(function (l) {
        html += '<a href="' + l[0] + '"' + (l[0] === currentHref ? ' class="active" aria-current="page"' : "") + ' data-label="' + esc(l[1]) + '">' + icon(l[2]) + '<span class="cs-label">' + esc(l[1]) + "</span></a>";
      });
      if (g.cats) {
        g.cats.forEach(function (ct) {
          html += '<div class="cs-subgroup' + (catOpen[ct.id] ? " open" : "") + '" data-cat="' + ct.id + '">';
          html += '<button class="cs-subgroup-head" type="button" aria-expanded="' + (catOpen[ct.id] ? "true" : "false") + '" data-label="' + esc(ct.name) + '">' + icon(ct.icon) + '<span class="cs-label">' + esc(ct.name) + "</span>" + CHEV + "</button>";
          html += '<div class="cs-subgroup-body"><div class="cs-subgroup-inner">';
          ct.links.forEach(function (l) {
            html += '<a href="' + l[0] + '"' + (l[0] === currentHref ? ' class="active" aria-current="page"' : "") + ' data-label="' + esc(l[1]) + '"><span class="cs-label">' + esc(l[1]) + "</span></a>";
          });
          html += "</div></div></div>";
        });
      }
      html += "</div></div></div>";
    });
    html += '<div class="cs-noresults" id="csNoResults" hidden>No page matches your search.</div>';
    html += "</nav>";
    html += '<div class="cs-side-foot"><button class="cs-rail-toggle" id="csRailToggle" type="button" aria-label="Collapse or expand the sidebar"></button></div>';
    html += "</aside>";
    html += '<div class="cs-backdrop" id="csBackdrop"></div>';
    html += '<header class="cs-topbar" id="csTopbar"><button class="cs-burger" id="csBurger" type="button" aria-label="Open menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
            '<a class="cs-logo" href="' + sitePrefix + 'index.html">CHEAK<span>STAR</span></a></header>';
    html += '<div class="cs-progress" id="csProgress"></div>';
    html += '<button class="cs-top-btn" id="csTopBtn" type="button" aria-label="Back to top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/></svg></button>';

    var holder = document.createElement("div");
    holder.innerHTML = html;
    var mainEl = document.querySelector("main");
    while (holder.firstChild) {
      var node = holder.firstChild;
      if (node.id === "csTopbar" && mainEl && mainEl.parentNode) {
        // The sticky top bar must sit in flow before the page content.
        mainEl.parentNode.insertBefore(node, mainEl);
      } else if (node.id === "csTopbar") {
        // No <main> on this page: put the bar at the very top of the
        // body. Appending it at the end leaves the sticky bar stuck
        // at the bottom of the document -- mobile audit finding G1
        // (games pages had no top navigation on phones).
        document.body.insertBefore(node, document.body.firstChild);
      } else {
        document.body.appendChild(node);
      }
    }
    document.body.classList.add("cs-shell");

    var mqMobile = window.matchMedia("(max-width: 768px)");
    var side = document.getElementById("csSide");
    var navEl = document.getElementById("csNav");

    // Apply the exclusive open states to the DOM (classes + aria only).
    function applyOpenStates() {
      Array.prototype.forEach.call(side.querySelectorAll(".cs-group"), function (group) {
        var open = !!groupOpen[group.getAttribute("data-group")];
        group.classList.toggle("open", open);
        group.querySelector(".cs-group-head").setAttribute("aria-expanded", open ? "true" : "false");
      });
      Array.prototype.forEach.call(side.querySelectorAll(".cs-subgroup"), function (sub) {
        var open = !!catOpen[sub.getAttribute("data-cat")];
        sub.classList.toggle("open", open);
        sub.querySelector(".cs-subgroup-head").setAttribute("aria-expanded", open ? "true" : "false");
      });
    }
    function setOpenGroup(id) { // id or null: exclusive — at most one group open
      NAV.forEach(function (g) { groupOpen[g.id] = g.id === id; });
      persistGroups();
      applyOpenStates();
    }
    function setOpenCat(id) { // id or null: exclusive — at most one category open
      TOOL_CATS.forEach(function (c) { catOpen[c.id] = c.id === id; });
      persistCats();
      applyOpenStates();
    }

    // Groups: exclusive accordion — opening one closes the others;
    // clicking the open group closes it.
    var groupHeads = side.querySelectorAll(".cs-group-head");
    Array.prototype.forEach.call(groupHeads, function (head) {
      head.addEventListener("click", function () {
        var id = head.parentNode.getAttribute("data-group");
        setOpenGroup(groupOpen[id] ? null : id);
      });
    });
    // Tool categories: same exclusive accordion, one level down. In rail
    // mode the category links are hidden, so a click first expands the
    // sidebar and then opens just that category.
    var subHeads = side.querySelectorAll(".cs-subgroup-head");
    Array.prototype.forEach.call(subHeads, function (head) {
      head.addEventListener("click", function () {
        var id = head.parentNode.getAttribute("data-cat");
        if (document.body.classList.contains("cs-rail") && !mqMobile.matches) {
          document.body.classList.remove("cs-rail");
          lsSet("csRail", "0");
          applyRail();
          setOpenGroup("tools");
          setOpenCat(id);
          return;
        }
        setOpenCat(catOpen[id] ? null : id);
      });
    });
    function applyGroupStates() {
      Array.prototype.forEach.call(side.querySelectorAll(".cs-group"), function (group) {
        group.style.display = "";
        Array.prototype.forEach.call(group.querySelectorAll("a"), function (a) { a.style.display = ""; });
      });
      Array.prototype.forEach.call(side.querySelectorAll(".cs-subgroup"), function (sub) { sub.style.display = ""; });
      applyOpenStates();
      document.getElementById("csNoResults").hidden = true;
    }

    // Filter box: live-filter links, auto-open groups with matches.
    var filterInput = document.getElementById("csFilter");
    filterInput.addEventListener("input", function () {
      var q = filterInput.value.trim().toLowerCase();
      if (!q) { applyGroupStates(); return; }
      var total = 0;
      Array.prototype.forEach.call(side.querySelectorAll(".cs-group"), function (group) {
        var count = 0;
        Array.prototype.forEach.call(group.querySelectorAll(".cs-subgroup"), function (sub) {
          var subCount = 0;
          Array.prototype.forEach.call(sub.querySelectorAll("a"), function (a) {
            var hit = a.getAttribute("data-label").toLowerCase().indexOf(q) >= 0;
            a.style.display = hit ? "" : "none";
            if (hit) subCount++;
          });
          sub.style.display = subCount ? "" : "none";
          if (subCount) { sub.classList.add("open"); var sh = sub.querySelector(".cs-subgroup-head"); if (sh) sh.setAttribute("aria-expanded", "true"); }
          count += subCount;
        });
        Array.prototype.forEach.call(group.querySelectorAll(".cs-group-inner > a"), function (a) {
          var hit = a.getAttribute("data-label").toLowerCase().indexOf(q) >= 0;
          a.style.display = hit ? "" : "none";
          if (hit) count++;
        });
        group.style.display = count ? "" : "none";
        if (count) { group.classList.add("open"); var gh = group.querySelector(".cs-group-head"); if (gh) gh.setAttribute("aria-expanded", "true"); }
        total += count;
      });
      document.getElementById("csNoResults").hidden = total !== 0;
    });

    // Rail (desktop collapse) with persistence + tooltips via title.
    var railBtn = document.getElementById("csRailToggle");
    function applyRail() {
      var rail = document.body.classList.contains("cs-rail");
      railBtn.textContent = rail ? "»" : "« Collapse";
      railBtn.setAttribute("aria-expanded", rail ? "false" : "true");
      Array.prototype.forEach.call(navEl.querySelectorAll("a"), function (a) {
        if (rail && !mqMobile.matches) a.title = a.getAttribute("data-label");
        else a.removeAttribute("title");
      });
      Array.prototype.forEach.call(navEl.querySelectorAll(".cs-subgroup-head"), function (h) {
        if (rail && !mqMobile.matches) h.title = h.getAttribute("data-label");
        else h.removeAttribute("title");
      });
    }
    if (lsGet("csRail") === "1" && !mqMobile.matches) document.body.classList.add("cs-rail");
    applyRail();
    railBtn.addEventListener("click", function () {
      var rail = document.body.classList.toggle("cs-rail");
      lsSet("csRail", rail ? "1" : "0");
      applyRail();
    });

    // Bring the current page's link into view inside the scrolling nav, so
    // the gold highlight is never hidden below the fold or the footer.
    var activeLink = navEl.querySelector("a.active");
    if (activeLink && activeLink.scrollIntoView) {
      setTimeout(function () {
        try { activeLink.scrollIntoView({ block: "center" }); } catch (e) { /* ignore */ }
      }, 60);
    }

    // Drawer (mobile).
    function openDrawer() { document.body.classList.add("cs-drawer"); }
    function closeDrawer() { document.body.classList.remove("cs-drawer"); }
    document.getElementById("csBurger").addEventListener("click", openDrawer);
    document.getElementById("csSideClose").addEventListener("click", closeDrawer);
    document.getElementById("csBackdrop").addEventListener("click", closeDrawer);
    Array.prototype.forEach.call(navEl.querySelectorAll("a"), function (a) {
      a.addEventListener("click", function () { if (mqMobile.matches) closeDrawer(); });
    });
    if (mqMobile.addEventListener) mqMobile.addEventListener("change", function () {
      if (!mqMobile.matches) { closeDrawer(); applyRail(); }
    });

    // Keyboard: Esc closes the drawer; Ctrl/Cmd+B toggles sidebar.
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeDrawer();
      if ((e.ctrlKey || e.metaKey) && !e.altKey && (e.key === "b" || e.key === "B")) {
        var t = e.target;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.tagName === "SELECT")) return;
        e.preventDefault();
        if (mqMobile.matches) document.body.classList.toggle("cs-drawer");
        else railBtn.click();
      }
    });

    // Scroll UI: progress bar, back-to-top, mobile top-bar auto-hide.
    var progress = document.getElementById("csProgress");
    var topBtn = document.getElementById("csTopBtn");
    var topbar = document.getElementById("csTopbar");
    var lastY = window.scrollY || 0, topHidden = false, ticking = false;
    function setTopHidden(v) {
      if (v === topHidden) return;
      topHidden = v;
      topbar.classList.toggle("cs-top-hidden", v);
    }
    function onScrollUI() {
      ticking = false;
      var y = window.scrollY || window.pageYOffset || 0;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (max > 0 ? Math.min(1, y / max) : 0) + ")";
      topBtn.classList.toggle("show", y > 600);
      if (!mqMobile.matches || document.body.classList.contains("cs-drawer")) { setTopHidden(false); lastY = y; return; }
      if (y < 100) setTopHidden(false);
      else if (Math.abs(y - lastY) > 4) setTopHidden(y > lastY);
      lastY = y;
    }
    window.addEventListener("scroll", function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(onScrollUI); }
    }, { passive: true });
    onScrollUI();
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
    });

    // Reveal on scroll (cards, notes, section children) — top-level items only.
    if (!reduced && "IntersectionObserver" in window) {
      var seenEls = [], elSet = [];
      var candidates = document.querySelectorAll(".card, .note, section > .wrap > *");
      Array.prototype.forEach.call(candidates, function (el) { if (elSet.indexOf(el) < 0) elSet.push(el); });
      var tops = elSet.filter(function (el) {
        return !elSet.some(function (other) { return other !== el && other.contains(el); });
      });
      // Elements already inside the first viewport are never put in
      // the hidden state at all (fixed 2026-11-08, same as the main
      // site): headings used to sit near-invisible for seconds on
      // every load because they started at opacity 0 and waited on
      // the observer. Only below-the-fold elements get the hidden
      // start, and any visible pixel now counts as intersecting.
      var vh = window.innerHeight || 800;
      tops.forEach(function (el) {
        var r = el.getBoundingClientRect();
        if (r.top < vh && r.bottom > 0) return; // already visible: leave it readable
        el.classList.add("cs-reveal"); seenEls.push(el);
      });
      document.body.classList.add("cs-anim");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("revealed"); io.unobserve(en.target); }
        });
      }, { threshold: 0, rootMargin: "0px 0px -4% 0px" });
      seenEls.forEach(function (el) { io.observe(el); });
      setTimeout(function () { // failsafe: nothing stays hidden
        seenEls.forEach(function (el) { el.classList.add("revealed"); });
      }, 1600);
    }
  } catch (e) {
    // Shell failed: the page keeps working without the sidebar.
    try {
      document.body.classList.remove("cs-shell");
      document.body.classList.remove("cs-rail");
      document.body.classList.remove("cs-drawer");
      Array.prototype.forEach.call(document.querySelectorAll(".cs-side,.cs-topbar,.cs-backdrop,.cs-progress,.cs-top-btn"), function (n) {
        if (n.parentNode) n.parentNode.removeChild(n);
      });
    } catch (e2) {}
  }
})();

// ==== Cheakstar sidebar account block (same as the main site).
// Failure-isolated: renders instantly in the signed-out state, loads the
// main site's auth.js lazily, then updates when the account state is
// known. If anything fails, the block stays in its signed-out form. ====
(function () {
  "use strict";
  try {
    var side = document.getElementById("csSide");
    var foot = side ? side.querySelector(".cs-side-foot") : null;
    if (!side || !foot) return;

    // Site root prefix, derived from this script's own URL exactly
    // as in the shell above (shell.js lives at the site root).
    var sitePrefix = "";
    try {
      var scriptEl = document.currentScript;
      if (scriptEl && scriptEl.src) {
        var marker = "shell.js";
        var idx = scriptEl.src.indexOf(marker);
        if (idx > -1) { sitePrefix = scriptEl.src.slice(0, idx); }
      }
    } catch (e) { /* keep the empty fallback */ }

    var USER_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg>';
    var GEAR_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3.2"/><path d="M12 2.8v3M12 18.2v3M2.8 12h3M18.2 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M18.8 5.2l-2.1 2.1M7.3 16.7l-2.1 2.1"/></svg>';
    var OUT_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5H5v14h4"/><path d="M14 8l3.5 4L14 16"/><path d="M17 12H9.5"/></svg>';
    function esc(s) {
      return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
        return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
      });
    }

    var block = document.createElement("div");
    block.className = "cs-account";
    block.id = "csAccount";
    block.innerHTML = '<div class="cs-acc-head">Account</div><div class="cs-acc-body" id="csAccBody"></div>';
    side.insertBefore(block, foot);
    var bodyEl = block.querySelector("#csAccBody");

    function render(user) {
      if (!user) {
        bodyEl.innerHTML =
          '<a href="' + sitePrefix + 'login.html">' + USER_ICON + '<span class="cs-label">Login</span></a>' +
          '<a href="' + sitePrefix + 'signup.html">' + USER_ICON + '<span class="cs-label">Sign Up</span></a>';
        return;
      }
      var meta = user.user_metadata || {};
      var name = meta.display_name || user.email || "Account";
      var initial = name.charAt(0).toUpperCase() || "A";
      var avatarHtml = (typeof meta.avatar === "string" && meta.avatar.indexOf("data:image/") === 0)
        ? '<img class="cs-avatar" src="' + esc(meta.avatar) + '" alt="">'
        : '<div class="cs-avatar" aria-hidden="true">' + esc(initial) + "</div>";
      bodyEl.innerHTML =
        '<div class="cs-acc-who">' + avatarHtml +
        '<div class="cs-acc-meta"><span class="cs-acc-name" title="' + esc(name) + '">' + esc(name) + "</span>" +
        '<span class="cs-acc-email" title="' + esc(user.email || "") + '">' + esc(user.email || "") + "</span></div></div>" +
        '<a href="' + sitePrefix + 'account.html">' + USER_ICON + '<span class="cs-label">My Account</span></a>' +
        // Settings is login-only, so its link exists only in this
        // signed-in render (added 2026-11-06, settings/gating build).
        '<a href="' + sitePrefix + 'settings.html">' + GEAR_ICON + '<span class="cs-label">Settings</span></a>' +
        '<button type="button" class="cs-acc-out" id="csAccSignOut">' + OUT_ICON + '<span class="cs-label">Sign Out</span></button>';
      var out = bodyEl.querySelector("#csAccSignOut");
      if (out) out.addEventListener("click", function () {
        if (window.CSAuth) window.CSAuth.signOut().then(function () { window.location.reload(); });
      });
      decorateFrame();
      syncRailFromAccount(user);
    }
    render(null); // instant signed-out state; updated when CSAuth resolves

    // Top-5 winner frame in the sidebar (same as the main site): once
    // the rewards module has loaded (it loads at the end of this file),
    // watch the member's snapshot; a top-5 position swaps the round
    // avatar for the badge frame in that position's colour.
    var lastSnap = null, rewardsHooked = false;
    function decorateFrame() {
      try {
        if (!lastSnap || !lastSnap.signedIn || !lastSnap.position || lastSnap.position > 5) return;
        if (!window.CSRewards || !window.CSRewards.rankFrame) return;
        var who = bodyEl.querySelector(".cs-acc-who");
        if (!who || who.querySelector(".cs-rank-frame")) return;
        var old = who.querySelector(".cs-avatar");
        if (!old) return;
        var initial = (lastSnap.name || "A").charAt(0).toUpperCase() || "A";
        var holder = document.createElement("span");
        holder.innerHTML = window.CSRewards.rankFrame(lastSnap.avatar, initial, lastSnap.position, 40);
        if (holder.firstChild) old.replaceWith(holder.firstChild);
      } catch (e) {}
    }
    // The Settings page's "Sidebar on desktop" choice is saved on the
    // account; apply it here so it follows the member to every browser.
    // (The menu's own button still collapses the sidebar for the
    // moment; this saved default re-applies on the next page, exactly
    // as the Settings page describes.)
    function syncRailFromAccount(user) {
      try {
        var meta = (user && user.user_metadata) || {};
        if (typeof meta.sidebar_default !== "string") return;
        var want = meta.sidebar_default === "collapsed";
        try { window.localStorage.setItem("csRail", want ? "1" : "0"); } catch (e) {}
        if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) return;
        document.body.classList.toggle("cs-rail", want);
        var btn = document.getElementById("csRailToggle");
        if (btn) { btn.textContent = want ? "\u00bb" : "\u00ab Collapse"; btn.setAttribute("aria-expanded", want ? "false" : "true"); }
      } catch (e) {}
    }
    function hookRewards() {
      if (rewardsHooked || !window.CSRewards || !window.CSRewards.onUpdate) return rewardsHooked;
      rewardsHooked = true;
      try {
        window.CSRewards.onUpdate(function (snap) { lastSnap = snap; decorateFrame(); });
      } catch (e) {}
      return true;
    }
    if (!hookRewards()) {
      var rTries = 0;
      var rIv = setInterval(function () { if (hookRewards() || ++rTries > 60) clearInterval(rIv); }, 250);
    }

    var hooked = false;
    function hook() {
      if (hooked || !window.CSAuth) return hooked;
      hooked = true;
      try {
        window.CSAuth.onChange(function (user) { render(user); });
        window.CSAuth.ready.then(function () { render(window.CSAuth.getUser()); });
      } catch (e) {}
      return true;
    }
    if (!hook()) {
      var s = document.createElement("script");
      s.src = sitePrefix + "auth.js";
      s.async = true;
      s.onload = function () { hook(); };
      (document.head || document.documentElement).appendChild(s);
      var tries = 0;
      var iv = setInterval(function () { if (hook() || ++tries > 40) clearInterval(iv); }, 250);
    }
  } catch (e) {}
})();

/* ---------- Footer year (site footer kept by the assembler) ---------- */
document.addEventListener("DOMContentLoaded", function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

// ==== Cheakstar Rewards load (site-wide) (2026-11-07, leaderboard
// upgrade). Rewards (active-time points + the floating points card)
// live at the site root; load it with
// the same dynamic pattern and the same script-URL prefix derivation
// as the auth.js load above. Failure-isolated: if the load fails,
// the tool page works exactly as before. ====
(function () {
  "use strict";
  try {
    if (window.CSRewards) return; // already loaded

    if (window.__csShellAuth) return; // auth pages stay reward-free, as before
    var sitePrefix = "";
    try {
      var scriptEl = document.currentScript;
      if (scriptEl && scriptEl.src) {
        var marker = "shell.js";
        var idx = scriptEl.src.indexOf(marker);
        if (idx > -1) { sitePrefix = scriptEl.src.slice(0, idx); }
      }
    } catch (e) { /* keep the empty fallback */ }

    var s = document.createElement("script");
    s.src = sitePrefix + "rewards.js";
    s.async = true;
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}
})();

// ==== Cheakstar display language (site-wide) (2026-11-08).
// Most pages do not load theme.js, so the saved
// Settings language is applied here with exactly the same rules:
// device copy (localStorage "ck_lang") at once, account copy
// (display_language) adopted at sign-in through one guarded reload,
// translation by Google Translate's page widget via its "googtrans"
// cookie, English = the site's own text (cookie cleared, nothing
// loaded). Failure-isolated: if the widget cannot be reached, the
// page simply stays in English. ====
(function () {
  "use strict";
  try {
    // Shared boot guard: this same runtime also ships in theme.js
    // and script.js. The first copy to run claims the slot; the
    // others step aside, so the translate element is never
    // injected twice on a page that loads two of the files.
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
  } catch (e) {}
})();

/* ==== Cheakstar Guide Bot loader (2026-11-08, master list item 17).
   The guide itself lives in guide.js at the site root; the
   standalone auth pages include it directly (its own boot guard
   makes this loader step aside there). This loader derives the
   site root from this script's own URL, exactly like the shell
   above. guide.js carries
   its own boot guard, so it can never start twice. ==== */
(function () {
  "use strict";
  try {
    if (window.__csGuideBoot) return;
    var prefix = "";
    try {
      var el = document.currentScript;
      if (el && el.src) {
        var marker = "shell.js";
        var idx = el.src.indexOf(marker);
        if (idx > -1) prefix = el.src.slice(0, idx);
      }
    } catch (e) { /* keep fallback */ }
    var s = document.createElement("script");
    s.src = prefix + "guide.js";
    s.async = true;
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}
})();

/* ---------------- tools hub category shortcuts ---------------------------
   Mobile audit finding G5: the tools hub is one very long column
   (110 tools) with no way to jump between categories. On the hub
   only (detected by its search box and category blocks), build a
   sticky shortcut bar from the hub's own category headings. Purely
   additive: no hub markup or tools.js logic is touched, and the
   bar's styles live in the unified base stylesheet (.cs-catbar). */
(function () {
  "use strict";
  if (window.__csCatBar) return;
  window.__csCatBar = true;
  function build() {
    try {
      var search = document.getElementById("tool-search");
      var blocks = document.querySelectorAll(".cat-block");
      if (!search || !blocks.length || document.querySelector(".cs-catbar")) return;
      var bar = document.createElement("nav");
      bar.className = "cs-catbar";
      bar.setAttribute("aria-label", "Tool categories");
      Array.prototype.forEach.call(blocks, function (block, i) {
        var title = block.querySelector(".cat-title");
        if (!title) return;
        if (!block.id) block.id = "cs-cat-" + (i + 1);
        var a = document.createElement("a");
        a.href = "#" + block.id;
        a.textContent = title.textContent.trim();
        bar.appendChild(a);
      });
      if (!bar.children.length) return;
      var anchor = search.parentNode;
      if (anchor && anchor.parentNode) anchor.parentNode.insertBefore(bar, anchor.nextSibling);
    } catch (e) { /* shortcuts are an enhancement; never break the hub */ }
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();

/* ---------------- site footer (built here, once) -------------------------
   Since the 2026-11-14 unification the footer is built by this file
   on every page, in the site's own footer markup
   (footer.site > .wrap.foot), with the legal line the November 2026
   audit required (GSTIN + Privacy Policy / Terms / Refund Policy).
   Pages no longer carry a static copy of the footer. A page that
   already has a footer -- the auth pages' reduced footer.auth-foot --
   is left untouched; the public-controls block below appends its
   language row into it. Guarded so a double load can never build
   two footers. */
(function () {
  "use strict";
  if (window.__csShellFoot) return;
  window.__csShellFoot = true;
  function build() {
    if (document.querySelector("footer")) return;
    if (!document.body) return;
    var prefix = "";
    try {
      var el = document.currentScript;
      if (el && el.src) {
        var idx = el.src.indexOf("shell.js");
        if (idx > -1) prefix = el.src.slice(0, idx);
      }
    } catch (e) { /* keep the empty fallback */ }
    var f = document.createElement("footer");
    f.className = "site";
    f.innerHTML =
      '<div class="wrap foot">' +
      '<div>\u00a9 <span id="year">' + new Date().getFullYear() + '</span> Cheakstar Private Limited \u00b7 Jaipur, India</div>' +
      '<div>GSTIN 08AALCC3997L1ZU \u00b7 <a href="' + prefix + 'privacy-policy.html">Privacy Policy</a> \u00b7 <a href="' + prefix + 'terms.html">Terms</a> \u00b7 <a href="' + prefix + 'refund-policy.html">Refund Policy</a></div>' +
      '<div><a href="https://payhip.com/securethefuture" target="_blank" rel="noopener">Our Store</a> \u00b7 <a href="https://www.linkedin.com/in/rohitkrchandoliya" target="_blank" rel="noopener">Founder on LinkedIn</a> \u00b7 <a href="https://www.linkedin.com/company/cheakstar" target="_blank" rel="noopener">Follow Cheakstar on LinkedIn</a> \u00b7 <a href="' + prefix + 'contact.html">Contact</a></div>' +
      "</div>";
    document.body.appendChild(f);
  }
  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();

/* ---------------- public theme + language controls (2026-11-14) ----------
   Owner's order: theme switching and language choice are PUBLIC — no
   sign-in needed. This block lives ONCE, here in shell.js (before the unification
   it was appended, identical, to script.js, tools.js, theme.js and
   games-nav.js). theme.js still carries its staged copy; the boot
   guard (window.__csPubControls) makes whichever copy runs second
   step aside, so a page loading both files still gets exactly one
   set of controls (the same boot-guard pattern the language
   runtime above already uses).

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
    return !!document.querySelector('script[src*="shell.js"],script[src*="script.js"],script[src*="tools.js"],script[src*="games-nav.js"]');
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
      if (!document.getElementById("csPubThemeBtn") && (!shellScriptPresent() || window.__csShellAuth)) {
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


/* ---------------- Ctrl/Cmd+K: jump to sidebar search (2026-11-14) --------
   The November 2026 audit found Ctrl+K did nothing. This focuses
   the shell's existing "Search pages" box (#csFilter), opening
   the mobile drawer or expanding the collapsed rail first so the
   box is actually visible. Esc while the box is focused returns
   focus to the page. (Ctrl/Cmd+B already toggles the sidebar;
   Esc already closes the drawer — both live in the shell above
   and are not duplicated here.) */
(function () {
  "use strict";
  if (window.__csCtrlK) return;
  window.__csCtrlK = true;
  document.addEventListener("keydown", function (e) {
    var key = (e.key || "").toLowerCase();
    if ((e.ctrlKey || e.metaKey) && !e.altKey && key === "k") {
      if (document.getElementById("tool-search")) return; // the tools hub polish (slim tools.js) owns Ctrl+K there
      var input = document.getElementById("csFilter");
      if (!input) return;
      e.preventDefault();
      try {
        if (window.matchMedia && window.matchMedia("(max-width: 768px)").matches) {
          document.body.classList.add("cs-drawer");
        } else if (document.body.classList.contains("cs-rail")) {
          var railBtn = document.getElementById("csRailToggle");
          if (railBtn) railBtn.click();
        }
      } catch (err) {}
      input.focus();
      try { input.select(); } catch (err2) {}
    } else if (e.key === "Escape" && document.activeElement && document.activeElement.id === "csFilter") {
      document.activeElement.blur();
    }
  });
})();
