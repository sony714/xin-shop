// pages/menu/index.js
import {request} from '../../request/index.js'
Page({
  data: {
    leftMenuList:[],
    rightContent:[]
  },
  onLoad: function (options) {
    this.getCategories()
  },
  Cates:[],
  getCategories(){
    request({url:'https://api-hmugo-web.itheima.net/api/public/v1/categories'})
    .then(res=>{
      console.log(res)
      this.Cates = res.data.message
      let leftMenuList =this.Cates.map(v=>v.cat_name);
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })
  }
})