let util = require('../../utils/util')
import { supabase } from '../../lib/supabase'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    weekdays: [{ key: 1, name: '周一' }, { key: 2, name: '周二' }, { key: 3, name: '周三' }, { key: 4, name: '周四' }, { key: 5, name: '周五' }, { key: 6, name: '周六' }, { key: 7, name: '周日' }],
    studentId: null,
    schoolId: null,
    departmentId: null,
    nowweekday: null,
    todysubjectData:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(option: any) {
    this.setData({
      studentId: option.studentId,
      schoolId: option.schoolId,
      departmentId: option.departmentId,
    })
    this.setData({
      active:parseInt(new Date().getDay())-1,
      nowweekday:new Date().getDay()
    })
    this.getTodaySubject(this.data.nowweekday)
    const date = new Date();
    let nowWeek = util.getYearWeek(date);//这一周是今年的第几周
    wx.setNavigationBarTitle({
      title: `第 ${nowWeek} 周`
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },




  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  onChange(e) {
    let key = parseInt(e.detail.index) + 1
    this.getTodaySubject(key)
  },
  async getTodaySubject(weekDay:any) {
    const date = new Date();
    let nowWeek = util.getYearWeek(date);//这一周是今年的第几周
    let subjectData = [];
    let todysubjectData = [];
    const { data, error } = await supabase
      .from('subject_student')
      .select(`
      studentId,
      subject (id,subjectName,teacherName,adress),
      school (schoolName),
      department (departmentName)
    `).eq("studentId", this.data.studentId).eq("schoolId", this.data.schoolId).eq("departmentId", this.data.departmentId);
    if (error) {
      wx.showToast({
        title: error.data.message,
        icon: 'error',
        duration: 2000
      });
    } else {
      data.data.forEach(async (item, index) => {
        if (item.subject && item.subject.id) {
          const { data, error } = await supabase
            .from('subject_time')
            .select(`
          weekNum,time,weekDay
        `).eq("subjectId", item.subject.id).order('time');
          if (error) {
            wx.showToast({
              title: error.data.message,
              icon: 'error',
              duration: 2000
            });
          } else {
            data.data.forEach(el => {
              el.time = JSON.parse(el.time);
              el.weekDay = JSON.parse(el.weekDay);
              el.weekNum = JSON.parse(el.weekNum);
              if (el.weekNum.indexOf(nowWeek) != -1) {
                item.subject_time = data.data
              }
            });
            if (item.subject_time) {
              subjectData.push(item)
            }
            if (subjectData.length >  0) {
              subjectData.forEach((item,index) =>{
                if(item.subject_time[0].weekDay.indexOf(weekDay) != -1){
                  todysubjectData.push(item)
                }
                todysubjectData = this.unique(todysubjectData)
                this.setData({todysubjectData:todysubjectData})
              })
            }
            
            console.log(todysubjectData, 'todysubjectData')
          }
        }
      });

    }
  },
   unique (arr:any) {
    return Array.from(new Set(arr))
  }
})