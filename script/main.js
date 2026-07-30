(function () {
  document.addEventListener("click", function (e) {
    var el = e.target.closest("[data-href]");
    if (!el) return;
    var href = el.getAttribute("data-href");
    if (!href) return;
    if (href.startsWith("#")) {
      var target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.location.href = href;
    }
  });
})();