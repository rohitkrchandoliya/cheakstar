// Cheakstar — tiny helpers only. No tracking, no external calls.
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
(function () {
  "use strict";
  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function ssGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }
  var reduced = !!(window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

  /* ---------------- Preloader (cybersecurity theme) ---------------- */
  var preStart = Date.now();
  var pre = null, statusTimer = null, preHidden = false;
  try {
    var seen = !!ssGet("csPreSeen");
    ssSet("csPreSeen", "1");
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

  /* ---------------- Sidebar shell ---------------- */
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
      image: '<rect x="3" y="4.5" width="18" height="15" rx="2"/><circle cx="9" cy="10" r="1.8"/><path d="M20.5 16.5 16 12l-8.5 8.5"/>'
    };
    function icon(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (ICONS[name] || ICONS.grid) + "</svg>"; }
    var CHEV = '<svg class="cs-chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 9.5 12 15.5 18 9.5"/></svg>';

    var NAV = [
      { id: "main", name: "Main", links: [
        ["index.html", "Home", "home"],
        ["books.html", "Books & Store", "book"],
        ["training.html", "Training", "cap"],
        ["services.html", "Security Services", "shield"],
        ["blog.html", "Blog", "pen"],
        ["about.html", "About", "info"],
        ["contact.html", "Contact", "mail"]
      ]},
      { id: "learn", name: "Learn Free", links: [
        ["checklist.html", "Free Checklist", "checklist"],
        ["free-resources.html", "Free Resources", "gift"],
        ["knowledge-brain.html", "Knowledge Brain", "cpu"]
      ]},
      { id: "tools", name: "Tools", links: [
        ["tools-preview/", "All Tools", "grid"],
        ["tools-preview/qr-code-generator/", "QR Code Generator", "qr"],
        ["tools-preview/pdf-compressor/", "PDF Compressor", "doc"],
        ["tools-preview/image-compressor/", "Image Compressor", "image"]
      ]}
    ];

    // Which link is the current page?
    var path = window.location.pathname || "/";
    var currentHref = null, currentGroup = "main";
    (function detectCurrent() {
      var tp = path.indexOf("/tools-preview/");
      if (tp >= 0) {
        var rest = path.slice(tp + "/tools-preview/".length);
        var seg = rest.split("/")[0];
        currentGroup = "tools";
        if (seg === "qr-code-generator") currentHref = "tools-preview/qr-code-generator/";
        else if (seg === "pdf-compressor") currentHref = "tools-preview/pdf-compressor/";
        else if (seg === "image-compressor") currentHref = "tools-preview/image-compressor/";
        else currentHref = "tools-preview/";
        return;
      }
      var file = path.split("/").pop() || "index.html";
      if (file === "") file = "index.html";
      for (var g = 0; g < NAV.length; g++) {
        for (var i = 0; i < NAV[g].links.length; i++) {
          if (NAV[g].links[i][0] === file) { currentHref = file; currentGroup = NAV[g].id; return; }
        }
      }
      currentHref = file; // e.g. a blog article: no nav item, Main stays the default group
    })();

    // Group open states: stored prefs win, except the current page's group always opens.
    var storedGroups = {};
    try { storedGroups = JSON.parse(lsGet("csGroups") || "{}") || {}; } catch (e) { storedGroups = {}; }
    var groupOpen = {};
    NAV.forEach(function (g) {
      var open = g.id === "main";
      if (typeof storedGroups[g.id] === "boolean") open = storedGroups[g.id];
      if (g.id === currentGroup) open = true;
      groupOpen[g.id] = open;
    });
    function persistGroups() { lsSet("csGroups", JSON.stringify(groupOpen)); }

    // Build the shell DOM.
    var html = "";
    html += '<aside class="cs-side" id="csSide" aria-label="Site navigation">';
    html += '<div class="cs-side-head"><a class="cs-logo cs-logo-full" href="index.html">CHEAK<span>STAR</span></a>' +
            '<a class="cs-logo cs-logo-mini" href="index.html" aria-label="Cheakstar home">C<span>S</span></a>' +
            '<button class="cs-side-close" id="csSideClose" type="button" aria-label="Close menu">&times;</button></div>';
    html += '<div class="cs-filter"><input type="search" id="csFilter" placeholder="Search pages" aria-label="Search pages" autocomplete="off"></div>';
    html += '<nav class="cs-nav" id="csNav">';
    NAV.forEach(function (g) {
      html += '<div class="cs-group' + (groupOpen[g.id] ? " open" : "") + '" data-group="' + g.id + '">';
      html += '<button class="cs-group-head" type="button" aria-expanded="' + (groupOpen[g.id] ? "true" : "false") + '"><span class="cs-group-name">' + g.name + "</span>" + CHEV + "</button>";
      html += '<div class="cs-group-body"><div class="cs-group-inner">';
      g.links.forEach(function (l) {
        html += '<a href="' + l[0] + '"' + (l[0] === currentHref ? ' class="active" aria-current="page"' : "") + ' data-label="' + l[1] + '">' + icon(l[2]) + '<span class="cs-label">' + l[1] + "</span></a>";
      });
      html += "</div></div></div>";
    });
    html += '<div class="cs-noresults" id="csNoResults" hidden>No page matches your search.</div>';
    html += "</nav>";
    html += '<div class="cs-side-foot"><button class="cs-rail-toggle" id="csRailToggle" type="button" aria-label="Collapse or expand the sidebar"></button></div>';
    html += "</aside>";
    html += '<div class="cs-backdrop" id="csBackdrop"></div>';
    html += '<header class="cs-topbar" id="csTopbar"><button class="cs-burger" id="csBurger" type="button" aria-label="Open menu"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>' +
            '<a class="cs-logo" href="index.html">CHEAK<span>STAR</span></a></header>';
    html += '<div class="cs-progress" id="csProgress"></div>';
    html += '<button class="cs-top-btn" id="csTopBtn" type="button" aria-label="Back to top"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M5.5 11.5 12 5l6.5 6.5"/></svg></button>';

    var holder = document.createElement("div");
    holder.innerHTML = html;
    var oldHeader = document.querySelector("header.site");
    while (holder.firstChild) {
      var node = holder.firstChild;
      if (node.id === "csTopbar" && oldHeader && oldHeader.parentNode) {
        oldHeader.parentNode.insertBefore(node, oldHeader);
      } else {
        document.body.appendChild(node);
      }
    }
    document.body.classList.add("cs-shell");

    var mqMobile = window.matchMedia("(max-width: 768px)");
    var side = document.getElementById("csSide");
    var navEl = document.getElementById("csNav");

    // Groups: expand / collapse.
    var groupHeads = side.querySelectorAll(".cs-group-head");
    Array.prototype.forEach.call(groupHeads, function (head) {
      head.addEventListener("click", function () {
        var group = head.parentNode;
        var id = group.getAttribute("data-group");
        var open = group.classList.toggle("open");
        head.setAttribute("aria-expanded", open ? "true" : "false");
        groupOpen[id] = open;
        persistGroups();
      });
    });
    function applyGroupStates() {
      Array.prototype.forEach.call(side.querySelectorAll(".cs-group"), function (group) {
        var id = group.getAttribute("data-group");
        var open = !!groupOpen[id];
        group.classList.toggle("open", open);
        group.querySelector(".cs-group-head").setAttribute("aria-expanded", open ? "true" : "false");
        group.style.display = "";
        Array.prototype.forEach.call(group.querySelectorAll("a"), function (a) { a.style.display = ""; });
      });
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
        Array.prototype.forEach.call(group.querySelectorAll("a"), function (a) {
          var hit = a.getAttribute("data-label").toLowerCase().indexOf(q) >= 0;
          a.style.display = hit ? "" : "none";
          if (hit) count++;
        });
        group.style.display = count ? "" : "none";
        if (count) group.classList.add("open");
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
    }
    if (lsGet("csRail") === "1" && !mqMobile.matches) document.body.classList.add("cs-rail");
    applyRail();
    railBtn.addEventListener("click", function () {
      var rail = document.body.classList.toggle("cs-rail");
      lsSet("csRail", rail ? "1" : "0");
      applyRail();
    });

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
      tops.forEach(function (el) { el.classList.add("cs-reveal"); seenEls.push(el); });
      document.body.classList.add("cs-anim");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("revealed"); io.unobserve(en.target); }
        });
      }, { threshold: 0.1, rootMargin: "0px 0px -4% 0px" });
      seenEls.forEach(function (el) { io.observe(el); });
      setTimeout(function () { // failsafe: nothing stays hidden
        seenEls.forEach(function (el) { el.classList.add("revealed"); });
      }, 1600);
    }
  } catch (e) {
    // Shell failed: fall back to the original top header, fully usable.
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

// ==== Cheakstar sidebar account block (2026-11-06).
// Failure-isolated: renders instantly in the signed-out state, loads
// auth.js lazily, then updates when the account state is known. If
// anything fails, the block simply stays in its signed-out form. ====
(function () {
  "use strict";
  try {
    var side = document.getElementById("csSide");
    var foot = side ? side.querySelector(".cs-side-foot") : null;
    if (!side || !foot) return;

    var USER_ICON = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.6"/><path d="M5 20c1.2-3.2 3.8-4.8 7-4.8s5.8 1.6 7 4.8"/></svg>';
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
          '<a href="login.html">' + USER_ICON + '<span class="cs-label">Login</span></a>' +
          '<a href="signup.html">' + USER_ICON + '<span class="cs-label">Sign Up</span></a>';
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
        '<div class="cs-acc-meta"><span class="cs-acc-name">' + esc(name) + "</span>" +
        '<span class="cs-acc-email">' + esc(user.email || "") + "</span></div></div>" +
        '<a href="account.html">' + USER_ICON + '<span class="cs-label">My Account</span></a>' +
        '<button type="button" class="cs-acc-out" id="csAccSignOut">' + OUT_ICON + '<span class="cs-label">Sign Out</span></button>';
      var out = bodyEl.querySelector("#csAccSignOut");
      if (out) out.addEventListener("click", function () {
        if (window.CSAuth) window.CSAuth.signOut().then(function () { window.location.reload(); });
      });
    }
    render(null); // instant signed-out state; updated when CSAuth resolves

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
      s.src = "auth.js";
      s.async = true;
      s.onload = function () { hook(); };
      (document.head || document.documentElement).appendChild(s);
      var tries = 0;
      var iv = setInterval(function () { if (hook() || ++tries > 40) clearInterval(iv); }, 250);
    }
  } catch (e) {}
})();
