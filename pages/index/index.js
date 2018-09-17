//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    items: [{
      src: 'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/335278.jpg?max_age=2592000'
    }, {
      src: 'https://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/331362.jpg?max_age=2592000'
    }],
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

  }
})