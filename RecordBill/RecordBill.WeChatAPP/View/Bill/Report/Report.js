// View/Bill/Report/Report.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    startDateStr: "",
    endDateStr: "",
    billReport: {}
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    var startDate = new Date(options.startDate);
    var endDate = new Date(options.endDate);
    this.setData({
      startDateStr: app.dateTimeFormat(startDate, "yyyy/MM/dd"),
      endDateStr: app.dateTimeFormat(endDate, "yyyy/MM/dd")
    });
    this.searchReport(startDate, endDate);
  },
  /**
   * 查询
   */
  searchReport: function (startDate, endDate) {
    var data = {
      "Token": app.globalData.token,
      "StartDate": startDate,
      "EndDate": endDate
    };
    var success = result => {
      console.log(result.Data);
      this.setData({
        billReport: result.Data
      });
    };
    app.sendPost(app.routing.bill.getBillReport, data, success);
  },
})