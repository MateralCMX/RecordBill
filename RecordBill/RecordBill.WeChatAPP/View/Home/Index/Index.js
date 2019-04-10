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
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.data.pageIndex = 1;
    this.data.bills = [];
    this.getBills(this.data.pageIndex);
  },
  getBills: function (pageIndex) {
    if (!pageIndex) {
      pageIndex = ++this.data.pageIndex;
    }
    var data = {
      "Token": app.globalData.token,
      "StartDate": null,
      "EndDate": null,
      "PageIndex": pageIndex,
      "PageSize": 10
    };
    var success = result => {
      var bills = this.data.bills.concat(result.Data);
      this.setData({
        bills: bills,
        isLoad: result.PageModel.PageCount > this.data.pageIndex
      });
    };
    app.sendPost(app.routing.bill.getBills, data, success);
  }
});