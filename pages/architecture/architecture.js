Page({
  data: {
    isLoading: true,
    hasLoaded: false
  },
  onLoad() {
    // 如果是首次加载，显示加载动画
    if (!this.data.hasLoaded) {
      setTimeout(() => {
        this.setData({
          isLoading: false,
          hasLoaded: true
        });
      }, 800); // 模拟加载过程，实际项目中可以替换成真实的数据加载逻辑
    } else {
      this.setData({
        isLoading: false
      });
    }
  },
  onShow() {
    // 只有在未加载过的情况下，再次进入页面才显示加载动画
    if (!this.data.hasLoaded) {
      this.setData({
        isLoading: true
      });
      setTimeout(() => {
        this.setData({
          isLoading: false,
          hasLoaded: true
        });
      }, 800);
    }
    
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({
        selected: 2
      });
      this.getTabBar().updateNavigationBar();
    }
  },
  onTabItemTap() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().updateNavigationBar();
    }
  },
  reload() {
    // 重新设置导航栏以响应主题变化
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().updateNavigationBar();
    }
    
    // 重新应用页面数据以确保样式正确更新
    this.setData({
      isLoading: true
    });
    
    // 延迟一段时间以确保主题切换系统完成
    const that = this;
    setTimeout(() => {
      // 重新设置当前页面数据以触发视图更新，确保CSS主题生效
      that.setData({
        ...that.data,
        isLoading: false
      });
    }, 600); // 稍长的延时以确保主题切换完成
  }
})
