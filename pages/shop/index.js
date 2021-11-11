// pages/shop/index.js
/* 
 1.获取用户的收货地址
  1.绑定点击事件
  2.调用小程序内置api 获取用户的收获地址 wx.chooseAddress
  
  3.获取用户对小程序所授予获取地址的权限状态 scope
   1.假设用户点击获取收获地址的提示框 确定 authSetting scope.address
   scope的值为true
   2.假设用户点击 获取收获地址的提示框 取消
   scope为 false
   3.从来没有调用过收获地址的api
   scope的值为undefined
*/
Page({
  handleChooseAddress(){
    //1.获取权限状态
    wx.getSetting({
      success: function(result) {
        const scopeAddress = result.authSetting['scope.address'];
        if(scopeAddress == true || scopeAddress === undefined){
          wx.chooseAddress({
            success: (result)=>{
              wx.setStorageSync('address',result)
            },
            fail: ()=>{},
            complete: ()=>{}
          });
        }else{
          wx.openSetting({
            success:(result2)=>{
              wx.chooseAddress({
                success:(result3)=>{
                  console.log(result3)
                }
              })
            }
          })
        }
      }
    })
  },
  handleItemChecked(e){
    const id = e.currentTarget.dataset.id
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id === id)
    cart[index].checked = !cart[index].checked
    this.setCart(cart)
  },
  handleAllItemChecked(){
    let {allChecked,cart} = this.data
    allChecked = !allChecked
    cart.forEach(v=>{
      v.checked = allChecked
    })
    this.setCart(cart)
  },
  handleItemNum(e){
    let {id,operation} = e.currentTarget.dataset
    let {cart} = this.data
    let index = cart.findIndex(v=>v.goods_id == id)
    if(cart[index].num===1 && operation == -1){
      wx.showModal({
        title:'提示',
        content:"是否要删除?",
        success:(res)=>{
          if(res.confirm){
            cart.splice(index,1)
            this.setCart(cart)
          }else{
            return 
          }
        }
      })
    }else{
      cart[index].num +=Number(operation)
      this.setCart(cart)
    }
  },
  handlePay(){
    const {address,totalNum} = this.data
    if(!address.userName){
      wx.showToast({
        title:'你还没有选择收获地址',
        icon:'none'
      })
      return
    }
    if(totalNum === 0){
      wx.showToast({
        title:'您还没有选择商品',
        icon:'none'
      })
      return 
    }
    wx.navigateTo({
      url: '/pages/pay/index'
    })
  },
  setCart(cart){
    let totalNum = 0
    let totalPrice = 0
    let allChecked = true
    cart.forEach(v=>{
      if(v.checked){
        totalNum += v.num
        totalPrice+=v.num*v.goods_price
      }else{
        allChecked = false
      }
    })
    allChecked = cart.length == 0?false:allChecked
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
    wx.setStorageSync('cart', cart)
  },
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalNum:0,
    totalPrice:0
  },
  onShow: function () {
    let address = wx.getStorageSync('address')
    let cart = wx.getStorageSync('cart') || []
    // const allChecked = []?cart.every(v=>v.checked):false
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    this.setData({address})
    this.setCart(cart)
  },
  /**
   * 生命周期函数--监听页面加载
   */
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