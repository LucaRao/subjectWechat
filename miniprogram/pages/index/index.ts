import { url } from 'inspector';
import { supabase } from '../../lib/supabase'
let util = require('../../utils/util')
Page({


  /**
   * 组件的初始数据
   */
  data: {
    email: '',
    password: '',
    userInfo: null,
    todaySubjectData: [],
    url:"https://cbr2dbi5g6h4sltf7a8g.baseapi.memfiredb.com/rest/v1/subject_student",

    formatter(day: any) {
      const month = day.date.getMonth() - 1;
      // debugger
      const date = day.date.getDate();

      if (month === 5) {
        if (date === 1) {
          day.topInfo = '劳动节';
        } else if (date === 4) {
          day.topInfo = '五四青年节';
        } else if (date === 11) {
          day.text = '今天';
        }
      }

      if (day.type === 'start') {
        day.bottomInfo = '入住';
      } else if (day.type === 'end') {
        day.bottomInfo = '离店';
      }
      // debugger
      return day;
    },
  },

  onLoad() {
    let url = encodeURIComponent('?select/studentId,subject(id,subjectName,teacherName,adress),school(schoolName),department(departmentName)');
    console.log(url,'111');
    
    

  },
  async onShow() {
    this.analysisUrl(this.data.url)
    this.setData({
      userInfo: wx.getStorageSync('userInfo') ? wx.getStorageSync('userInfo') : null
    });
    await this.getTodaySub()
  },
  //获取学生今天的课表
  async getTodaySub() {
    this.setData({
      todaySubjectData: []
    })
    const date = new Date();
    let nowweekday = new Date().getDay();//今天周几
    let nowWeek = util.getYearWeek(date);//这一周是今年的第几周
    let subjectData = [];
    let studentId = wx.getStorageSync('studentId') ? wx.getStorageSync('studentId') : null;
    const { data, error } = await supabase
      .from('subject_student')
      .select(`
      studentId,
      subject (id,subjectName,teacherName,adress),
      school (schoolName),
      department (departmentName)
    `).eq("studentId", studentId);
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
              // debugger
              if (el.weekDay.indexOf(nowweekday) != -1 && el.weekNum.indexOf(nowWeek) != -1) {
                item.subject_time = data.data
              }
            });
            if (item.subject_time) {
              subjectData.push(item)
            }
          }
          this.setData({
            todaySubjectData: subjectData
          })
          console.log(this.data.todaySubjectData, 'todaySubjectData')
        }
      });

    }

  },
  /**
   * 组件的方法列表
   */
  // methods: {

  bindSubject() {
    wx.navigateTo({
      url: `/pages/searchSubject/index`,
    })
  },
  gologin() {
    wx.navigateTo({
      url: `/pages/login/index`,
    })
  },
  bindInfo() {
    wx.showToast({
      title: "尽请期待",
      icon: 'error',
      duration: 2000
    });
  },
  bindFree() {
    wx.showToast({
      title: "尽请期待",
      icon: 'error',
      duration: 2000
    });
  },
  bindSys() {
    wx.showToast({
      title: "尽请期待",
      icon: 'error',
      duration: 2000
    });
  },

  analysisUrl(url){
    let URL ={
      hash:'',
      host:'',
      hostname:'',
      href:'',
      origin:'',
      password:'',
      pathname:'',
      port:'',
      protocol:'',
      search:'',
      searchParams:{},
      username:''
    }
    let twoLine = parseInt(url.indexOf('//'));
    let com =  parseInt(url.indexOf('com'));
    URL.host = url.substr(twoLine+2,com-5);
    URL.hostname = url.substr(twoLine+2,com-5);
    URL.href = url;
    URL.origin = url.substr(0,com+3);
    URL.pathname = url.substr(com+3);
    URL.protocol = url.substr(0,twoLine);
    return URL
  },
})
