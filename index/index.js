Page({
  data: {
    isPlay: false,
    src: 'https://v8.dious.cc/20230327/l3prAvya/index.m3u8',
    controlShow: false,
    searchName:'',
    array:[],
    array2:[],
    num:[]
  },
  onLoad() {
    this.videoContext = wx.createVideoContext('video_player')
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
    wx.navigateTo({
      url: '/show/show?searchUrl='+this.data.array2[index],
    })
  },
  bindButtonTap:function(){
    this.requestMessage(this.data.searchName)
  },
  searchName: function (e) {
    this.setData({
      searchName: e.detail.value
    })
  },
  requestMessage:function(searchWhat){
    var that = this
    wx.request({
      url:'http://5du8a2.natappfree.cc',//输入请求的ip地址
      method:'POST',//请求的方法
      header: {'content-type': "application/x-www-form-urlencoded",},
      data:{
        tag:'before',
        search:searchWhat//传递的内容
      },
      success: function(res){//当请求成功后的操作
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          array:res.data.name,
          array2:res.data.key,
          num:res.data.num
        })
      }
    })
  },
})
