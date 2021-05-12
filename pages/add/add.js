// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onPullDownRefresh: function () {
      this.setData({
               showView: true,  //这个是我判断提醒语的显示，我在page里设置变量是true
                  })
   setTimeout(() => {
             this.setData({
                  showView: false,
                 })
 wx.hideNavigationBarLoading() //完成停止加载
wx.stopPullDownRefresh() //停止下拉刷新
}, 1000)
},
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