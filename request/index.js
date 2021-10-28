//同时发送异步代码次数
let ajaxTimes = 0
export const request = (params)=>{
    ajaxTimes++
    //显示加载中效果
    wx.showLoading({
        title:'加载中',
        mask: true
    })
    const BaseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve,reject)=>{
       wx.request({
          ...params,
          url:BaseUrl+params.url,
          success:(res)=>{
              resolve(res)
          },
          fail:()=>{
              reject(err)
          },
          complete:()=>{
               //关闭图标 
              ajaxTimes--;
              console.log(ajaxTimes)
              if(ajaxTimes==0){
                wx.hideLoading();
              }
          }
       })
    })
}