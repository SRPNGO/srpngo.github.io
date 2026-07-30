(function () {
  var el = document.getElementById("sumtime");
  if (!el) return;
  el.style.display = "inline";
  var time = document.lastModified;
  var resultTime = [6, 7, 8, 9, ".", 0, 1, ".", 3, 4];
  var result = "";
  resultTime.forEach(function (i) {
    result += time[i] != undefined ? time[i] : ".";
  });
  el.innerHTML = result;
})();
