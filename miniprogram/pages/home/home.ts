// logs.ts
// const util = require('../../utils/util.js')
import { timeStamp } from 'console';
import { supabase } from '../../lib/supabase'

Page({
  data: {
    userInfo: null,
    avatar: null
  },
  onLoad() {
    this.setData({
      userInfo: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : null
    });



  },
  loginout() {
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('studentId');
    wx.showToast({
      title: '清除缓存成功！',
      icon: 'none',
      duration: 3000
    });
  },
  async onloadImg() {
    const _this = this;
    wx.chooseMedia({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      async success(res) {
        const file = res.tempFiles[0]
        const fileExt = res.tempFiles[0].tempFilePath.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${fileName}`
        let  avatar = 'userInfo.user.avatar'
        _this.setData({
          avatar: res.tempFiles[0].tempFilePath,
          [avatar]:res.tempFiles[0].tempFilePath
        });
        wx.setStorageSync("userInfo",_this.data.userInfo)
        let { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, file)
          
        if (uploadError) {
          throw uploadError
        }
      },
    });
  },
 
})
