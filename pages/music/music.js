const myAduio = wx.createInnerAudioContext()

function timeFilter(val) {
  let minutes = Math.floor(val / 60)
  let seconds = Math.ceil(val - minutes * 60)
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return minutes + ':' + seconds
}
Page({
  data: {
    isPlay: true,
    sliderVal: 0,
    currentTime: '00:00',
    duration: '',
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: 'Right Now'
    })
    myAduio.autoplay = true
    myAduio.loop = true
    myAduio.src = 'http://isure.stream.qqmusic.qq.com/C400004KFEw81z0ysI.m4a?vkey=044C59251A40D1DDEF0AFF95B9F28B0930D2CE8849A4A16562DC45179720FF3E0D3593A25E0B5C3004EA2CD155F90E514D0DC08A00293634&guid=107379363&uin=1071683940&fromtag=66'

    myAduio.onPlay(() => {
      console.log(myAduio.duration)
    })

    myAduio.onTimeUpdate(() => {
      this.musicUpdate()
    })

    myAduio.onEnded(() => {

    })

    myAduio.onError((res) => {
      console.log(res.errMsg)
      console.log(res.errCode)
    })
  },
  musicUpdate() {
    let duration = timeFilter(myAduio.duration)
    let currentTime = timeFilter(myAduio.currentTime)
    let sliderVal = Math.floor(myAduio.currentTime / myAduio.duration * 100)
    this.setData({
      sliderVal: sliderVal,
      currentTime: currentTime,
      duration: duration
    })
  },
  sliderChange: function (e) {
    console.log(myAduio.duration)
    let currentTime = myAduio.duration * e.detail.value / 100
    myAduio.seek(currentTime, () => {
      this.setData({
        sliderVal: e.detail.value,
      })
    })
  },
  playMusic: function () {
    console.log(this)
    let isPlay
    if (this.data.isPlay) {
      myAduio.pause()
      isPlay = false
    } else {
      myAduio.play()
      isPlay = true
    }
    this.setData({
      isPlay: isPlay
    })
  },
  toggleMusic: function (type) {
    console.log(123)
    myAduio.seek(0, () => {
      this.setData({
        sliderVal: 0,
      })
    })
  }
})