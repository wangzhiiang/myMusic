const myAduio = wx.createInnerAudioContext();

function timeFilter(val) {
  let minutes = Math.floor(val / 60);
  let seconds = Math.ceil(val - minutes * 60);
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  return minutes + ':' + seconds;
}
Page({
  data: {
    isPlay: true,
    sliderVal: 0,
    currentTime: '00:00',
    duration: ''
  },
  onReady: function() {
    wx.setNavigationBarTitle({
      title: 'Right Now'
    });
    myAduio.autoplay = true;
    myAduio.loop = true;
    myAduio.src =
      'https://6d75-music-69c2fc-1257474226.tcb.qcloud.la/C400004KFEw81z0ysI.m4a?sign=31c4f09e8e9692a1b80b5d14306a52a7&t=1566983134';

    myAduio.onPlay(() => {
      console.log(myAduio.duration);
    });

    myAduio.onTimeUpdate(() => {
      this.musicUpdate();
    });

    myAduio.onEnded(() => {});

    myAduio.onError(res => {
      console.log(res.errMsg);
      console.log(res.errCode);
    });
  },
  musicUpdate() {
    let duration = timeFilter(myAduio.duration);
    let currentTime = timeFilter(myAduio.currentTime);
    let sliderVal = Math.ceil((myAduio.currentTime / myAduio.duration) * 100);
    this.setData({
      sliderVal: sliderVal,
      currentTime: currentTime,
      duration: duration
    });
  },
  sliderChange: function(e) {
    let currentTime = (myAduio.duration * e.detail.value) / 100;
    myAduio.seek(currentTime, () => {
      this.setData({
        sliderVal: e.detail.value
      });
    });
  },
  playMusic: function() {
    let isPlay;
    if (this.data.isPlay) {
      myAduio.pause();
      isPlay = false;
    } else {
      myAduio.play();
      isPlay = true;
    }
    this.setData({
      isPlay: isPlay
    });
  },
  toggleMusic: function(type) {
    myAduio.seek(0, () => {
      this.setData({
        sliderVal: 0
      });
    });
  }
});
