
// app.ts
App({
  globalData: {
    screenWidth: 375,
    statusBarHeight:20,
    windowHeight: 555
  },
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
          console.log(res);
        this.globalData.screenWidth = res.screenWidth
        this.globalData.statusBarHeight = res.statusBarHeight
        this.globalData.windowHeight = res.screenHeight - res.statusBarHeight - 44
      },
    })
  },
})