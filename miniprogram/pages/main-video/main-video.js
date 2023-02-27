// pages/main-video/main-video.ts
import { getTopMV } from '../../services/vedio'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        vedioList:[],
        offset:0,
        hasMore:true,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.fetchTopMv()
    },
    //methods
   async fetchTopMv(){
        const res = await getTopMV(this.data.offset)
        const newVedioList = [...this.data.vedioList,...res.data]
        this.setData({vedioList:newVedioList})
        this.data.offset = this.data.vedioList.length
        this.data.hasMore = res.hasMore
    },
    // 上拉记载更多功能
    onReachBottom(){
        // console.log('到底了');
        if(!this.data.hasMore) return;
        this.fetchTopMv()
    },
    // 下拉刷新功能
    async onPullDownRefresh() {
        this.setData({ vedioList: [] })
        this.data.offset = 0
        this.data.hasMore = true
        await this.fetchTopMv()
        wx.stopPullDownRefresh()
      },
})