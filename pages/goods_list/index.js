// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tab:[
      {
        id:0,
        value:'1',
        isActive:true
      },
      {
        id:1,
        value:'2',
        isActive:false
      },
      {
        id:2,
        value:'3',
        isActive:false
      },
    ]
  },

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})