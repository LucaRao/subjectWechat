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

    console.log(this.parseURL("https://blog.csdn.net/weixin_33716941/article/details/92622697"),'urllll')


  },
  loginout() {
    wx.removeStorageSync('userInfo');
    wx.removeStorageSync('studentId');
  },
  onloadImg() {
    const _this = this;
    wx.chooseMedia({
      count: 1,
      sizeType: ["original", "compressed"],
      sourceType: ["album", "camera"],
      async success(res) {
        // debugger

        const file = res.tempFiles[0].tempFilePath
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
   parseURL(url) {
    return {
        source: url,
        protocol: a.protocol.replace(':',''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        params: (function(){
            var ret = {},
              seg = a.search.replace(/^\?/,'').split('&'),
              len = seg.length, i = 0, s;
            for (;i<len;i++) {
                if (!seg[i]) { continue; }
                s = seg[i].split('=');
                ret[s[0]] = s[1];
            }
            return ret;
        })(),
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
        hash: a.hash.replace('#',''),
        path: a.pathname.replace(/^([^\/])/,'/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
        segments: a.pathname.replace(/^\//,'').split('/')
    };
   }
})
