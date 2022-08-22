import { supabase } from '../../lib/supabase'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    schoolData: [],
    departmentData: [],
    schoolId: null,
    departmentId: null,
    studentId:null,
    schoolIndex:null,
    departmentIndex:null
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
    this.getSchool();
    this.getDepartment();
  },


  async getSchool() {
    const { data, error } = await supabase.from('school').select();
    if (error) {
      wx.showToast({
        title: error.data.message,
        icon: 'error',
        duration: 2000
      });
    } else if (data) {
      this.setData({
        schoolData: data.data
      })
    }
  },
  async getDepartment() {
    const { data, error } = await supabase.from('department').select();
    if (error) {
      wx.showToast({
        title: error.data.message,
        icon: 'error',
        duration: 2000
      });
    } else if (data) {
      this.setData({
        departmentData: data.data
      })
      console.log(this.data.departmentData)
    }
  },
  bindSchoolChange(e) {
    this.setData({
      schoolIndex:parseInt(e.detail.value),
      schoolId: this.data.schoolData[parseInt(e.detail.value)].id
    })
  },
  bindDepartmentChange(e) {
    this.setData({
      departmentIndex:parseInt(e.detail.value),
      departmentId: this.data.departmentData[parseInt(e.detail.value)].id
    })
  },
  onstudentIdChange(e){
    this.setData({
      studentId:e.detail
    })
  },
  findTodaySubject() {
    wx.navigateTo({
      url: `/pages/subject/index?studentId=${this.data.studentId}&schoolId=${this.data.schoolId}&departmentId=${this.data.departmentId}`,
    })
  },






})