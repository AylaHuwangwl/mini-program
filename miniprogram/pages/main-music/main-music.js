// pages/main-music/main-music.ts
import { getMusicBanner, getSongMenuList } from "../../services/music"
import querySelect from "../../utils/query-select"
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
    onBannerImageLoad(event) {
        querySelect(".banner-image").then(res => {
          this.setData({ bannerHeight: res[0].height })
        })
      },
})