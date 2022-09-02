import { supabase } from "../../lib/supabase";
// pages/login/index.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    email: null,
    password: null,
    studentId: null,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },
  getEmailValue(v: any) {
    this.setData({
      email: v.detail
    })
  },
  getPasswordValue(v: any) {
    this.setData({
      password: v.detail
    })
  },
  getStudentIdValue(v: any) {
    this.setData({
      studentId: v.detail
    })
  },
  async findTodaySubject(v) {
    if (!this.data.email) {
      wx.showToast({
        title: '请输入邮箱',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    if (!this.data.password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    if (!this.data.studentId) {
      wx.showToast({
        title: '请输入学号',
        icon: 'none',
        duration: 3000
      });
      return;
    }
    try {
      wx.showLoading({
        title: '加载中',
      });
      if (v.currentTarget.dataset.type == 'signIn') {
        const { data, error } = await supabase.auth.signIn({ email: this.data.email, password: this.data.password });
        if (error) {
          wx.showToast({
            title: error.data.error_description  || error.data.msg,
            icon: 'none',
            duration: 3000
          });
          wx.hideLoading();
          return;
        }
        if (data.data) {
          this.setData({
            userInfo: data.data
          })
          // wx.setStorageSync('userInfo', this.data.userInfo)
        }

      } else if (v.currentTarget.dataset.type == 'signUp') {
        const { data, error } = await supabase.auth.signUp({ email: this.data.email, password: this.data.password });
        if (error) {
          wx.showToast({
            title: error.data.msg || '',
            icon: 'none',
            duration: 3000
          });
          wx.hideLoading();
          return;
        }
        if (data) {
          this.setData({
            userInfo: data.data
          })
          
        }
      }
      if (this.data.userInfo) {
        const updates = {
          id: this.data.userInfo.user.id,
          // id: this.data.userInfo.id,
          // id: 'a40ce295-79d7-4af5-83fe-1d6b427b6d8b',
          updated_at: new Date(),
          studentId: this.data.studentId
        }
        if (v.currentTarget.dataset.type == 'signIn') {
          let { data ,error} = await supabase.from('student').select('*').eq("id", updates.id).eq("studentId", updates.studentId).single();
          console.log(data,'data')
          if(error && error.statusCode == 406){
            wx.showToast({
              title: '请输入正确的学号',
              icon: 'none',
              duration: 3000
            });
            wx.hideLoading();
            return
          }
          if (data.data) {
            wx.showToast({
              title: '登录成功',
              icon: 'success',
              duration: 3000
            });
            wx.switchTab({
              url:'/pages/index/index'
            })
            wx.setStorageSync('userInfo', this.data.userInfo)
            wx.setStorageSync('studentId', this.data.studentId)
          }
          wx.hideLoading();
        } else if (v.currentTarget.dataset.type == 'signUp') {
          let { data } = await supabase.from('student').select('*').eq("id", updates.id).eq("studentId", updates.studentId).single();
          if (data) {
            wx.showToast({
              title: '学号已存在',
              icon: 'success',
              duration: 3000
            });
          } else {
            let { error } = await supabase.from("student").upsert(updates, {
              returning: "minimal", // Don't return the value after inserting
            })
            if (error.statusCode !=201) {
              wx.showToast({
                title: error.data.msg || '',
                icon: 'none',
                duration: 3000
              });
            } else {

              wx.showToast({
                title: '登录成功',
                icon: 'success',
                duration: 3000
              });
              wx.setStorageSync('userInfo', this.data.userInfo)
              wx.setStorageSync('studentId', this.data.studentId);
              wx.switchTab({
                url:'/pages/index/index'
              })

            }
          }
          wx.hideLoading();
        }
        if (error) {
          wx.showToast({
            title: error.data.msg || '',
            icon: 'none',
            duration: 3000
          });
          wx.hideLoading();
          return;
        }
        wx.showToast({
          title: '登录成功',
          icon: 'none',
          duration: 3000
        });
        wx.navigateTo({
          url: `/pages/index/index`,
        })
      }
      wx.hideLoading();

    } catch (error) {
    } finally {

    }
  }







})