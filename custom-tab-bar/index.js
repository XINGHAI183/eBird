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
      wx.setNavigationBarTitle({
        title: title
      });
      wx.setNavigationBarColor({
        frontColor: '#000000',
        backgroundColor: '#FFFFFF',
        animation: {
          duration: 0,
          timingFunc: 'linear'
        }
      });
    }
  },
  attached() {
    // 组件挂载时确保导航栏配置
    this.updateNavigationBar();
  }
});