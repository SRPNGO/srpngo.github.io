(function () {
  var local =
    window.location.origin.includes("localhost") ||
    window.location.origin.includes("127.0.0.1") ||
    window.location.origin.includes("file://");
  if (local) return;
  var busuanzi = document.createElement("script");
  busuanzi.src = "https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js";
  busuanzi.defer = true;
  document.head.appendChild(busuanzi);
})();