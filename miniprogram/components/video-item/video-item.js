// components/video-item/video-item.ts
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        itemData:{
            type:Object,
            value:{},
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
        onItemTap(){
            const item = this.properties.itemData
            wx.navigateTo({
              url: `/pages/detail-video/detail-video?id=${item.id}`,
            })
        }
    }
})
