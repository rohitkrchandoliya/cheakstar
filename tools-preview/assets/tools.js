/* Cheakstar Tools — unified shell. This is the SAME sidebar as the main
   website (script.js): same groups, same nested tool categories, same
   account block, same preloader, and the same localStorage keys
   (csGroups / csToolCats / csRail / csPreSeen), so the sidebar looks and
   behaves identically on main pages and tool pages, and its state
   carries across both. Vanilla JS, no dependencies. Every block is
   failure-isolated: if anything throws, the page keeps working. */
(function () {
  "use strict";
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function ssGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }
  var reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------------- Appearance (saved theme choices) ----------------
     The visitor's theme mode, motion and text-size choices live in
     localStorage (set on the Settings page of the main site; the full
     runtime is theme.js there). Apply the same choices here so tool
     pages honour them exactly like the rest of the website — the
     stylesheet switches on the data-theme attribute. The device copy
     survives refresh and sign-out; nothing here clears it. */
  (function applyAppearance() {
    try {
      var mqLight = window.matchMedia ? window.matchMedia("(prefers-color-scheme: light)") : null;
      var mode = lsGet("ck_theme_mode") || "system";
      var dark = mode === "dark" || (mode !== "light" && !(mqLight && mqLight.matches));
      var rootEl = document.documentElement;
      rootEl.setAttribute("data-theme", dark ? "dark" : "light");
      rootEl.setAttribute("data-motion", lsGet("ck_reduce_motion") === "1" ? "reduced" : "full");
      rootEl.setAttribute("data-textsize", lsGet("ck_text_size") === "large" ? "large" : "comfortable");
      if (mqLight && mqLight.addEventListener) {
        mqLight.addEventListener("change", function () {
          if ((lsGet("ck_theme_mode") || "system") === "system") applyAppearance();
        });
      }
    } catch (e) { /* appearance is cosmetic; never break the page */ }
  })();

  // Root prefix of the tools package, from this script's own URL
  // ("<tools-root>assets/tools.js"), so links work at any mount path.
  // The main website root is one level above the tools root.
  var rootPrefix = "../";
  try {
    var scriptEl = document.currentScript;
    if (scriptEl && scriptEl.src) {
      var marker = "assets/tools.js";
      var idx = scriptEl.src.indexOf(marker);
      if (idx > -1) { rootPrefix = scriptEl.src.slice(0, idx); }
    }
  } catch (e) { /* keep fallback */ }
  var sitePrefix = rootPrefix + "../";

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
      archive: '<rect x="3" y="4" width="18" height="5" rx="1"/><path d="M5 9v11h14V9"/><path d="M10 13h4"/>',
      calc: '<rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M8.5 6.5h7"/><path d="M8.5 11h.01M12 11h.01M15.5 11h.01M8.5 14.5h.01M12 14.5h.01M15.5 14.5h.01M8.5 18h.01M12 18h.01M15.5 18h.01"/>',
      trophy: '<path d="M7.5 4h9v4.2a4.5 4.5 0 0 1-9 0z"/><path d="M7.5 5.8H4.8a2.7 2.7 0 0 0 2.9 3.4M16.5 5.8h2.7a2.7 2.7 0 0 1-2.9 3.4"/><path d="M12 12.7v3.3"/><path d="M8.8 20h6.4"/><path d="M10.2 16h3.6l.7 4H9.5z"/>'
    };
    function icon(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.grid) + "</svg>"; }
    var CHEV = '<svg class="cs-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 9.5 12 15.5 18 9.5"/></svg>';

    function siteLink(file, label, ic) { return [sitePrefix + file, label, ic]; }
    function toolLink(slug, label) { return [rootPrefix + slug + "/", label]; }
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
        [rootPrefix + "index.html", "All Tools", "grid"]
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
          toolLink("favicon-generator", "Favicon Generator")
        ]},
        { id: "pdf", name: "PDF Tools", icon: "doc", links: [
          toolLink("pdf-merge", "PDF Merge"),
          toolLink("pdf-split", "PDF Split"),
          toolLink("images-to-pdf", "Images to PDF"),
          toolLink("pdf-to-images", "PDF to Images"),
          toolLink("pdf-compressor", "PDF Compressor"),
          toolLink("rotate-pdf", "Rotate PDF"),
          toolLink("pdf-to-text", "PDF to Text"),
          toolLink("text-to-pdf", "Text to PDF")
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
          toolLink("screen-recorder", "Screen Recorder")
        ]},
        { id: "text", name: "Text Tools", icon: "pen", links: [
          toolLink("word-counter", "Word & Character Counter"),
          toolLink("case-converter", "Case Converter & Line Tools"),
          toolLink("csv-json-converter", "CSV / JSON Converter"),
          toolLink("base64-encoder-decoder", "Base64 Encoder & Decoder"),
          toolLink("json-formatter", "JSON Formatter & Validator"),
          toolLink("text-diff-checker", "Text Diff Checker"),
          toolLink("url-encoder-decoder", "URL Encoder & Decoder")
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
          toolLink("password-breach-check", "Leaked Password Check")
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
          toolLink("unit-converter", "Unit Converter")
        ]}
      ]}
    ];
    var TOOL_CATS = NAV[2].cats;

    // Which link is the current page? Tool pages always live in the Tools
    // group; the current tool (if any) also marks its category.
    var currentHref = rootPrefix + "index.html", currentCat = null;
    (function detectCurrent() {
      var parts = window.location.pathname.split("/").filter(function (s) { return s.length > 0; });
      var last = parts[parts.length - 1] || "";
      var parent = parts[parts.length - 2] || "";
      var candidate = (last === "index.html") ? parent : last;
      for (var c = 0; c < TOOL_CATS.length; c++) {
        for (var i = 0; i < TOOL_CATS[c].links.length; i++) {
          if (TOOL_CATS[c].links[i][0] === rootPrefix + candidate + "/") {
            currentHref = TOOL_CATS[c].links[i][0];
            currentCat = TOOL_CATS[c].id;
            return;
          }
        }
      }
    })();

    // Accordion state — EXCLUSIVE, same rules and same storage keys as the
    // main site: at most one group and at most one category open at a time.
    // Tool pages force the Tools group open; a tool page also forces its
    // own category open. Otherwise the single stored open section wins.
    var storedGroups = {}, storedCats = {};
    try { storedGroups = JSON.parse(lsGet("csGroups") || "{}") || {}; } catch (e) { storedGroups = {}; }
    try { storedCats = JSON.parse(lsGet("csToolCats") || "{}") || {}; } catch (e) { storedCats = {}; }
    var groupOpen = {}, catOpen = {};
    (function resolveOpen() {
      var og = "tools", oc = currentCat, g, c;
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

    // Site root prefix, derived from this script's own URL exactly as in
    // the shell above: auth.js and the account pages live at the site
    // root, one level above the tools root.
    var rootPrefix = "../";
    try {
      var scriptEl = document.currentScript;
      if (scriptEl && scriptEl.src) {
        var marker = "assets/tools.js";
        var idx = scriptEl.src.indexOf(marker);
        if (idx > -1) { rootPrefix = scriptEl.src.slice(0, idx); }
      }
    } catch (e) { /* keep fallback */ }
    var sitePrefix = rootPrefix + "../";

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

// ==== Cheakstar Rewards load for tool pages (2026-11-07, leaderboard
// upgrade). Rewards (active-time points + the floating points card)
// live at the site root, one level above the tools root; load it with
// the same dynamic pattern and the same script-URL prefix derivation
// as the auth.js load above. Failure-isolated: if the load fails,
// the tool page works exactly as before. ====
(function () {
  "use strict";
  try {
    if (window.CSRewards) return; // already loaded

    var rootPrefix = "../";
    try {
      var scriptEl = document.currentScript;
      if (scriptEl && scriptEl.src) {
        var marker = "assets/tools.js";
        var idx = scriptEl.src.indexOf(marker);
        if (idx > -1) { rootPrefix = scriptEl.src.slice(0, idx); }
      }
    } catch (e) { /* keep fallback */ }

    var s = document.createElement("script");
    s.src = rootPrefix + "../rewards.js";
    s.async = true;
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}
})();

// ==== Cheakstar display language for tool pages (2026-11-08).
// Tool pages do not load the main site's theme.js, so the saved
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

// ==== Cheakstar favourites + recent tools (2026-11-08).
// The account module (auth.js) has always kept the favourites and
// recent-tools lists — localStorage "csFavs" / "csRecent", mirrored
// to the account when signed in — but no page ever called it, so
// the My Account lists could never fill. This block is the missing
// caller: opening a tool page records the tool under Recent Tools,
// and a star button on every tool page and every tools-hub card
// toggles the tool in Favourites. Failure-isolated: until the
// lazily loaded account module arrives (or if it cannot load), the
// same localStorage store is used directly, so the star and the
// recent list work for guests and signed-in members alike. ====
(function () {
  "use strict";
  try {
    function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
    function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
    var FAV_KEY = "csFavs", RECENT_KEY = "csRecent", RECENT_MAX = 8;

    // The current tool, resolved against the sidebar the shell built
    // above: its links carry every tool's slug (in the href) and
    // display title (in data-label). The hub itself matches nothing.
    function currentTool() {
      var parts = window.location.pathname.split("/").filter(function (s) { return s.length > 0; });
      var last = parts[parts.length - 1] || "";
      var parent = parts[parts.length - 2] || "";
      var candidate = (last === "index.html") ? parent : last;
      if (!candidate) return null;
      var links = document.querySelectorAll("#csNav a[href]");
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute("href") || "";
        if (href.slice(-(candidate.length + 1)) === candidate + "/") {
          return { slug: candidate, title: links[i].getAttribute("data-label") || candidate };
        }
      }
      return null;
    }

    function readFavs() {
      try {
        var v = JSON.parse(lsGet(FAV_KEY) || "[]");
        return Array.isArray(v) ? v.filter(function (s) { return typeof s === "string" && s; }) : [];
      } catch (e) { return []; }
    }
    function isFav(slug) {
      if (window.CSAuth && window.CSAuth.isFavorite) return window.CSAuth.isFavorite(slug);
      return readFavs().indexOf(slug) >= 0;
    }
    function toggleFav(slug) {
      if (window.CSAuth && window.CSAuth.toggleFavorite) return window.CSAuth.toggleFavorite(slug);
      var favs = readFavs();
      var i = favs.indexOf(slug);
      if (i >= 0) { favs.splice(i, 1); lsSet(FAV_KEY, JSON.stringify(favs)); return false; }
      favs.push(slug); lsSet(FAV_KEY, JSON.stringify(favs)); return true;
    }
    function pushRecentNow(slug, title) {
      if (window.CSAuth && window.CSAuth.pushRecent) { window.CSAuth.pushRecent(slug, title); return; }
      var items = [];
      try {
        var v = JSON.parse(lsGet(RECENT_KEY) || "[]");
        if (Array.isArray(v)) items = v.filter(function (it) { return it && it.slug && it.slug !== slug; });
      } catch (e) {}
      items.unshift({ slug: slug, title: title || slug });
      lsSet(RECENT_KEY, JSON.stringify(items.slice(0, RECENT_MAX)));
    }
    // Record exactly once: through the account module when it is
    // there (so a signed-in member's copy is mirrored), waiting
    // briefly for its lazy load before falling back to the store.
    var recentDone = false;
    function recordRecent(tool) {
      if (window.CSAuth && window.CSAuth.pushRecent) { recentDone = true; pushRecentNow(tool.slug, tool.title); return; }
      var tries = 0;
      var iv = setInterval(function () {
        if (recentDone) { clearInterval(iv); return; }
        if ((window.CSAuth && window.CSAuth.pushRecent) || ++tries > 32) {
          recentDone = true;
          pushRecentNow(tool.slug, tool.title);
          clearInterval(iv);
        }
      }, 250);
    }

    var STAR = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3.6l2.55 5.2 5.75.8-4.15 4.05 1 5.7L12 16.7l-5.15 2.65 1-5.7L3.7 9.6l5.75-.8z"/></svg>';
    var starBtns = [];
    function paintStar(btn) {
      var on = isFav(btn._csFavSlug);
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.classList.toggle("on", on);
      btn.title = on ? "Remove from favourites" : "Save to favourites";
      var lab = btn.querySelector(".cs-fav-label");
      if (lab) lab.textContent = on ? "Saved to favourites" : "Save to favourites";
    }
    function makeStar(slug, withLabel) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "cs-fav-btn" + (withLabel ? "" : " cs-fav-btn-icon");
      b.setAttribute("aria-label", "Save this tool to your favourites");
      b.innerHTML = STAR + (withLabel ? '<span class="cs-fav-label">Save to favourites</span>' : "");
      b._csFavSlug = slug;
      b.addEventListener("click", function (ev) {
        ev.preventDefault();
        ev.stopPropagation();
        toggleFav(slug);
        starBtns.forEach(function (x) { if (x._csFavSlug === slug) paintStar(x); });
      });
      paintStar(b);
      starBtns.push(b);
      return b;
    }
    // If signing in merges a different favourites list from the
    // account, repaint every star from the merged state.
    function hookAuthPaint() {
      if (!window.CSAuth || !window.CSAuth.onChange) return false;
      window.CSAuth.onChange(function () {
        starBtns.forEach(function (b) { paintStar(b); });
      });
      return true;
    }
    if (!hookAuthPaint()) {
      var pTries = 0;
      var pIv = setInterval(function () { if (hookAuthPaint() || ++pTries > 40) clearInterval(pIv); }, 250);
    }

    // Tool page: record the visit and put the star under the title.
    var tool = currentTool();
    if (tool) {
      recordRecent(tool);
      var h1 = document.querySelector("h1.tool-title");
      if (h1 && h1.parentNode) {
        var row = document.createElement("div");
        row.className = "cs-fav-row";
        row.appendChild(makeStar(tool.slug, true));
        h1.parentNode.insertBefore(row, h1.nextSibling);
      }
    }

    // Tools hub: a star on every tool card (the card's "Open tool"
    // link carries the slug).
    Array.prototype.forEach.call(document.querySelectorAll(".tool-card-item"), function (card) {
      var go = card.querySelector("a.go");
      if (!go) return;
      var slug = (go.getAttribute("href") || "").replace(/\/$/, "");
      if (!slug || slug.indexOf("/") >= 0) return;
      card.appendChild(makeStar(slug, false));
    });
  } catch (e) {}
})();
