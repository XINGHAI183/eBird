Page({
  data: {
    isLoading: true,
    hasLoaded: false,
    themes: [
      { name: '跟随系统', value: 'auto', checked: true },
      { name: '浅色模式', value: 'light', checked: false },
      { name: '深色模式', value: 'dark', checked: false }
    ],
    currentTheme: 'auto' // 默认跟随系统
  },

  onLoad() {
    // 初始化主题设置
    this.initThemeSetting();
    
    // 如果是首次加载，显示加载动画
    if (!this.data.hasLoaded) {
      setTimeout(() => {
        this.setData({
          isLoading: false,
          hasLoaded: true
        });
      }, 800);
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
        selected: 3
      });
      this.getTabBar().updateNavigationBar();
    }
  },

  onTabItemTap() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().updateNavigationBar();
    }
  },

  initThemeSetting() {
    // 获取当前主题设置
    const savedTheme = wx.getStorageSync('userTheme') || 'auto';
    this.setData({
      currentTheme: savedTheme
    });
    
    // 更新单选按钮的状态
    const updatedThemes = this.data.themes.map(theme => ({
      ...theme,
      checked: theme.value === savedTheme
    }));
    
    this.setData({
      themes: updatedThemes
    });
  },

  onThemeChange(e) {
    const selectedValue = e.detail.value;
    
    // 更新单选按钮状态
    const updatedThemes = this.data.themes.map(theme => ({
      ...theme,
      checked: theme.value === selectedValue
    }));
    
    this.setData({
      themes: updatedThemes,
      currentTheme: selectedValue
    });
    
    // 保存用户选择的主题设置
    wx.setStorageSync('userTheme', selectedValue);
    
    // 提示用户重启应用以应用新主题
    wx.showModal({
      title: '提示',
      content: '主题将在下次启动应用时生效，是否立即重启？',
      confirmText: '立即重启',
      cancelText: '稍后重启',
      success: (res) => {
        if (res.confirm) {
          // 重启应用
          wx.reLaunch({
            url: '/pages/home/home'
          });
        }
      }
    });
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