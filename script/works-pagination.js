(function () {
  var sortMode = ["time", "hot", "author", "class"];
  var sortModeText = ["时间排序", "热度排序", "作者排序", "类型排序"];

  function parseTimeString(timeStr) {
    if (!timeStr) return 0;
    var normalized = timeStr.trim().replace(/[./]/g, "-");
    var timestamp = Date.parse(normalized);
    return isNaN(timestamp) ? 0 : timestamp;
  }

  var WorksPagination = function (data, itemsPerPage) {
    this.data = data;
    this.originalData = data.slice();
    this.itemsPerPage = itemsPerPage || 10;
    this.currentPage = 1;
    this.totalPages = Math.ceil(data.length / this.itemsPerPage);
    this.currentSortMode = sortMode[0];
    this.sort("time");
  };

  WorksPagination.prototype.init = function () {
    this.render();
    this.renderPagination();
  };

  WorksPagination.prototype.getCurrentPageData = function () {
    var start = (this.currentPage - 1) * this.itemsPerPage;
    return this.data.slice(start, start + this.itemsPerPage);
  };

  WorksPagination.prototype.render = function () {
    var worksList = document.getElementById("worksList");
    var pageInfo = document.getElementById("pageInfo");
    if (!worksList || !pageInfo) return;

    var currentData = this.getCurrentPageData();
    var startItem = (this.currentPage - 1) * this.itemsPerPage + 1;
    var endItem = Math.min(this.currentPage * this.itemsPerPage, this.data.length);
    pageInfo.textContent = "显示 " + startItem + "-" + endItem + " 项，共 " + this.data.length + " 项";

    if (currentData.length === 0) {
      worksList.innerHTML = '<div class="no-data">暂无数据</div>';
      return;
    }

    var html = currentData.map(function (work) {
      return (
        '<div class="work-item">' +
          '<div class="work-title">' +
            '<a href="' + (work.url || "") + '" target="_blank">' + (work.title || "") + '</a>' +
          '</div>' +
          '<div class="work-meta">' +
            '<div>' +
              '<span class="author">作者：' + (work.author || "未知") + '</span>' +
              '<span class="time"><br>' + (work.time || "") + '</span>' +
            '</div>' +
            '<div>' +
              '<span class="class-tag">' + (work.class || "未分类") + '</span>' +
              '<span class="hot-tag">' + (work.hot || "") + '</span>' +
            '</div>' +
          '</div>' +
        '</div>'
      );
    }).join("");
    worksList.innerHTML = html;
  };

  WorksPagination.prototype.renderPagination = function () {
    var pagination = document.getElementById("pagination");
    if (!pagination) return;

    if (this.totalPages <= 1) {
      pagination.innerHTML = "";
      return;
    }

    var html = "";
    html += '<button data-page="' + (this.currentPage - 1) + '"' + (this.currentPage === 1 ? " disabled" : "") + ">上一页</button>";

    var startPage = Math.max(1, this.currentPage - 2);
    var endPage = Math.min(this.totalPages, this.currentPage + 2);

    if (startPage > 1) {
      html += '<button data-page="1">1</button>';
      if (startPage > 2) html += "<span>...</span>";
    }

    for (var i = startPage; i <= endPage; i++) {
      html += '<button data-page="' + i + '" class="' + (i === this.currentPage ? "active" : "") + '">' + i + "</button>";
    }

    if (endPage < this.totalPages) {
      if (endPage < this.totalPages - 1) html += "<span>...</span>";
      html += '<button data-page="' + this.totalPages + '">' + this.totalPages + "</button>";
    }

    html += '<button data-page="' + (this.currentPage + 1) + '"' + (this.currentPage === this.totalPages ? " disabled" : "") + ">下一页</button>";

    pagination.innerHTML = html;
  };

  WorksPagination.prototype.sort = function (type) {
    if (!type) return;
    this.currentSortMode = type;

    var self = this;
    if (type === "time") {
      this.data.sort(function (a, b) {
        return parseTimeString(b.time) - parseTimeString(a.time);
      });
    } else if (type === "hot") {
      this.data.sort(function (a, b) {
        var getHotLevel = function (hot) {
          if (!hot) return -1;
          var matches = hot.match(/🔥/g);
          return matches ? matches.length : -1;
        };
        return getHotLevel(b.hot) - getHotLevel(a.hot);
      });
    } else if (type === "author") {
      this.data.sort(function (a, b) {
        return (a.author || "").localeCompare(b.author || "");
      });
    } else if (type === "class") {
      this.data.sort(function (a, b) {
        var classA = (a.class || "").split("-")[0];
        var classB = (b.class || "").split("-")[0];
        return classA.localeCompare(classB);
      });
    }

    this.currentPage = 1;
    this.init();
  };

  WorksPagination.prototype.goToPage = function (page) {
    if (page < 1 || page > this.totalPages || page === this.currentPage) return;
    this.currentPage = page;
    this.render();
    this.renderPagination();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Event delegation
  var currentInstance = null;

  document.addEventListener("click", function (e) {
    // Pagination buttons
    var pageBtn = e.target.closest("[data-page]");
    if (pageBtn && currentInstance) {
      e.preventDefault();
      var page = parseInt(pageBtn.getAttribute("data-page"));
      if (!isNaN(page)) currentInstance.goToPage(page);
      return;
    }

    // Sort toggle button
    var sortBtn = e.target.closest("[data-sort-toggle]");
    if (sortBtn && currentInstance) {
      e.preventDefault();
      var currentIndex = sortMode.indexOf(currentInstance.currentSortMode);
      var nextMode = sortMode[(currentIndex + 1) % sortMode.length];
      sortBtn.textContent = sortModeText[(currentIndex + 1) % sortMode.length];
      currentInstance.sort(nextMode);
    }
  });

  window.SRPNWorksPagination = WorksPagination;
  window.SRPNWorksSortMode = sortMode;
  window.SRPNWorksSortText = sortModeText;
  window.SRPNSetWorksInstance = function (instance) {
    currentInstance = instance;
  };
})();