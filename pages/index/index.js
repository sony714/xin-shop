// index.js
// 获取应用实例
const app = getApp()
// const request = require('../../request/index.js')
import {request} from '../../request/index.js'

Page({
  data:{
    swiperList:[],
    data:[1,2,3]
  },
  onLoad(){
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  }
})
