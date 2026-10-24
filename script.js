// Cheakstar — tiny helpers only. No tracking, no external calls.
document.addEventListener("DOMContentLoaded", function () {
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});
