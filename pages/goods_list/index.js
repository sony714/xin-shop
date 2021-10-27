// pages/goods_list/index.js
import {request} from '../../request/index.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
        id:0,
        value:'商品列表',
        isActive:true
      },
      {
        id:1,
        value:'商品详情',
        isActive:false
      },
      {
        id:2,
        value:'商品搜索',
        isActive:false
      }
    ],
    goodsList:[]
  },
   //接口要的参数
   QueryParam:{
     query:'',
     cid:'',
     pagenum:'',
     pagesize:10
   },
   totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  tabsItemChange(e){
    const {index} = e.detail
    let {tab} = this.data;
    tab.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false)
    this.setData({
      tab
    })
  },
  
  onLoad: function (options) {
    this.QueryParam.cid = options.cid
    this.getGoodList()
  },
  getGoodList(){
    request({url:'/goods/search',data:this.QueryParam}).then(res=>{
      const total = res.data.message.total;
      this.totalPages = Math.ceil(total/this.QueryParam.pagesize);
      this.setData({
        goodsList:[...this.data.goodsList,...res.data.message.goods]
      })
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if(this.QueryParam.pagenum>=this.totalPages){
      wx.showToast({
        title: '没数据啦!!'
      });
    }else{
       this.QueryParam.pagenum++;
       this.getGoodList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})