// components/menu-area/menu-area.ts
const app = getApp()
Component({
    /**
     * 组件的属性列表
     */
    properties: {
      title: {
        type: String,
        value: "默认歌单"
      },
      menuList: {
        type: Array,
        value: []
      }
    },

    /**
     * 组件的初始数据
     */
    data: {
      screenWidth: 375
    },

    /**
     * 组件的方法列表
     */
    methods: {
      onMenuMoreClick(){
        wx.navigateTo({
          url: '/pages/detail-menu/detail-menu',
        })
      }
    },
    onLoad(){
      console.log(menuList);
    },
    lifetimes:{
      attached(){
        this.setData({screenWidth:app.globalData.screenWidth})
      }
    }
})
