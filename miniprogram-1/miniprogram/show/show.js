Page({
  data: {
    isPlay: false,
    src: '',
    searchUrl:'',
    controlShow: false,
    searchName:'',
    array:[],
    array2:[],
    num:[]
  },
  onLoad: function(options) {
    this.videoContext = wx.createVideoContext('video_player')
    this.setData({
      searchUrl:options.searchUrl
    })
    console.log(this.data.searchUrl)
    this.requestMessage(this.data.searchUrl)
  },
  onShow(){

  },
  // 播放
  handlePlay() {
    this.videoContext.play()
  },
  // 暂停
  handlePause() {
    this.videoContext.pause()
  },
  // 触发播放、暂停
  triggerPlay() {
    this.setData({
      isPlay: true
    })
  },
  triggerPause() {
    this.setData({
      isPlay: false
    })
  },
  // 跟 controls 显隐同步
  controlsToggle(e) {
    const { show } = e.detail
    this.setData({
      controlShow: show
    })
  },
  // 滑动进度时，隐藏播放按钮，避免遮挡
  touchMove() {
    this.setData({
      controlShow: false
    })
  },
  touchEnd() {
    this.setData({
      controlShow: true
    })
  },
  onItemClick:function(e){
    var index = e.currentTarget.dataset.index;
    this.setData({src:this.data.array2[index]
    })
    console.log(this.data.src)
    this.videoContext.play()
  },
  // bindButtonTap:function(){
  //   this.requestMessage(this.data.searchName)
  // },
  // searchName: function (e) {
  //   this.setData({
  //     searchName: e.detail.value
  //   })
  // },
  
  requestMessage:function(searchWhat){
    wx.showLoading({
      title: '正在加载中...',
      mask: true // 是否显示透明蒙层，防止触摸穿透，默认为false
    });
    var that = this

    wx.request({
      url:'http://5du8a2.natappfree.cc',//输入请求的ip地址
      method:'POST',//请求的方法
      header: {'content-type': "application/x-www-form-urlencoded",},
      data:{
        tag:'1',
        search:that.data.searchUrl///传递的内容
      },
      success: function(res){//当请求成功后的操作
        wx.hideLoading();
        // console.log(res.data)
        that.setData({
          array:res.data.name,
          array2:res.data.key,
          num:res.data.num
        })
      }
    })
  },
})
