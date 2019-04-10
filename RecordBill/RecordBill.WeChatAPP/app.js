//app.js
App({
  /**
   * 初始化
   */
  onLaunch: function() {},
  /**
   * 时间字符串格式化
   * @param dateTime 时间对象
   * @param formatStr 格式化字符串
   */
  dateTimeFormat: function(dateTime, formatStr) {
    var formatData = {
      "M+": dateTime.getMonth() + 1, //月份 
      "d+": dateTime.getDate(), //日 
      "H+": dateTime.getHours(), //小时 
      "m+": dateTime.getMinutes(), //分 
      "s+": dateTime.getSeconds(), //秒 
      "q+": Math.floor((dateTime.getMonth() + 3) / 3), //季度 
      "S": dateTime.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(formatStr)) {
      formatStr = formatStr.replace(RegExp.$1, (dateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var data in formatData) {
      if (new RegExp("(" + data + ")").test(formatStr)) {
        formatStr = formatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (formatData[data]) : (("00" + formatData[data]).substr(("" + formatData[data]).length)));
      }
    }
    return formatStr;
  },
  /**
   * 设置本地时间
   */
  setLocalTime(dt, i) {
    if (!i) {
      i = dt.getTimezoneOffset() / 60;
    }
    dt.setTime(dt.getTime() - i * 60 * 60 * 1000);
    return dt;
  },
  /**
   * 绑定数据
   */
  globalData: {
    userInfo: null,
    token: null,
    serverUrl: "https://myqa.materalcmx.com"
  },
  routing:{
    user:{
      login: "/api/User/LoginByWeChatCode"
    },
    billCategory: {
      getBillCategories: "/api/BillCategory/GetBillCategories",
      exchangeBillCategoryIndex: "/api/BillCategory/ExchangeBillCategoryIndex",
      getBillCategoryInfo: "/api/BillCategory/GetBillCategoryInfo",
      deleteBillCategory: "/api/BillCategory/DeleteBillCategory",
      editBillCategory: "/api/BillCategory/EditBillCategory",
      addBillCategory: "/api/BillCategory/AddBillCategory"
    },
    bill: {
      getBills: "/api/Bill/GetBills",
      getBillReport: "/api/Bill/GetBillReport",
      getBillInfo: "/api/Bill/GetBillInfo",
      deleteBill: "/api/Bill/DeleteBill",
      editBill: "/api/Bill/EditBill",
      addBill: "/api/Bill/AddBill"
    }
  },
  /**
   * 发送Post请求
   */
  sendPost(url, data, success) {
    this.send(url, "Post", data, success);
  },
  /**
   * 发送Get请求
   */
  sendGet(url, data, success) {
    this.send(url, "Get", data, success);
  },
  /**
   * 发送请求
   */
  send(url, method, data, success) {
    var header = {};
    if (this.globalData.token) {
      header.Authorization = "Bearer " + this.globalData.token;
    }
    wx.request({
      url: this.globalData.serverUrl + url,
      method: method,
      header: header,
      data: data,
      success: result => {
        if (result.data.ResultType == 0) {
          if (success) {
            success(result.data);
          }
        }
        else if (result.statusCode == 401) {
          wx.reLaunch({
            url:"/View/User/Login/Login"
          });
        }
        else {
          console.log("请求失败");
          console.log(result);
        }
      }
    });
  }
})