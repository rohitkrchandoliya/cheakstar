/* Cheakstar Tools -- tool-page logic only (slimmed 2026-11-14).
   The sidebar shell that used to fill most of this file now lives
   ONCE in /shell.js at the site root, which every tool page loads
   before this file. What remains here is only what is specific to
   tool pages: the favourites + recent-tools caller, the Guide Bot
   loader and the tools-hub search polish -- carried over unchanged
   from the previous tools.js. */

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

/* ==== Cheakstar Guide Bot loader (2026-11-08, master list item 17).
   The guide itself lives in guide.js at the MAIN site root; the main
   pages load it through script.js and the standalone auth pages
   include it directly. This loader derives the site root from this
   script's own URL, exactly like the shell above. guide.js carries
   its own boot guard, so it can never start twice. ==== */
(function () {
  "use strict";
  try {
    if (window.__csGuideBoot) return;
    var prefix = "../../";
    try {
      var el = document.currentScript;
      if (el && el.src) {
        var marker = "assets/tools.js";
        var idx = el.src.indexOf(marker);
        if (idx > -1) prefix = el.src.slice(0, idx) + "../";
      }
    } catch (e) { /* keep fallback */ }
    var s = document.createElement("script");
    s.src = prefix + "guide.js";
    s.async = true;
    (document.head || document.documentElement).appendChild(s);
  } catch (e) {}
})();

/* ==== Hub search polish (2026-11-08, master list item 27).
   Hub page only — it activates solely when the hub's #tool-search
   input exists, so every other page is untouched. Adds:
   - Ctrl+K / Cmd+K focuses the search box from anywhere on the page;
   - the shortcut is hinted at the end of the search placeholder;
   - a ?q=<term> address pre-fills the box and applies the hub's own
     filter at once (by dispatching the same "input" event a keypress
     would, so the existing filter code stays the only filter);
   - Escape inside the box clears the search (restoring the full
     grid), or blurs when the box is already empty.
   Runs on DOMContentLoaded because this script is parsed before the
   hub's inline filter script; the whole block is failure-isolated. */
(function () {
  "use strict";
  function initHubSearch() {
    try {
      var input = document.getElementById("tool-search");
      if (!input) return;
      var ph = input.getAttribute("placeholder") || "";
      if (ph && ph.indexOf("Ctrl+K") === -1) {
        input.setAttribute("placeholder", ph + "  (Ctrl+K)");
      }
      document.addEventListener("keydown", function (e) {
        if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "K")) {
          e.preventDefault();
          input.focus();
          if (input.select) input.select();
        }
      });
      input.addEventListener("keydown", function (e) {
        if (e.key !== "Escape") return;
        if (input.value) {
          input.value = "";
          input.dispatchEvent(new Event("input", { bubbles: true }));
        } else {
          input.blur();
        }
      });
      var q = null;
      try { q = new URLSearchParams(window.location.search).get("q"); } catch (e) { q = null; }
      if (q) {
        input.value = q;
        input.dispatchEvent(new Event("input", { bubbles: true }));
      }
    } catch (e) { /* search polish is an enhancement; never break the hub */ }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHubSearch);
  } else {
    initHubSearch();
  }
})();
