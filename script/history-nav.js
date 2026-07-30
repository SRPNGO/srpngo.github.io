(function () {
  var clickTimes = 0;
  var menuHeight;

  function switchButtonState(time) {
    var button = document.getElementById("button");
    if (!button) return;
    button.setAttribute("disabled", "");
    setTimeout(function () {
      button.removeAttribute("disabled");
    }, time);
  }

  function toggleMenu() {
    var menuStyle = document.getElementById("START").style;
    menuStyle.display = "block";
    if (clickTimes == 0) {
      menuHeight = document.getElementById("START").clientHeight;
      document.documentElement.style.setProperty("--toht", menuHeight);
    }
    menuStyle.height = menuHeight + "px";
    if (++clickTimes % 2) {
      document.getElementById("button").innerHTML = "收起目录";
      menuStyle.animation = "expand 2s";
      switchButtonState(2000);
      menuStyle.display = "block";
      menuStyle.height = menuHeight + "px";
    } else {
      document.getElementById("button").innerHTML = "展开目录";
      menuStyle.animation = "shrink 2s";
      switchButtonState(2000);
      menuStyle.height = "0px";
    }
  }

  document.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-nav-toggle]");
    if (btn) {
      e.preventDefault();
      toggleMenu();
    }
  });
})();