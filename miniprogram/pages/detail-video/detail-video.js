// pages/detail-video/detail-video.ts
import {
    getMVUrl,
    getMVRelated,
    getMVInfo
} from '../../services/vedio'
Page({
    /**
     * 页面的初始数据
     */
    data: {
        id: 0,
        mvUrl: '',
        mvInfo: {},
        relatedVideo: [],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        this.setData({
            id: options.id
        })
        this.fetchMVUrl()
        this.fetchMVInfo()
        this.fetchMVRelated()
    },
    async fetchMVUrl() {
        const res = await getMVUrl(this.data.id)
        this.setData({
            mvUrl: res.data.url
        })
    },
    async fetchMVInfo() {
        const res = await getMVInfo(this.data.id)
        console.log(res.data);
        this.setData({
            mvInfo: res.data
        })
    },
    async fetchMVRelated() {
        const res = await getMVRelated(this.data.id)
        this.setData({
            relatedVideo: res.data
        })
    }
})