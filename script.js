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
