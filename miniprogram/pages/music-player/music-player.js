// pages/music-player/music-player.ts
import { getSongDetail,getSongLyric } from '../../services/player'
import { parseLyric } from "../../utils/parse-lyric"
import {throttle} from 'underscore'
const app = getApp()
// 创建音乐播放器
const audioContext = wx.createInnerAudioContext()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        pageTitles:['歌曲','歌词'],
        currentPage:0,
        contentHeight:555,

        id:'',
        lyricInfos:[],
        currentSong:{},
        currentTime: 0,
        durationTime: 0,
        sliderValue:0,
        isSliderChanging:false,
        isplaying:true,
        currentLyricText:'',
        currentLyricIndex:-1,
    },
    
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const id = options.id
        this.setData({id,contentHeight: app.globalData.windowHeight})
        this.fetchSongDetails()
        this.fetchSongLyric()
        this.setupAudioPlayer()
        const throttleProgress = throttle(this.updateProgress,1000,{leading:false,trailing:false})
        // 监听播放进度
        audioContext.onTimeUpdate(()=>{
          if(!this.data.isSliderChanging){
            throttleProgress()
          }
          // 匹配歌词
          if (!this.data.lyricInfos.length) return
           let index = this.data.lyricInfos.length - 1
           for (let i = 0; i < this.data.lyricInfos.length; i++) {
           const lyricItem = this.data.lyricInfos[i]
           if (lyricItem.time >= this.data.currentTime) {
             index = i - 1
              break
            }
          }
         if (index === this.data.currentLyricIndex) return
           this.setData({ currentLyricIndex: index, currentLyricText: this.data.lyricInfos[index].text })
        this.setData({ lyricScrollTop: index* 35 })
      })
        audioContext.onWaiting(()=>{
          audioContext.pause()
        })
        audioContext.onCanplay(()=>{
          audioContext.play()
        })
    },
    updateProgress(){
      const currentTime = audioContext.currentTime*1000
      this.setData({currentTime})
      const sliderValue = this.data.currentTime / this.data.durationTime *100
      this.setData({sliderValue})
    },
    // 歌曲播放
    setupAudioPlayer(){
      const id = this.data.id
      audioContext.src=`https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true
      // 请求歌曲时间
    },
    

    async fetchSongDetails(){
        const res = await getSongDetail(this.data.id)
        this.setData({currentSong:res.songs[0],durationTime:res.songs[0].dt})
    },
    async fetchSongLyric(){
      const res = await getSongLyric(this.data.id)
      const lyricInfos = parseLyric(res.lrc.lyric)
      this.setData({lyricInfos})
  },
  // 监听滑块(点击)
  onSlideChange(event){
    const value = event.detail.value
    const currentTime = value/100*this.data.durationTime
    audioContext.seek(currentTime/1000)
    this.setData({currentTime,isSliderChanging:false})
    audioContext.play()
  },
  // 滑动
  onSlideChanging(event){
    const value = event.detail.value
    const currentTime = value/100*this.data.durationTime
    this.setData({currentTime,isSliderChanging:true,sliderValue:value})
  },
  //  轮播图切换
  onSwiperChange(event){
    // console.log(event);
    this.setData({currentPage:event.detail.current})
  },
// 暂停/播放
  onPlayOrPauseTap(){
    if(audioContext.paused){
      audioContext.play()
      this.setData({isplaying:true})
    }else{
      audioContext.pause()
      this.setData({isplaying:false})
    }
  },
})