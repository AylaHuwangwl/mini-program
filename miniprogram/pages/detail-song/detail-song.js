// pages/detail-song/detail-song.ts
import rankingStore from '../../store/rankingStore'
import recommendStore from '../../store/recommendStore'
import { getPlaylistDetail } from '../../services/music'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        type:'ranking',
        key:'newRanking',
        id:'',

        songInfo:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(option) {
        this.setData({type:option.type})
        if (option.type === "ranking") {
            const key = option.key
            this.data.key = key
            rankingStore.onState(key, this.handleRanking)
          }else if(option.type === 'recommend'){
            recommendStore.onState("recommendSongInfo",this.handleRanking)
          }else if (option.type === "menu") {
              console.log(option.id);
            const id = option.id
            this.data.id = id
            this.fetchMenuSongInfo()
          }
    },
    onUnload(){
        if (this.data.type === "ranking") {
            rankingStore.offState(this.data.key, this.handleRanking)
          } else if (this.data.type === "recommend") {
            recommendStore.offState("recommendSongInfo", this.handleRanking)
          }
    },
  async  fetchMenuSongInfo(){
    const res = await getPlaylistDetail(this.data.id)
    console.log(res);
    this.setData({ songInfo: res.playlist })
    },
    handleRanking(value){
        if (this.data.type === "recommend") {
          value.name = "推荐歌曲"
        }
        this.setData({songInfo:value})
        wx.setNavigationBarTitle({
          title: value.name,
        })
    }
})