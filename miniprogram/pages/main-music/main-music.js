// pages/main-music/main-music.ts
import { getMusicBanner, getSongMenuList } from "../../services/music"
import querySelect from "../../utils/query-select"
import throttle from '../../utils/throttle'
const querySelectThrottle = throttle(querySelect,100)
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue: "",
        banners: [],
        bannerHeight: 0,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.fetchMusicBanner()
    },
   async fetchMusicBanner(){
        const res = await getMusicBanner()
        this.setData({ banners: res.banners })
    },
    onSearchClick() {
        wx.navigateTo({url: '/pages/detail-search/detail-search'})
      },
    //   不节流的话该方法会执行8次
    onBannerImageLoad(event) {
        querySelectThrottle(".banner-image").then(res => {
          this.setData({ bannerHeight: res[0].height })
        })
      },
})