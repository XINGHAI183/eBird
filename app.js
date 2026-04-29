App({
  onLaunch() {
    console.log('App Launch')
    
    // 监听主题变化
    if (wx.onThemeChange) {
      wx.onThemeChange((res) => {
        // 检查用户是否设置了特定主题（非auto）
        const userTheme = wx.getStorageSync('userTheme') || 'auto';
        if (userTheme !== 'auto') {
          // 如果用户设置了特定主题，不响应系统主题变化
          return;
        }
        
        console.log('系统主题变化:', res.theme)
        
        // 获取当前页面栈
        const pages = getCurrentPages();
        if (pages.length > 0) {
          const currentPage = pages[pages.length - 1];
          
          // 确保自定义TabBar的导航栏先更新
          if (typeof currentPage.getTabBar === 'function' && currentPage.getTabBar()) {
            currentPage.getTabBar().updateNavigationBar();
          }
          
          // 如果页面有 reload 方法，则调用（需要在每个页面中实现）
          if (currentPage.reload) {
            currentPage.reload();
          } else {
            // 否则重新设置数据触发刷新
            if (currentPage.setData) {
              currentPage.setData({
                isLoading: true
              });
              
              // 等待主题系统完成切换后再隐藏加载动画
              setTimeout(() => {
                currentPage.setData({
                  isLoading: false
                });
              }, 800); // 增加延时以确保主题切换完成
            }
          }
        }
      })
    }
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  globalData: {
    userInfo: null
  }
})
