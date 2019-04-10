// View/Bill/ReportSearch/ReportSearch.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    queryModel: {
      "StartDate": null,
      "StartDateStr": "",
      "EndDate": null,
      "EndDateStr": ""
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var startDate = new Date();
    var endDate = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    this.setData({
      "queryModel.StartDate": endDate,
      "queryModel.StartDateStr": app.dateTimeFormat(endDate, "yyyy/MM/dd"),
      "queryModel.EndDate": startDate,
      "queryModel.EndDateStr": app.dateTimeFormat(startDate, "yyyy/MM/dd")
    });
  },
  /**
   * 绑定开始时间
   */
  bindStartDateChange: function (e) {
    var values = e.detail.value.split("-");
    var dt = app.setLocalTime(new Date(values[0], parseInt(values[1]) - 1, values[2]));
    var dtStr = app.dateTimeFormat(dt, "yyyy/MM/dd");
    this.setData({
      "queryModel.StartDate": dt,
      "queryModel.StartDateStr": dtStr
    });
  },
  /**
   * 绑定结束时间
   */
  bindEndDateChange: function (e) {
    var values = e.detail.value.split("-");
    var dt = app.setLocalTime(new Date(values[0], parseInt(values[1]) - 1, values[2]));
    var dtStr = app.dateTimeFormat(dt, "yyyy/MM/dd");
    this.setData({
      "queryModel.EndDate": dt,
      "queryModel.EndDateStr": dtStr
    });
  },
  gotoReport: function () {
    var url = "/View/Bill/Report/Report";
    url += "?startDate=" + this.data.queryModel.StartDate;
    url += "&endDate=" + this.data.queryModel.EndDate;
    wx.navigateTo({
      url: url
    })
  }
})