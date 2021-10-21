export const request = (params)=>{
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
          }
       })
    })
}