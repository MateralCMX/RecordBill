// View/Bill/ReportSearch/ReportSearch.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    SearchM: {
      minDate: null,
      minDateStr: null,
      maxDate: null,
      maxDateStr: null,
    }
  },
  /**
   * 绑定最小时间
   */
  bindMinDateChange:function(e){
    var values = e.detail.value.split("-");
    var dt = getApp().SetLocalTime(new Date(values[0], parseInt(values[1]) - 1, values[2]));
    var dtStr = getApp().DateTimeFormat(dt, "yyyy/MM/dd");
    this.setData({
      "SearchM.minDate": dt,
      "SearchM.minDateStr": dtStr
    });
  },
  /**
   * 绑定最大时间
   */
  bindMaxDateChange: function (e) {
    var values = e.detail.value.split("-");
    var dt = getApp().SetLocalTime(new Date(values[0], parseInt(values[1]) - 1, values[2]));
    var dtStr = getApp().DateTimeFormat(dt, "yyyy/MM/dd");
    this.setData({
      "SearchM.maxDate": dt,
      "SearchM.maxDateStr": dtStr
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var maxDt = new Date();
    var minDt = new Date(maxDt.getFullYear(), maxDt.getMonth(),1);
    this.setData({
      "SearchM.minDate": minDt,
      "SearchM.minDateStr": getApp().DateTimeFormat(minDt,"yyyy/MM/dd"),
      "SearchM.maxDate": maxDt,
      "SearchM.maxDateStr": getApp().DateTimeFormat(maxDt, "yyyy/MM/dd")
    });
  },
  /**
   * 查询
   */
  Search: function () {
    // getApp().globalData.PageParams = {
    //   ID: id
    // };
    wx.navigateTo({
      url: '/View/Bill/Report/Report?minDate=' + this.data.SearchM.minDate + "&maxDate=" + this.data.SearchM.maxDate + "&minDateStr=" + this.data.SearchM.minDateStr + "&maxDateStr=" + this.data.SearchM.maxDateStr
    })
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