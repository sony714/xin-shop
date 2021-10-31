// pages/goods_detail/index.js
import {request} from '../../request/index.js'
Page({
  data: {
    goodsDetail:{}
  },
  //商品对象
  GoodInfo:{

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const {goods_id} = options
    this.getGoodsDetail(goods_id)
  },

  getGoodsDetail(goods_id){
    request({url:'/goods/detail',data:{goods_id}}).then(res=>{
      this.GoodInfo = res.data.message
      this.setData({
        goodsDetail:{
          goods_price:res.data.message.goods_price,
          goods_name:res.data.message.goods_name,
          goods_introduce:res.data.message.goods_introduce.replace('/\.webp/g','.jpg'),
          pics:res.data.message.pics
        }
      })
    })
  },
  handleImagePreview(e){
    // 1.先构造要预览的数组
   const urls = this.GoodInfo.pics.map(v=>v.pics_mid)
  //  2.接受传递过来的url
  const current = e.currentTarget.dataset.url
    wx.previewImage({
      current,
      urls
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})