// index.js
// 获取应用实例
const app = getApp()

Page({
  data:{
    swiperList:[],
    data:[1,2,3]
  },
  onLoad(){
    //发送异步请求获取轮播图数据
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (res)=>{
        this.setData({
            swiperList:res.data.message
        })
      }
    })
  }
})
