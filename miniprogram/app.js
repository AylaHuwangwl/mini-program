
// app.ts
App({
  globalData: {
    screenWidth: 375,
  },
  onLaunch() {
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.screenWidth = res.screenWidth
      },
    })
  },
})