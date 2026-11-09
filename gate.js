// Cheakstar — login gate (registration wall), shared module.
// The site stays fully browsable signed out; the *value moments* — a
// tool's result, the rest of a blog article, sending a message — ask for
// a free login. This is a presentation layer on a static site: it
// converts honest visitors, it is not a security boundary (the plan
// document states this limit openly).
//
// Pages opt in through the script tag's data attribute:
//   <script src="gate.js" data-cs-gate-run="blog"></script>
//   <script src="gate.js" data-cs-gate-run="contact"></script>
//   <script src="../../gate.js" data-cs-gate-run="tool"></script>
// This file lives at the site root; its own URL is how every page finds
// the root-relative paths for the login/signup links and the return flow.
(function () {
  "use strict";
  if (window.CSGate) return;

  var RETURN_KEY = "ck_return_to";
  var STATE_PREFIX = "ck_gate_state_";

  /* ---------- paths ---------- */
  var rootBase = "";
  try {
    var selfSrc = (document.currentScript && document.currentScript.src) || "";
    var cut = selfSrc.lastIndexOf("/");
    if (cut >= 0) rootBase = selfSrc.slice(0, cut + 1);
  } catch (e) {}
  if (!rootBase) rootBase = window.location.href.split("/").slice(0, -1).join("/") + "/";

  function pagePath() {
    // Current page as a root-relative path, e.g. "tools-preview/emi-calculator/"
    var here = window.location.href.split("#")[0].split("?")[0];
    if (here.indexOf(rootBase) === 0) return here.slice(rootBase.length);
    return here;
  }

  /* A return target is only ever a same-site relative path: no scheme,
     no protocol-relative "//", no backslashes, no "..". */
  function cleanNext(raw) {
    if (!raw) return "";
    var s = String(raw);
    try { s = decodeURIComponent(s); } catch (e) {}
    if (s.indexOf("://") >= 0 || s.indexOf("//") === 0) return "";
    if (s.indexOf("\\") >= 0 || s.indexOf("..") >= 0) return "";
    if (!/^[A-Za-z0-9_\-\.\/\?#=&%+~]+$/.test(s)) return "";
    if (s.charAt(0) === "/") s = s.slice(1);
    return s;
  }

  function lsGet(k) { try { return window.localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { window.localStorage.setItem(k, v); } catch (e) {} }
  function lsDel(k) { try { window.localStorage.removeItem(k); } catch (e) {} }
  function ssGet(k) { try { return window.sessionStorage.getItem(k); } catch (e) { return null; } }
  function ssSet(k, v) { try { window.sessionStorage.setItem(k, v); } catch (e) {} }
  function ssDel(k) { try { window.sessionStorage.removeItem(k); } catch (e) {} }

  /* ---------- auth state ----------
     Resolved once CSAuth reports. If the sign-in service itself cannot
     be reached (CSAuth unavailable), the gate stays OFF — a visitor is
     never punished for an outage on our side. */
  var authState = "pending"; // pending | out | in | unavailable
  var authWaiters = [];
  function authReady() {
    return new Promise(function (res) {
      if (authState !== "pending") { res(authState); return; }
      authWaiters.push(res);
    });
  }
  function settleAuth(state) {
    if (authState !== "pending") return;
    authState = state;
    authWaiters.splice(0).forEach(function (res) { res(state); });
  }
  function hookAuth() {
    if (window.CSAuth) {
      window.CSAuth.ready.then(function () {
        if (!window.CSAuth.isAvailable()) { settleAuth("unavailable"); return; }
        settleAuth(window.CSAuth.getUser() ? "in" : "out");
      });
      return true;
    }
    return false;
  }
  if (!hookAuth()) {
    var s = document.createElement("script");
    s.src = rootBase + "auth.js";
    s.async = true;
    s.onload = function () { hookAuth() || settleAuth("unavailable"); };
    s.onerror = function () { settleAuth("unavailable"); };
    (document.head || document.documentElement).appendChild(s);
    var tries = 0;
    var iv = setInterval(function () {
      if (hookAuth() || ++tries > 40) {
        clearInterval(iv);
        if (authState === "pending" && !window.CSAuth) settleAuth("unavailable");
      }
    }, 250);
    // Hard stop: never leave the gate undecided for more than 15 seconds.
    setTimeout(function () { if (!window.CSAuth) settleAuth("unavailable"); }, 15000);
  }

  /* ---------- the lock card ---------- */
  var COPY = {
    tool: { title: "Your result is ready", text: "Log in free to reveal it." },
    download: { title: "Almost there", text: "Log in or create a free account to finish and download your file." },
    blog: { title: "Keep reading", text: "Log in to read the full article — it's free." },
    contact: { title: "Send us a message", text: "Log in to send us a message. We reply to every genuine message." }
  };
  var LOCK_SVG = '<svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><rect x="5" y="10.5" width="14" height="9.5" rx="2"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/></svg>';

  function buildCard(kind, onNavigate) {
    var c = COPY[kind] || COPY.tool;
    var next = encodeURIComponent(pagePath());
    var box = document.createElement("div");
    box.className = "gate-card-box";
    box.innerHTML =
      '<div class="gate-lock">' + LOCK_SVG + "</div>" +
      "<h3></h3><p></p>" +
      '<div class="gate-btns">' +
      '<a class="btn" href="' + rootBase + "login.html?next=" + next + '">Log in</a>' +
      '<a class="btn ghost" href="' + rootBase + "signup.html?next=" + next + '">Create free account</a>' +
      "</div>" +
      '<p class="gate-micro">Free forever · No card needed</p>';
    box.querySelector("h3").textContent = c.title;
    box.querySelector("p").textContent = c.text;
    if (typeof onNavigate === "function") {
      box.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () { onNavigate(); });
      });
    }
    return box;
  }

  /* ---------- guard: blur-wrap one result element ---------- */
  /* One login card per page is enough: every result zone still gets
     blurred, but only the first guarded zone carries the card — tools
     with several result zones (a result plus its history list, say)
     must not stack the same card two or three times. */
  var cardPlaced = false;
  function guard(el, opts) {
    opts = opts || {};
    if (!el || el.closest(".gate-wrap")) return null;
    var wrap = document.createElement("div");
    wrap.className = "gate-wrap";
    el.parentNode.insertBefore(wrap, el);
    var blur = document.createElement("div");
    blur.className = "gate-blur";
    blur.setAttribute("aria-hidden", "true");
    wrap.appendChild(blur);
    blur.appendChild(el);
    if (!opts.soft && !cardPlaced) {
      cardPlaced = true;
      var card = document.createElement("div");
      card.className = "gate-card";
      card.appendChild(buildCard(opts.kind || "tool", opts.onNavigate));
      wrap.appendChild(card);
    }
    return wrap;
  }

  /* ================================================================
     TOOLS — gate the result, never the tool itself.
     ================================================================ */
  function toolSlug() {
    var parts = window.location.pathname.split("/").filter(function (x) { return x; });
    return parts.length ? parts[parts.length - 1].replace(/\.html$/, "") : "tool";
  }

  function saveToolState() {
    try {
      var card = document.querySelector(".tool-card");
      if (!card) return;
      var data = {};
      card.querySelectorAll("input, select, textarea").forEach(function (el) {
        if (!el.id) return;
        if (el.type === "file" || el.readOnly) return;
        if (el.closest("[data-result]")) return;
        if (el.type === "checkbox" || el.type === "radio") data[el.id] = { c: !!el.checked };
        else data[el.id] = { v: el.value };
      });
      ssSet(STATE_PREFIX + toolSlug(), JSON.stringify(data));
      lsSet(RETURN_KEY, pagePath());
    } catch (e) {}
  }

  function restoreToolState() {
    var raw = ssGet(STATE_PREFIX + toolSlug());
    if (!raw) return false;
    try {
      var data = JSON.parse(raw);
      var restored = false;
      Object.keys(data).forEach(function (id) {
        var el = document.getElementById(id);
        if (!el) return;
        if (typeof data[id].c === "boolean") {
          el.checked = data[id].c;
        } else if (typeof data[id].v === "string") {
          el.value = data[id].v;
        } else { return; }
        restored = true;
        ["input", "change"].forEach(function (type) {
          try { el.dispatchEvent(new Event(type, { bubbles: true })); } catch (e) {}
        });
      });
      return restored;
    } catch (e) { return false; }
  }

  function showToolNote(text) {
    var card = document.querySelector(".tool-card");
    if (!card || document.querySelector(".gate-note")) return;
    var note = document.createElement("div");
    note.className = "gate-note";
    note.textContent = text;
    card.parentNode.insertBefore(note, card.nextSibling);
  }

  function signature(el) {
    if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") return "v:" + (el.value || "");
    var media = el.querySelector("img, canvas, video, audio, a[download], a.download") ? "m" : "";
    return (el.hidden ? "h" : "s") + "|" + media + "|" + (el.innerHTML || "").length + "|" + (el.textContent || "").trim().length;
  }
  function hasContent(el, initial) {
    if (el.tagName === "TEXTAREA" || el.tagName === "INPUT") return (el.value || "").trim().length > 0;
    if (el.hidden) return false;
    if (signature(el) === initial) return false;
    if ((el.textContent || "").trim().length > 0) return true;
    return !!el.querySelector("img, canvas, video, audio, a[download], a.download");
  }

  function initTool() {
    var card = document.querySelector(".tool-card");
    if (!card) return;
    authReady().then(function (state) {
      if (state === "in") {
        // Returned from login: put the entries back, then either re-run
        // the tool (no file involved) or say plainly what to do next.
        var had = ssGet(STATE_PREFIX + toolSlug());
        if (had) {
          var restored = restoreToolState();
          ssDel(STATE_PREFIX + toolSlug());
          lsDel(RETURN_KEY);
          if (restored) {
            var hasFile = !!card.querySelector('input[type="file"]');
            var runBtn = document.querySelector("[data-autorun]");
            if (hasFile) {
              showToolNote("Welcome back — your entries were restored. If you had picked a file, please pick it once more, then press the button again.");
            } else if (runBtn) {
              showToolNote("Welcome back — your entries were restored and the tool has been run again for you.");
              setTimeout(function () { runBtn.click(); }, 60);
            } else {
              showToolNote("Welcome back — your entries were restored. Press the button to see your result.");
            }
          }
        }
        return;
      }
      if (state !== "out") return; // unavailable: gate stays off

      /* Hint strip — the gate is announced before the first run, never
         sprung on the visitor afterwards. */
      var sub = document.querySelector(".tool-sub");
      var hint = document.createElement("p");
      hint.className = "gate-hint";
      hint.textContent = "You can try this tool right now. Log in free to reveal your result.";
      if (sub && sub.parentNode) sub.parentNode.insertBefore(hint, sub.nextSibling);
      else if (card.parentNode) card.parentNode.insertBefore(hint, card);

      /* Result watching: snapshot every marked result zone, then guard
         the moment it gains real content. A zone marked data-result-peer
         (a copy or download button) follows its result element instead
         of its own content. */
      var watched = [];
      document.querySelectorAll("[data-result]").forEach(function (el) {
        var peer = el.hasAttribute("data-result-peer")
          ? document.querySelector(el.getAttribute("data-result-peer"))
          : null;
        var watchEl = peer || el;
        watched.push({ el: el, watchEl: watchEl, initial: signature(watchEl), done: false });
      });
      function sweep() {
        watched.forEach(function (w) {
          if (w.done) return;
          if (hasContent(w.watchEl, w.initial)) {
            w.done = true;
            guard(w.el, {
              soft: w.el.hasAttribute("data-result-soft"),
              kind: "tool",
              onNavigate: saveToolState
            });
          }
        });
      }
      var mo = null;
      if (window.MutationObserver) {
        mo = new MutationObserver(function () { sweep(); });
        var seen = [];
        watched.forEach(function (w) {
          [w.el, w.watchEl].forEach(function (target) {
            if (seen.indexOf(target) >= 0) return;
            seen.push(target);
            mo.observe(target, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["hidden", "class", "style", "disabled"] });
          });
        });
      }
      document.addEventListener("input", sweep, true);
      document.addEventListener("change", sweep, true);
      var poll = setInterval(sweep, 500);
      setTimeout(function () { clearInterval(poll); if (mo) mo.disconnect(); }, 10 * 60 * 1000);

      /* Immediate-download tools: the run click IS the value moment, so
         it is intercepted (capture phase, before the tool's own handler)
         and answered with the lock card instead of the file. */
      document.addEventListener("click", function (ev) {
        var t = ev.target && ev.target.closest ? ev.target.closest("[data-gate-run]") : null;
        if (!t) return;
        ev.preventDefault();
        ev.stopPropagation();
        var existing = document.querySelector(".gate-standalone");
        if (existing) { existing.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
        var holder = document.createElement("div");
        holder.className = "gate-standalone";
        var box = buildCard("download", saveToolState);
        holder.appendChild(box);
        card.parentNode.insertBefore(holder, card.nextSibling);
        holder.scrollIntoView({ behavior: "smooth", block: "center" });
      }, true);
    });
  }

  /* ================================================================
     BLOG — first 2 full paragraphs open, the rest behind the card.
     The full text stays in the HTML (indexable); only its on-screen
     tail moves into a hidden container.
     ================================================================ */
  function initBlog() {
    var prose = document.querySelector(".prose");
    if (!prose) return;
    authReady().then(function (state) {
      if (state !== "out") return;
      var kids = Array.prototype.slice.call(prose.children);
      var paras = 0, cut = -1;
      kids.forEach(function (el, i) {
        if (cut >= 0) return;
        if (el.tagName === "P") {
          var isBackLink = !!el.querySelector("a.go") || (el.textContent || "").indexOf("←") === 0;
          if (!isBackLink) {
            paras++;
            if (paras === 2) cut = i;
          }
        }
      });
      if (cut < 0) return;
      // Gate only when a real tail exists: the "back to blog" paragraph
      // is navigation, not article content, and stays visible in place.
      function isBackLink(el) { return el.tagName === "P" && !!el.querySelector("a.go"); }
      var rest = kids.slice(cut + 1);
      var tailKids = rest.filter(function (el) { return !isBackLink(el); });
      if (!tailKids.length) return;
      var zone = document.createElement("div");
      zone.className = "gate-blog-zone";
      var tail = document.createElement("div");
      tail.className = "gate-tail";
      tail.hidden = true;
      tail.setAttribute("aria-hidden", "true");
      tailKids.forEach(function (el) { tail.appendChild(el); });
      zone.appendChild(tail);
      var fade = document.createElement("div");
      fade.className = "gate-fade";
      fade.setAttribute("aria-hidden", "true");
      zone.appendChild(fade);
      var holder = document.createElement("div");
      holder.className = "gate-standalone";
      holder.appendChild(buildCard("blog", null));
      zone.appendChild(holder);
      prose.insertBefore(zone, kids[cut].nextSibling);
    });
  }

  /* ================================================================
     CONTACT — the enquiry-form slot only. Public channel cards and
     the grievance contact are never touched by the gate.
     ================================================================ */
  function initContact() {
    var slot = document.getElementById("contactFormSlot");
    if (!slot) return;
    authReady().then(function (state) {
      if (state !== "out") return;
      var inner = document.createElement("div");
      inner.hidden = true;
      while (slot.firstChild) inner.appendChild(slot.firstChild);
      slot.appendChild(inner);
      var holder = document.createElement("div");
      holder.className = "gate-standalone";
      holder.appendChild(buildCard("contact", null));
      slot.appendChild(holder);
    });
  }

  /* ---------- public API + auto-run ---------- */
  window.CSGate = {
    guard: guard,
    buildCard: buildCard,
    cleanNext: cleanNext,
    authReady: authReady,
    initTool: initTool,
    initBlog: initBlog,
    initContact: initContact,
    saveReturn: function () { lsSet(RETURN_KEY, pagePath()); },
    takeReturn: function () {
      var v = cleanNext(lsGet(RETURN_KEY));
      if (v) lsDel(RETURN_KEY);
      return v;
    }
  };

  var selfTag = document.currentScript;
  var runMode = selfTag ? selfTag.getAttribute("data-cs-gate-run") : null;
  function autoRun() {
    if (runMode === "tool") initTool();
    else if (runMode === "blog") initBlog();
    else if (runMode === "contact") initContact();
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", autoRun);
  else autoRun();
})();
