// import { createClient } from './memfireSupabase/supabase-js/src/index'
// const url = "https://cbr2dbi5g6h4sltf7a8g.baseapi.memfiredb.com"
// const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImV4cCI6MzE5ODIxODk3NCwiaWF0IjoxNjYwMjk4OTc0LCJpc3MiOiJzdXBhYmFzZSJ9.N-8p-MyODWQjYd3-yGhngZDJusJpV7sBQZ-sEIHmzPw"

// export const supabase = createClient(url, key)




App<IAppOption>({
  globalData: {},
  async onLaunch() {
    // const { error,status,data } = await supabase.auth.signIn({ email: 'lucarao@163.com',password:'123456' });
      // debugger
      // if (error && status !== 406) {
      //   throw error
      // }
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})