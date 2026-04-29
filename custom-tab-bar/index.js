Component({
  data: {
    selected: 0,
    color: '#555555',
    selectedColor: '#4A4E63',
    list: [
      {
        pagePath: '/pages/home/home',
        text: '首页'
      },
      {
        pagePath: '/pages/swift/swift',
        text: '雨燕'
      },
      {
        pagePath: '/pages/architecture/architecture',
        text: '古建'
      },
      {
        pagePath: '/pages/profile/profile',
        text: '我的'
      }
    ]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset;
      const url = data.path;
      wx.switchTab({ url });
    },
    updateNavigationBar(title = 'eBird') {
      // 获取系统主题信息
      const systemInfo = wx.getSystemInfoSync();
      const isDarkMode = systemInfo.theme === 'dark';
      
      wx.setNavigationBarTitle({
        title: title
      });
      
      // 根据主题设置导航栏颜色
      wx.setNavigationBarColor({
        frontColor: isDarkMode ? '#ffffff' : '#000000',
        backgroundColor: isDarkMode ? '#000000' : '#FFFFFF',  // 深色模式下使用纯黑
        animation: {
          duration: 300,  // 增加动画时间，让主题切换更平滑
          timingFunc: 'easeInOut'
        }
      });
    }
  },
  attached() {
    // 组件挂载时确保导航栏配置
    this.updateNavigationBar();
  }
});