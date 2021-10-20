// pages/menu/index.js
import {request} from '../../request/index.js'
Page({
  data: {
    leftMenuList:[],
    rightContent:[],
    currentIndex:0
  },
  onLoad: function (options) {
    //先判断本地存储有没有旧的数据
    const Cates = wx.getStorageSync('cates')
    if(!Cates){
      //不存在，发送请求
      this.getCategories()
    }else{
      //有旧的数据 定义过期事件
      if(Date.now()-Cates.time>1000*10){
        //超过10s重新发送请求
        console.log('重新发送请求')
        this.getCategories()
      }else{
        //用旧数据
        console.log('使用本地数据')
        this.Cates = Cates.data
        let leftMenuList =this.Cates.map(v=>v.cat_name);
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  Cates:[],
  getCategories(){
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
    .then(res=>{
      this.Cates = res.data.message
      //把数据存入本地存储中
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates})
      let leftMenuList =this.Cates.map(v=>v.cat_name);
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  },
  handleTap(e){
    const {index} = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex:index,
      rightContent
    })
  }
})