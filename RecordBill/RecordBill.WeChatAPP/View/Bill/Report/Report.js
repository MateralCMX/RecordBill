// View/Bill/Report/Report.js
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
    },
    BillRepor:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      "SearchM.minDate": new Date(options.minDate),
      "SearchM.minDateStr": options.minDateStr,
      "SearchM.maxDate": new Date(options.maxDate),
      "SearchM.maxDateStr": options.maxDateStr
    });
    this.Search();
  },
  /**
   * 查询
   */
  Search:function(){
    var _this = this;
    var data = {
      userID: getApp().globalData.LoginUserInfo.UserID,
      minDate: getApp().DateTimeFormat(_this.data.SearchM.minDate, "yyyy/MM/dd"),
      maxDate: getApp().DateTimeFormat(_this.data.SearchM.maxDate, "yyyy/MM/dd")
    };
    var SFun = function (resM) {
      resM = resM.data.Data;
      _this.setData({
        "BillRepor":resM
      });
    };
    wx.request({
      url: getApp().globalData.ServerUrl + "api/Bill/GetBillReportInfoByWhere",
      method: "GET",
      data: getApp().AddLoginUserParams(data),
      success: SFun,
    });
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