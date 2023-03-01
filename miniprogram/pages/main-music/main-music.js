// pages/main-music/main-music.ts
import { getMusicBanner, getSongMenuList } from "../../services/music"
import recommendStore from '../../store/recommendStore'
import rankingStore from "../../store/rankingStore"
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

        recommendSongs: [],

        // 歌单数据
        hotMenuList: [],
        recMenuList: [],

        // 巅峰榜数据
      isRankingData: false,
      rankingInfos: {},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
        this.fetchMusicBanner()
        this.fetchSongMenuList()
        // this.fetchPlaylistDetail()
        // 发起action
        recommendStore.onState('recommendSongInfo',this.handleRecommendSongs)
        recommendStore.dispatch('fetchRecommendSongsAction')

        rankingStore.onState("newRanking", this.handleNewRanking)
        rankingStore.onState("originRanking", this.handleOriginRanking)
        rankingStore.onState("upRanking", this.handleUpRanking)
        rankingStore.dispatch("fetchRankingDataAction")
    },
   async fetchMusicBanner(){
        const res = await getMusicBanner()
        this.setData({ banners: res.banners })
    },
    async fetchSongMenuList(){
      getSongMenuList().then(res => {
        console.log(res);
        this.setData({ hotMenuList: res.playlists })
      })
      getSongMenuList("华语").then(res => {
        this.setData({ recMenuList: res.playlists })
      })
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

      onRecommendMoreClick(){
          wx.navigateTo({
            url: '/pages/detail-song/detail-song?type=recommend',
          })
      },

      // 从store种获取数据
      handleRecommendSongs(value){
        if (!value.tracks) return
        this.setData({ recommendSongs: value.tracks.slice(0, 6) })
      },
      handleNewRanking(value) {
        // console.log("新歌榜:", value);
        if (!value.name) return
        this.setData({ isRankingData: true })
        const newRankingInfos = { ...this.data.rankingInfos, newRanking: value }
        this.setData({ rankingInfos: newRankingInfos })
      },
      handleOriginRanking(value) {
        // console.log("原创榜:", value);
        if (!value.name) return
        this.setData({ isRankingData: true })
        const newRankingInfos = { ...this.data.rankingInfos, originRanking: value }
        this.setData({ rankingInfos: newRankingInfos })
      },
      handleUpRanking(value) {
        // console.log("飙升榜:", value);
        if (!value.name) return
        this.setData({ isRankingData: true })
        const newRankingInfos = { ...this.data.rankingInfos, upRanking: value }
        this.setData({ rankingInfos: newRankingInfos })
      },

      onUnload() {
        recommendStore.offState("recommendSongs", this.handleRecommendSongs)
        rankingStore.offState("newRanking", this.handleNewRanking)
        rankingStore.offState("originRanking", this.handleOriginRanking)
        rankingStore.offState("upRanking", this.handleUpRanking)
    
        // playerStore.offStates(["currentSong", "isPlaying"], this.getPlayerInfos)
      }
})