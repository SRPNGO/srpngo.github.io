(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav');
    const mainMenu = document.getElementById('main-menu');
    const moreBtn = document.getElementById('more-btn');
    const moreDropdown = document.getElementById('more-dropdown');
    const logo = document.getElementById('SRPN-logo');
    
    // 保存原始菜单项顺序
    const originalLinks = Array.from(mainMenu.querySelectorAll('a'));
    
    // 初始化和更新响应式导航
    function updateNav() {
      // 获取导航栏总宽度
      const navWidth = nav.offsetWidth;
      
      // 获取logo宽度（包括padding等）
      const logoWidth = logo ? logo.offsetWidth : 0;
      
      // 获取"更多"按钮宽度
      const moreBtnWidth = moreBtn.offsetWidth || 60;
      
      // 将所有链接移回主菜单
      while (moreDropdown.firstChild) {
        mainMenu.appendChild(moreDropdown.firstChild);
      }
      
      // 按原始顺序重新排列主菜单中的链接
      originalLinks.forEach(link => {
        if (link.parentElement === mainMenu) {
          mainMenu.appendChild(link);
        }
      });
      
      // 计算可用的菜单项宽度
      const availableWidth = navWidth - logoWidth - moreBtnWidth;
      
      // 测量并移动超出宽度的菜单项（从左到右遍历）
      let currentWidth = 0;
      const linksInMenu = Array.from(mainMenu.querySelectorAll('a'));
      const toMove = [];
      
      for (let i = 0; i < linksInMenu.length; i++) {
        const link = linksInMenu[i];
        const linkWidth = link.offsetWidth;
        
        if (currentWidth + linkWidth > availableWidth) {
          toMove.push(link);
        } else {
          currentWidth += linkWidth;
        }
      }
      
      // 将超出的项移动到下拉菜单（保持顺序）
      toMove.forEach(link => {
        moreDropdown.appendChild(link);
      });
      
      // 根据下拉菜单是否有内容显示/隐藏"更多"按钮
      if (moreDropdown.children.length > 0) {
        moreBtn.style.display = 'inline-block';
      } else {
        moreBtn.style.display = 'none';
        moreDropdown.classList.remove('show');
      }
    }
    
    // 初始化
    updateNav();
    
    // 使用ResizeObserver监听导航栏宽度变化
    const resizeObserver = new ResizeObserver(updateNav);
    resizeObserver.observe(nav);
    
    // 监听窗口resize作为后备
    window.addEventListener('resize', updateNav);
    
    // 切换下拉菜单显示/隐藏
    moreBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      moreDropdown.classList.toggle('show');
    });
    
    // 点击页面其他地方关闭下拉菜单
    document.addEventListener('click', function(e) {
      if (!moreBtn.contains(e.target) && !moreDropdown.contains(e.target)) {
        moreDropdown.classList.remove('show');
      }
    });
    
    // 阻止下拉菜单内的点击事件冒泡
    moreDropdown.addEventListener('click', function(e) {
      e.stopPropagation();
    });
  });
})();