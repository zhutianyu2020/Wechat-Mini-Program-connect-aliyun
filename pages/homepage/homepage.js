// pages/homepage/homepage.js
Page({
  data: {
      status:"正常",
      statuscolor:"#339933"
  },

  onTapJump:function(event){
    wx.navigateTo({
      url: '../device/device',
      success:function(){
        console.log("jump success")
      },
      fail:function(){
        console.log("jump failed")
      },
      complete:function(){
        console.log("jump cpmpelete")
      }
    })
  },
  onTapJumpdevice:function(event){
    wx.navigateTo({
      url: '../add/add',
      success:function(){
        console.log("jump success")
      },
      fail:function(){
        console.log("jump failed")
      },
      complete:function(){
        console.log("jump cpmpelete")
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})