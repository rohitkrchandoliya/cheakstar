/* Cheakstar Tools — shared shell: preloader, sidebar navigation, mobile
   drawer, scroll progress, back-to-top and reveal animations.
   Vanilla JS, no dependencies. Every block is isolated so one failure can
   never break the page or trap the preloader. */
(function () {
  "use strict";

  var GROUPS = [
    ["QR & Video Links", [
      ["qr-code-generator", "QR Code Generator"],
      ["qr-code-scanner", "QR Code Scanner"],
      ["youtube-thumbnail-downloader", "YouTube Thumbnail Downloader"],
      ["video-link-info", "Video Link Info"]
    ]],
    ["Image Tools", [
      ["image-information", "Image Information"],
      ["image-compressor", "Image Compressor"],
      ["image-converter", "Image Converter"],
      ["image-resizer-cropper", "Image Resizer & Cropper"],
      ["passport-photo-maker", "Passport Photo Maker"],
      ["resize-image-to-kb", "Resize Image to KB"],
      ["color-picker-from-image", "Color Picker from Image"],
      ["favicon-generator", "Favicon Generator"]
    ]],
    ["PDF Tools", [
      ["pdf-merge", "PDF Merge"],
      ["pdf-split", "PDF Split"],
      ["images-to-pdf", "Images to PDF"],
      ["pdf-to-images", "PDF to Images"],
      ["pdf-compressor", "PDF Compressor"],
      ["rotate-pdf", "Rotate PDF"],
      ["pdf-to-text", "PDF to Text"],
      ["text-to-pdf", "Text to PDF"]
    ]],
    ["Audio & Video Tools", [
      ["media-info", "Media Info"],
      ["audio-converter", "Audio Converter"],
      ["extract-audio", "Extract Audio from Video"],
      ["video-trimmer", "Video Trimmer"],
      ["gif-maker", "GIF Maker"],
      ["video-converter", "Video Converter"],
      ["video-compressor", "Video Compressor"],
      ["video-speed-changer", "Video Speed Changer"],
      ["audio-merger", "Audio Merger"],
      ["video-merger", "Video Merger"],
      ["voice-recorder", "Voice Recorder"],
      ["screen-recorder", "Screen Recorder"]
    ]],
    ["Text Tools", [
      ["word-counter", "Word & Character Counter"],
      ["case-converter", "Case Converter & Line Tools"],
      ["csv-json-converter", "CSV / JSON Converter"],
      ["base64-encoder-decoder", "Base64 Encoder & Decoder"],
      ["json-formatter", "JSON Formatter & Validator"],
      ["text-diff-checker", "Text Diff Checker"],
      ["url-encoder-decoder", "URL Encoder & Decoder"]
    ]],
    ["Security & OSINT", [
      ["dns-lookup", "DNS Lookup"],
      ["rdap-whois-lookup", "Domain Info (WHOIS / RDAP)"],
      ["ip-lookup", "IP Address Lookup"],
      ["whats-my-ip", "What's My IP"],
      ["subdomain-finder", "Subdomain Finder"],
      ["photo-privacy-checker", "Photo Privacy Checker (EXIF)"],
      ["phone-number-checker", "Phone Number Checker"],
      ["security-headers-check", "Security Headers Check"],
      ["email-breach-check", "Email Breach Check"],
      ["password-breach-check", "Leaked Password Check"]
    ]],
    ["Daily File Tools", [
      ["zip-extractor", "ZIP Extractor"],
      ["file-hash-checker", "File Hash Checker"]
    ]],
    ["Calculators", [
      ["age-calculator", "Age Calculator"],
      ["emi-calculator", "EMI Calculator"],
      ["sip-calculator", "SIP Calculator"],
      ["gst-calculator", "GST Calculator"],
      ["date-difference-calculator", "Date Difference Calculator"],
      ["percentage-calculator", "Percentage Calculator"],
      ["unit-converter", "Unit Converter"]
    ]]
  ];

  function store(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storeSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* private mode */ }
  }
  function sessionGet(key) {
    try { return window.sessionStorage.getItem(key); } catch (e) { return null; }
  }
  function sessionSet(key, value) {
    try { window.sessionStorage.setItem(key, value); } catch (e) { /* ignore */ }
  }

  // Root prefix of the tools package, from this script's own URL
  // ("<root>assets/tools.js"), so links work at any mount path.
  var rootPrefix = "../";
  try {
    var scriptEl = document.currentScript;
    if (scriptEl && scriptEl.src) {
      var marker = "assets/tools.js";
      var idx = scriptEl.src.indexOf(marker);
      if (idx > -1) { rootPrefix = scriptEl.src.slice(0, idx); }
    }
  } catch (e) { /* keep fallback */ }

  // Current tool slug from the URL ("" on the index page).
  var currentSlug = "";
  try {
    var parts = window.location.pathname.split("/").filter(function (s) { return s.length > 0; });
    var last = parts[parts.length - 1] || "";
    var parent = parts[parts.length - 2] || "";
    var candidate = (last === "index.html") ? parent : last;
    GROUPS.forEach(function (g) {
      g[1].forEach(function (t) { if (t[0] === candidate) { currentSlug = candidate; } });
    });
  } catch (e) { /* ignore */ }

  var reducedMotion = false;
  try {
    reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  } catch (e) { /* ignore */ }

  /* ---------- Preloader ---------- */
  var preHidden = false;
  function hidePreloader() {
    if (preHidden) { return; }
    preHidden = true;
    var pre = document.getElementById("ck-preloader");
    if (pre) {
      pre.classList.add("ck-done");
      setTimeout(function () { if (pre.parentNode) { pre.parentNode.removeChild(pre); } }, 700);
    }
    sessionSet("ck_pre_seen", "1");
  }
  try {
    var pre2 = document.createElement("div");
    pre2.id = "ck-preloader";
    pre2.setAttribute("aria-hidden", "true");
    pre2.innerHTML =
      '<div class="ck-pre-inner">' +
      '<svg class="ck-pre-shield" viewBox="0 0 64 64" fill="none" aria-hidden="true">' +
      '<path d="M32 4 L54 12 V30 C54 45 45 55 32 60 C19 55 10 45 10 30 V12 Z" stroke="#d4af37" stroke-width="3" fill="rgba(212,175,55,.08)"/>' +
      '<path d="M21 32 H28 L31 24 L35 40 L38 32 H43" stroke="#d4af37" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>' +
      "</svg>" +
      '<div class="ck-pre-brand">CHEAK<span>STAR</span></div>' +
      '<div class="ck-pre-scan"><i></i></div>' +
      '<div class="ck-pre-text">scanning environment - loading secure tools</div>' +
      "</div>";
    document.body.insertBefore(pre2, document.body.firstChild);
    var repeatVisit = sessionGet("ck_pre_seen") === "1";
    if (reducedMotion) {
      hidePreloader();
    } else if (repeatVisit) {
      // Shortened on repeat in-session visits.
      setTimeout(hidePreloader, 250);
      window.addEventListener("load", hidePreloader);
    } else {
      window.addEventListener("load", function () { setTimeout(hidePreloader, 150); });
    }
    // Hard failsafe: the preloader can never trap the page.
    setTimeout(hidePreloader, 1800);
    window.addEventListener("error", function () { setTimeout(hidePreloader, 400); });
  } catch (e) {
    setTimeout(hidePreloader, 300);
  }

  /* ---------- Sidebar + mobile top bar ---------- */
  try {
    if (store("ck_side_collapsed") === "1") {
      document.body.classList.add("ck-collapsed");
    }

    var backdrop = document.createElement("div");
    backdrop.className = "ck-backdrop";
    document.body.appendChild(backdrop);

    var topbar = document.createElement("div");
    topbar.className = "ck-topbar";
    var burger = document.createElement("button");
    burger.className = "ck-burger";
    burger.type = "button";
    burger.setAttribute("aria-label", "Open the tools menu");
    burger.innerHTML = "<span></span><span></span><span></span>";
    var topLogo = document.createElement("a");
    topLogo.className = "ck-topbar-logo";
    topLogo.href = rootPrefix + "index.html";
    topLogo.innerHTML = "CHEAK<span>STAR</span>";
    topbar.appendChild(burger);
    topbar.appendChild(topLogo);
    document.body.appendChild(topbar);

    var sidebar = document.createElement("aside");
    sidebar.className = "ck-sidebar";
    sidebar.id = "ck-sidebar";
    sidebar.setAttribute("aria-label", "Tools navigation");

    var head = document.createElement("div");
    head.className = "ck-side-head";
    var logo = document.createElement("a");
    logo.className = "ck-logo";
    logo.href = rootPrefix + "index.html";
    logo.innerHTML = "CHEAK<span>STAR</span>";
    var collapseBtn = document.createElement("button");
    collapseBtn.className = "ck-collapse";
    collapseBtn.type = "button";
    collapseBtn.setAttribute("aria-label", "Collapse or expand the sidebar");
    collapseBtn.textContent = "«";
    var closeBtn = document.createElement("button");
    closeBtn.className = "ck-close";
    closeBtn.type = "button";
    closeBtn.setAttribute("aria-label", "Close the tools menu");
    closeBtn.textContent = "✕";
    head.appendChild(logo);
    head.appendChild(collapseBtn);
    head.appendChild(closeBtn);
    sidebar.appendChild(head);

    var nav = document.createElement("nav");
    nav.className = "ck-nav";

    var allLink = document.createElement("a");
    allLink.className = "ck-all-link" + (currentSlug === "" ? " active" : "");
    allLink.href = rootPrefix + "index.html";
    var allInitial = document.createElement("span");
    allInitial.className = "ck-ginitial";
    allInitial.textContent = "A";
    var allLabel = document.createElement("span");
    allLabel.className = "ck-all-label";
    allLabel.textContent = "All Tools";
    allLink.appendChild(allInitial);
    allLink.appendChild(allLabel);
    allLink.title = "All Tools";
    nav.appendChild(allLink);

    var openGroups = [];
    try { openGroups = JSON.parse(store("ck_side_groups") || "[]"); } catch (e) { openGroups = []; }

    GROUPS.forEach(function (group, gi) {
      var gName = group[0];
      var tools = group[1];
      var hasCurrent = tools.some(function (t) { return t[0] === currentSlug; });
      var g = document.createElement("div");
      g.className = "ck-group" + ((hasCurrent || openGroups.indexOf(gName) !== -1) ? " open" : "");
      var gHead = document.createElement("button");
      gHead.className = "ck-group-head";
      gHead.type = "button";
      gHead.setAttribute("aria-expanded", g.classList.contains("open") ? "true" : "false");
      var initial = document.createElement("span");
      initial.className = "ck-ginitial";
      initial.textContent = gName.charAt(0);
      var name = document.createElement("span");
      name.className = "ck-gname";
      name.textContent = gName;
      var chev = document.createElement("span");
      chev.className = "ck-chev";
      chev.textContent = "▾";
      gHead.appendChild(initial);
      gHead.appendChild(name);
      gHead.appendChild(chev);
      gHead.title = gName;
      var gBody = document.createElement("div");
      gBody.className = "ck-group-body";
      var gInner = document.createElement("div");
      gInner.className = "ck-group-inner";
      tools.forEach(function (t) {
        var a = document.createElement("a");
        a.className = "ck-link" + (t[0] === currentSlug ? " active" : "");
        a.href = rootPrefix + t[0] + "/";
        a.textContent = t[1];
        a.title = t[1];
        if (t[0] === currentSlug) { a.setAttribute("aria-current", "page"); }
        gInner.appendChild(a);
      });
      gBody.appendChild(gInner);
      gHead.addEventListener("click", function () {
        if (document.body.classList.contains("ck-collapsed") && window.innerWidth > 860) {
          // In rail mode a group click first expands the sidebar.
          document.body.classList.remove("ck-collapsed");
          storeSet("ck_side_collapsed", "0");
          g.classList.add("open");
          gHead.setAttribute("aria-expanded", "true");
          return;
        }
        g.classList.toggle("open");
        gHead.setAttribute("aria-expanded", g.classList.contains("open") ? "true" : "false");
        var names = [];
        nav.querySelectorAll(".ck-group.open .ck-gname").forEach(function (el) { names.push(el.textContent); });
        storeSet("ck_side_groups", JSON.stringify(names));
      });
      g.appendChild(gHead);
      g.appendChild(gBody);
      nav.appendChild(g);
    });
    sidebar.appendChild(nav);

    var foot = document.createElement("div");
    foot.className = "ck-side-foot";
    var sitePrefix = rootPrefix + "../";
    [["Home", "index.html"], ["Blog", "blog.html"], ["About", "about.html"], ["Contact", "contact.html"]].forEach(function (l) {
      var a = document.createElement("a");
      a.href = sitePrefix + l[1];
      a.textContent = l[0];
      foot.appendChild(a);
    });
    var copy = document.createElement("span");
    copy.className = "ck-copy";
    copy.textContent = "© " + new Date().getFullYear() + " Cheakstar";
    foot.appendChild(copy);
    sidebar.appendChild(foot);
    document.body.appendChild(sidebar);

    collapseBtn.addEventListener("click", function () {
      var collapsed = document.body.classList.toggle("ck-collapsed");
      storeSet("ck_side_collapsed", collapsed ? "1" : "0");
    });

    function openDrawer() { document.body.classList.add("ck-drawer-open"); }
    function closeDrawer() { document.body.classList.remove("ck-drawer-open"); }
    burger.addEventListener("click", openDrawer);
    closeBtn.addEventListener("click", closeDrawer);
    backdrop.addEventListener("click", closeDrawer);
    sidebar.addEventListener("click", function (event) {
      if (event.target.closest("a")) { closeDrawer(); }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") { closeDrawer(); }
    });

    // Mobile top bar: hide on scroll down, show on scroll up.
    var lastY = window.scrollY || 0;
    var ticking = false;
    window.addEventListener("scroll", function () {
      if (ticking) { return; }
      ticking = true;
      window.requestAnimationFrame(function () {
        ticking = false;
        var y = window.scrollY || 0;
        if (window.innerWidth <= 860 && !document.body.classList.contains("ck-drawer-open")) {
          if (y > 90 && y > lastY + 4) { topbar.classList.add("ck-hidden"); }
          else if (y < lastY - 4 || y <= 90) { topbar.classList.remove("ck-hidden"); }
        } else {
          topbar.classList.remove("ck-hidden");
        }
        lastY = y;
      });
    }, { passive: true });
  } catch (e) { /* sidebar is an enhancement; the page still works */ }

  /* ---------- Scroll progress + back-to-top ---------- */
  try {
    var progress = document.createElement("div");
    progress.id = "ck-progress";
    document.body.appendChild(progress);
    var topBtn = document.createElement("button");
    topBtn.id = "ck-top";
    topBtn.type = "button";
    topBtn.setAttribute("aria-label", "Back to top");
    topBtn.textContent = "↑";
    document.body.appendChild(topBtn);
    topBtn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
    });
    var ticking2 = false;
    window.addEventListener("scroll", function () {
      if (ticking2) { return; }
      ticking2 = true;
      window.requestAnimationFrame(function () {
        ticking2 = false;
        var doc = document.documentElement;
        var max = doc.scrollHeight - window.innerHeight;
        var y = window.scrollY || 0;
        progress.style.width = (max > 0 ? Math.round((y / max) * 100) : 0) + "%";
        topBtn.classList.toggle("ck-show", y > 600);
      });
    }, { passive: true });
  } catch (e) { /* ignore */ }

  /* ---------- Reveal on scroll (index cards) ---------- */
  try {
    var revealEls = document.querySelectorAll(".tool-card-item");
    if (revealEls.length > 0) {
      if (reducedMotion || typeof IntersectionObserver === "undefined") {
        // Everything stays visible.
      } else {
        var io = new IntersectionObserver(function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("ck-in");
              io.unobserve(entry.target);
            }
          });
        }, { threshold: 0.08 });
        revealEls.forEach(function (el) {
          el.classList.add("ck-reveal");
          io.observe(el);
        });
      }
    }
  } catch (e) { /* content stays visible */ }

  /* ---------- Footer year (site footer kept by the assembler) ---------- */
  try {
    var yearEl = document.getElementById("year");
    if (yearEl) { yearEl.textContent = String(new Date().getFullYear()); }
  } catch (e) { /* ignore */ }
})();
