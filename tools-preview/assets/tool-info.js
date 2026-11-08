/* Cheakstar Tools — per-tool information renderer.
   Reads window.CK_TOOL_INFO and window.CK_TOOL_RELATED from tool-info-data.js
   and appends, below the tool UI: a privacy badge, "How to use" steps,
   "Good to know" limits, an FAQ and a "Related tools" rail.
   Additions only — it never touches the tool's own controls or behaviour. */
(function () {
  "use strict";

  var script = document.currentScript;
  var slug = script ? script.getAttribute("data-tool") : null;
  if (!slug) { return; }

  var rendered = false;
  function render() {
  if (rendered) { return; }
  rendered = true;
  var info = (window.CK_TOOL_INFO || {})[slug];
  if (!info) { return; }
  var related = (window.CK_TOOL_RELATED || {})[slug] || [];

  var ICONS = {
    shield: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3z" stroke="currentColor" stroke-width="1.7"/><path d="M9 12l2 2 4-4" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    globe: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.7"/><path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" stroke="currentColor" stroke-width="1.7"/></svg>'
  };

  function el(tag, cls, text) {
    var node = document.createElement(tag);
    if (cls) { node.className = cls; }
    if (text != null) { node.textContent = text; }
    return node;
  }

  function block(title) {
    var box = el("div", "ckti-block");
    box.appendChild(el("h2", null, title));
    return box;
  }

  var section = el("section", "ckti");
  section.setAttribute("aria-label", "About this tool");

  /* Privacy badge */
  var kind = info.privacyKind || "local";
  var badge = el("div", "ckti-badge" + (kind === "lookup" ? " ckti-badge--lookup" : ""));
  var ico = el("span", "ckti-ico");
  ico.innerHTML = kind === "lookup" ? ICONS.globe : ICONS.shield;
  badge.appendChild(ico);
  var badgeText = el("div");
  badgeText.appendChild(el("strong", null, info.privacyTitle || ""));
  badgeText.appendChild(el("span", null, info.privacyNote || ""));
  badge.appendChild(badgeText);
  section.appendChild(badge);

  /* How to use */
  if (info.steps && info.steps.length) {
    var howBox = block("How to use");
    var ol = el("ol");
    info.steps.forEach(function (step) { ol.appendChild(el("li", null, step)); });
    howBox.appendChild(ol);
    section.appendChild(howBox);
  }

  /* Good to know */
  if (info.goodToKnow && info.goodToKnow.length) {
    var gtkBox = block("Good to know");
    var ul = el("ul");
    info.goodToKnow.forEach(function (point) { ul.appendChild(el("li", null, point)); });
    gtkBox.appendChild(ul);
    section.appendChild(gtkBox);
  }

  /* FAQ */
  if (info.faq && info.faq.length) {
    var faqBox = block("Frequently asked questions");
    info.faq.forEach(function (item) {
      var qa = el("div", "ckti-faq");
      qa.appendChild(el("h3", null, item.q));
      qa.appendChild(el("p", null, item.a));
      faqBox.appendChild(qa);
    });
    section.appendChild(faqBox);
  }

  /* Related tools */
  if (related.length) {
    var relBox = block("Related tools");
    var grid = el("div", "ckti-rel");
    related.forEach(function (tool) {
      var card = el("a", "ckti-rel-card");
      card.setAttribute("href", "../" + tool.slug + "/");
      card.appendChild(el("strong", null, tool.name));
      card.appendChild(el("span", null, tool.description));
      grid.appendChild(card);
    });
    relBox.appendChild(grid);
    section.appendChild(relBox);
  }

  var main = document.querySelector("main");
  if (main) {
    main.appendChild(section);
  } else {
    var footer = document.querySelector("footer");
    if (footer && footer.parentNode) { footer.parentNode.insertBefore(section, footer); }
    else { document.body.appendChild(section); }
  }
  }

  var src = script && script.src ? script.src : "";
  if (/tool-info\.js($|\?)/.test(src)) {
    var s2 = document.createElement("script");
    s2.src = src.replace(/tool-info\.js/, "tool-info-data-2.js");
    s2.onload = render;
    s2.onerror = render;
    document.head.appendChild(s2);
    setTimeout(render, 3000);
  } else {
    render();
  }
})();
