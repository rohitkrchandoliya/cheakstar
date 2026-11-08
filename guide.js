// ==== Cheakstar Guide Bot (2026-11-08, website master list item 17).
// A tap-only guide for the whole website: the visitor picks from the
// options offered and is pointed to the right page or tool. There is
// deliberately NO text input — every step is a fixed, pre-written
// option (Rohit's locked "prefix-only" rule). The conversation lives
// only in a variable in this page: it is never written to storage,
// never sent anywhere, and it clears itself the moment the visitor
// logs out. Every step offers "Back to main menu", so no path can
// dead-end. The tool branch reads tools.json (the machine-readable
// catalogue, master list item 26) the first time it is opened; if
// that file cannot be loaded, the branch falls back to pointing at
// the All Tools page instead of failing. Loaded by script.js on the
// main pages, by assets/tools.js on the tool pages, and directly by
// the standalone login and signup pages (which show the welcome
// greeting). Failure-isolated like every other block: if anything
// here throws, the page keeps working exactly as before. ====
(function () {
  "use strict";
  try {
    if (window.__csGuideBoot) return;
    window.__csGuideBoot = true;

    /* ---------- Where am I? Page-relative prefixes, derived the
       same way the shells derive theirs: main pages sit at the site
       root, tool pages one or two levels below it. ---------- */
    var path = window.location.pathname || "/";
    var file = path.split("/").pop() || "index.html";
    var tpIdx = path.indexOf("/tools-preview/");
    var SITE = "", TOOLS = "tools-preview/";
    if (tpIdx >= 0) {
      var rest = path.slice(tpIdx + "/tools-preview/".length);
      var seg = rest.split("/")[0];
      if (seg && seg !== "index.html") { SITE = "../../"; TOOLS = "../"; }
      else { SITE = "../"; TOOLS = ""; }
    }
    var TOOLS_INDEX = TOOLS === "" ? "index.html" : TOOLS;
    var onLogin = file === "login.html", onSignup = file === "signup.html";

    // Tools whose whole job is asking a public database (verified
    // against each tool page's own code): the guide says so honestly
    // instead of repeating the "runs on your device" line for them.
    var LOOKUP = {
      "dns-lookup": 1, "rdap-whois-lookup": 1, "ip-lookup": 1,
      "whats-my-ip": 1, "subdomain-finder": 1, "security-headers-check": 1,
      "email-breach-check": 1, "password-breach-check": 1
    };

    function esc(s) {
      return String(s == null ? "" : s)
        .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
    }

    /* ---------- Auth: who is signed in (for the greeting and the
       account branch), and the logout clear. CSAuth is provided by
       auth.js, which some pages load directly and the shells load
       lazily — poll briefly, exactly like the shells do. ---------- */
    var currentUser = null, hadUser = false, authHooked = false;
    function displayName() {
      var meta = (currentUser && currentUser.user_metadata) || {};
      var n = typeof meta.display_name === "string" ? meta.display_name.trim() : "";
      return n;
    }
    function hookAuth() {
      if (authHooked || !window.CSAuth || !window.CSAuth.onChange) return authHooked;
      authHooked = true;
      try {
        window.CSAuth.onChange(function (user) {
          var was = !!currentUser;
          currentUser = user || null;
          if (currentUser) hadUser = true;
          if (was && !currentUser) resetConversation(); // logged out: clear at once
        });
        if (window.CSAuth.ready && window.CSAuth.ready.then) {
          window.CSAuth.ready.then(function () {
            var u = null;
            try { u = window.CSAuth.getUser(); } catch (e) {}
            if (u) { currentUser = u; hadUser = true; }
          });
        }
      } catch (e) {}
      return true;
    }
    if (!hookAuth()) {
      var aTries = 0;
      var aIv = setInterval(function () { if (hookAuth() || ++aTries > 40) clearInterval(aIv); }, 250);
    }

    /* ---------- The catalogue (tools.json), fetched lazily the
       first time the tool branch is opened. In-memory only. ------ */
    var catalogue = null, catalogueFailed = false, catalogueWaiters = [];
    function loadCatalogue(done) {
      if (catalogue || catalogueFailed) { done(); return; }
      catalogueWaiters.push(done);
      if (catalogueWaiters.length > 1) return;
      function finish() {
        var w = catalogueWaiters; catalogueWaiters = [];
        w.forEach(function (fn) { try { fn(); } catch (e) {} });
      }
      if (!window.fetch) { catalogueFailed = true; finish(); return; }
      window.fetch(SITE + "tools.json", { credentials: "same-origin" })
        .then(function (r) { if (!r.ok) throw new Error("tools.json " + r.status); return r.json(); })
        .then(function (j) {
          if (j && j.tools && j.categories) catalogue = j; else catalogueFailed = true;
          finish();
        })
        .catch(function () { catalogueFailed = true; finish(); });
    }
    function catById(id) {
      if (!catalogue) return null;
      for (var i = 0; i < catalogue.categories.length; i++) {
        if (catalogue.categories[i].id === id) return catalogue.categories[i];
      }
      return null;
    }
    function toolBySlug(slug) {
      if (!catalogue) return null;
      for (var i = 0; i < catalogue.tools.length; i++) {
        if (catalogue.tools[i].slug === slug) return catalogue.tools[i];
      }
      return null;
    }
    function toolsInCat(id) {
      var out = [];
      if (!catalogue) return out;
      catalogue.tools.forEach(function (t) { if (t.categoryId === id) out.push(t); });
      return out;
    }

    /* ---------- Panel DOM ---------- */
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "ck-guide-btn";
    btn.setAttribute("aria-haspopup", "dialog");
    btn.setAttribute("aria-expanded", "false");
    btn.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l7 2.8v5.4c0 4.4-2.9 7.4-7 8.8-4.1-1.4-7-4.4-7-8.8V5.8z"/><path d="M9.4 9.6a2.7 2.7 0 1 1 3.9 2.4c-.8.35-1.3.8-1.3 1.7"/><path d="M12 16.6h.01"/></svg><span>Guide</span>';

    var panel = document.createElement("div");
    panel.className = "ck-guide-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Cheakstar guide");
    panel.hidden = true;
    panel.innerHTML =
      '<div class="ck-guide-head"><span class="ck-guide-title">Cheakstar Guide</span>' +
      '<button type="button" class="ck-guide-close" aria-label="Close the guide">&times;</button></div>' +
      '<div class="ck-guide-msgs" role="log" aria-live="polite"></div>' +
      '<div class="ck-guide-opts"></div>' +
      '<p class="ck-guide-note">Tap an option — there is nothing to type, and this chat is never saved.</p>';
    var msgsEl = panel.querySelector(".ck-guide-msgs");
    var optsEl = panel.querySelector(".ck-guide-opts");
    var closeBtn = panel.querySelector(".ck-guide-close");

    function mount() {
      if (!document.body) return false;
      document.body.appendChild(btn);
      document.body.appendChild(panel);
      return true;
    }
    if (!mount()) document.addEventListener("DOMContentLoaded", mount);

    var open = false, started = false;
    function say(html) {
      var d = document.createElement("div");
      d.className = "ck-guide-msg";
      d.innerHTML = html;
      msgsEl.appendChild(d);
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
    function echo(label) {
      var d = document.createElement("div");
      d.className = "ck-guide-msg me";
      d.textContent = label;
      msgsEl.appendChild(d);
      msgsEl.scrollTop = msgsEl.scrollHeight;
    }
    // Render one step's options. Unless this IS the main menu, the
    // "Back to main menu" option is always appended (master list
    // item 17), so no step can ever be a dead end.
    function renderOptions(list, isRoot) {
      optsEl.innerHTML = "";
      var items = list.slice();
      if (!isRoot) items.push({ label: "Back to main menu", node: "root" });
      items.forEach(function (o) {
        var el;
        if (o.href) {
          el = document.createElement("a");
          el.className = "ck-guide-opt";
          el.href = o.href;
          if (o.ext) { el.target = "_blank"; el.rel = "noopener"; }
        } else {
          el = document.createElement("button");
          el.type = "button";
          el.className = "ck-guide-opt";
          el.addEventListener("click", function () { echo(o.label); go(o.node); });
        }
        el.textContent = o.label;
        optsEl.appendChild(el);
      });
    }
    function resetConversation() {
      started = false;
      try { msgsEl.innerHTML = ""; optsEl.innerHTML = ""; } catch (e) {}
      if (open) setOpen(false);
    }

    /* ---------- The option tree ---------- */
    function greeting() {
      var name = displayName();
      var first = name ? name.split(/\s+/)[0] : "";
      if (onLogin) return "Welcome to Cheakstar. I am the site guide — I work through the options below, so there is nothing to type. Log in to open all 58 free tools, earn points for your active time and see the leaderboard. New here? Creating an account is free.";
      if (onSignup) return "Welcome to Cheakstar. A free account unlocks all 58 browser tools, points for the time you actively spend here, and your place on the leaderboard. Until then I can still show you around — pick an option below.";
      if (currentUser) return "Hello" + (first ? ", " + esc(first) : "") + ". I am the Cheakstar guide — pick an option below and I will point you to the right page or tool. This chat is never saved, and it clears itself when you log out.";
      return "Hello. I am the Cheakstar guide — pick an option below and I will point you to the right page or tool. There is nothing to type, and this chat is never saved.";
    }
    function rootOptions() {
      return [
        { label: "Find a tool", node: "tools" },
        { label: "Learn cybersecurity", node: "learn" },
        { label: "Books & the store", node: "books" },
        { label: "Training & workshops", node: "training" },
        { label: "My account & points", node: "account" },
        { label: "Contact & help", node: "contact" }
      ];
    }
    function go(id) {
      if (id === "root") {
        if (started) say("Main menu — what would you like to do next?");
        else { say(esc(greeting())); started = true; }
        renderOptions(rootOptions(), true);
        return;
      }
      if (id === "tools") {
        if (catalogue) { toolsNode(); return; }
        if (catalogueFailed) { toolsFallback(); return; }
        say("One moment — loading the tool list&hellip;");
        renderOptions([], false);
        loadCatalogue(function () { if (catalogue) toolsNode(); else toolsFallback(); });
        return;
      }
      if (id.indexOf("cat:") === 0) { catNode(id.slice(4)); return; }
      if (id.indexOf("tool:") === 0) { toolNode(id.slice(5)); return; }
      var node = STATIC[id];
      if (node) { say(node.text()); renderOptions(node.options(), false); }
    }
    function toolsNode() {
      say("Every tool is free and runs in your browser. Pick a category, then a tool, and I will tell you what it does before you open it.");
      var opts = catalogue.categories.map(function (c) {
        return { label: c.name + " (" + c.toolCount + ")", node: "cat:" + c.id };
      });
      opts.push({ label: "All Tools page", href: TOOLS_INDEX });
      renderOptions(opts, false);
    }
    function toolsFallback() {
      say("The tool list could not be loaded just now — the All Tools page has every tool with its own description.");
      renderOptions([{ label: "All Tools page", href: TOOLS_INDEX }], false);
    }
    function catNode(id) {
      var c = catById(id);
      if (!c) { toolsFallback(); return; }
      say("<strong>" + esc(c.name) + "</strong> — pick a tool and I will tell you what it does before you open it.");
      var opts = toolsInCat(id).map(function (t) {
        return { label: t.name, node: "tool:" + t.slug };
      });
      opts.push({ label: "All Tools page", href: TOOLS_INDEX });
      renderOptions(opts, false);
    }
    function toolNode(slug) {
      var t = toolBySlug(slug);
      if (!t) { toolsFallback(); return; }
      var note = LOOKUP[slug]
        ? "This one checks a public database online, so the value you enter is sent to that lookup service."
        : "It runs in your browser, on this device — your files are not uploaded.";
      say("<strong>" + esc(t.name) + "</strong> — " + esc(t.description) + " " + note);
      renderOptions([
        { label: "Open " + t.name, href: SITE + t.url },
        { label: "More " + t.category + " tools", node: "cat:" + t.categoryId }
      ], false);
    }
    var STATIC = {
      learn: {
        text: function () {
          return "Learning here is free and in a sensible order: start with the safety checklist, read the beginner articles on the blog, and use the free resources page for practice material. When you want structured teaching, training is the next step.";
        },
        options: function () {
          return [
            { label: "Free Checklist", href: SITE + "checklist.html" },
            { label: "Free Resources", href: SITE + "free-resources.html" },
            { label: "Blog articles", href: SITE + "blog.html" },
            { label: "Training & workshops", node: "training" }
          ];
        }
      },
      books: {
        text: function () {
          return "Our books are practical and step-by-step — the Secure The Future series, Bug Bounty from Scratch, The Honest Report and more. Chapter 1 of Bug Bounty from Scratch is free, so you can judge the style before spending anything.";
        },
        options: function () {
          return [
            { label: "Books & Store page", href: SITE + "books.html" },
            { label: "Free Chapter 1", href: "https://payhip.com/b/SwE03", ext: true },
            { label: "Visit the store", href: "https://payhip.com/securethefuture", ext: true }
          ];
        }
      },
      training: {
        text: function () {
          return "Training starts with a free starter workshop for students and beginners; recorded courses and guided batches follow. Dates are announced only when a batch is fully ready — we never take bookings for something that is not prepared. Tell us what you want to learn through the interest form and we will write to you when enrolment opens.";
        },
        options: function () {
          return [
            { label: "Training page & interest form", href: SITE + "training.html#training-interest" }
          ];
        }
      },
      account: {
        text: function () {
          var name = displayName();
          if (currentUser) {
            return "You are signed in" + (name ? " as <strong>" + esc(name) + "</strong>" : "") + ". Your points grow while you are active on the site, and your standing sits on the leaderboard. Your profile, security, signed-in devices and preferences all live in My Account and Settings.";
          }
          return "An account is free, and it unlocks all 58 tools, points for your active time, and your place on the leaderboard. The tools and account pages stay locked until you log in — that is what keeps your points and your devices tied to you.";
        },
        options: function () {
          if (currentUser) {
            return [
              { label: "My Account", href: SITE + "account.html" },
              { label: "Settings", href: SITE + "settings.html" },
              { label: "Leaderboard", href: SITE + "leaderboard.html" }
            ];
          }
          return [
            { label: "Log in", href: SITE + "login.html" },
            { label: "Create a free account", href: SITE + "signup.html" }
          ];
        }
      },
      contact: {
        text: function () {
          return "The fastest way to reach us is the contact page — its message form goes straight to our inbox, and we reply to every genuine message. The FAQ page answers the common questions about tools, accounts, points and books.";
        },
        options: function () {
          return [
            { label: "Contact page", href: SITE + "contact.html" },
            { label: "FAQ", href: SITE + "faq.html" }
          ];
        }
      }
    };

    /* ---------- Open / close ---------- */
    function setOpen(v) {
      open = v;
      panel.hidden = !v;
      btn.setAttribute("aria-expanded", v ? "true" : "false");
      if (v && !started) go("root");
      if (v) { try { closeBtn.focus(); } catch (e) {} }
    }
    btn.addEventListener("click", function () { setOpen(!open); });
    closeBtn.addEventListener("click", function () { setOpen(false); try { btn.focus(); } catch (e) {} });
    document.addEventListener("keydown", function (ev) {
      if (open && (ev.key === "Escape" || ev.keyCode === 27)) setOpen(false);
    });
  } catch (e) { /* the guide is an extra; the page must never break */ }
})();
