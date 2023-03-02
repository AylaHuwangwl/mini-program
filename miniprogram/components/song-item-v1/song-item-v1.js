// components/song-item-v1/song-item-v.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemData:{
            type:Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
       
    },

    /**
     * 组件的方法列表
     */
    methods: {
        onSongItemTap(){
            const id = this.properties.itemData.id
            console.log(id);
            wx.navigateTo({
              url: `/pages/music-player/music-player?id=${id}`,
            })
        }
    }
})
