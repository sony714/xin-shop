// index.js
// 获取应用实例
const app = getApp()
// const request = require('../../request/index.js')
import {request} from '../../request/index.js'

Page({
  data:{
    swiperList:[],
    catesList:[],
    floorList:[]
  },
  onLoad(){
    this.getSwiperList()
    this.getCatesList()
    this.getFloorList()
  },
  getSwiperList(){
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata'})
    .then(res=>{
      this.setData({
        swiperList:res.data.message
      })
    })
  },
  getCatesList(){
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/catitems'})
    .then(res=>{
      this.setData({
        catesList:res.data.message
      })
    })
  },
  getFloorList(){
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/home/floordata'})
    .then(res=>{
      console.log(res)
      this.setData({
        floorList:res.data.message
      })
    })
  }
})
