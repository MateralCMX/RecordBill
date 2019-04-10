// View/Home/Index/Index.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    bills: [],
    pageIndex: 1,
    isLoad: true,
    isLoading:false
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.pageIndex = 0;
    this.data.bills = [];
    this.getBills();
  },
  getBills: function () {
    this.data.isLoading = true;
    var data = {
      "Token": app.globalData.token,
      "StartDate": null,
      "EndDate": null,
      "PageIndex": ++this.data.pageIndex,
      "PageSize": 10
    };
    var success = result => {
      var bills = this.data.bills.concat(result.Data);
      this.setData({
        bills: bills,
        isLoad: result.PageModel.PageCount > this.data.pageIndex
      });
      this.data.isLoading = false;
    };
    app.sendPost(app.routing.bill.getBills, data, success);
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    if (this.data.isLoad && !this.data.isLoading) {
      this.getBills(false);
    }
  },
});