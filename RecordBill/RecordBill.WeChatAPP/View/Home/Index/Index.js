// View/Home/Index/Index.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    ListData: [],
    PageModel: {
      PageIndex: 1,
      PageSize: 10,
      PageCount: 0
    },
    IsLoading: false,
    IsLoad: true,
    ScrollTop:"0"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  /**
   * 跳转修改
   */
  GoToBillEdit: function (e) {
    var id = e.currentTarget.dataset.id;
    getApp().globalData.PageParams = {
      ID: id
    };
    wx.switchTab({
      url: '/View/Bill/Edit/Edit'
    })
  },
  /**
   * 查询账单
   */
  SearchBill: function (isReload) {
    var _this = this;
    _this.data.IsLoading = true;
    if (isReload) {
      this.setData({
        ScrollTop: "0",
        "PageModel.PageIndex": 1
      });
    }
    var data = {
      userID: getApp().globalData.LoginUserInfo.UserID,
      minDate: null,
      maxDate: null,
      pagingIndex: _this.data.PageModel.PageIndex,
      pagingSize: _this.data.PageModel.PageSize,
    };
    var SFun = function (resM) {
      resM = resM.data.Data;
      var listM = resM.Data;
      var pageInfo = resM.PageInfo;
      var ListInfo = isReload?[]:_this.data.ListData;
      for (var i = 0; i < listM.length; i++) {
        ListInfo.push(listM[i]);
      }
      _this.setData({
        ListData: ListInfo,
        "PageModel.PageCount": pageInfo.PagingCount,
        IsLoad: _this.data.PageModel.PageIndex++ < pageInfo.PagingCount,
        IsLoading:false
      });
    };
    wx.request({
      url: getApp().globalData.ServerUrl + "api/Bill/GetViewInfoByWhere",
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
    this.SearchBill(true);
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
    if (this.data.IsLoad && !this.data.IsLoading) {
      this.SearchBill(false);
    }
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
});