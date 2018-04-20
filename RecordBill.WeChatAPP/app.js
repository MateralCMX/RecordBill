//app.js
App({
  /**
   * 初始化
   */
  onLaunch: function () {
  },
  /**
   * 时间字符串格式化
   * @param dateTime 时间对象
   * @param formatStr 格式化字符串
   */
  DateTimeFormat: function (dateTime, formatStr) {
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
   * 获取对应时区时间
   */
  GetLocalTime: function (dt, i) {
    if (!i) {
      i = 8;
    }
    var len = dt.getTime();
    var offset = dt.getTimezoneOffset() * 60000;
    var utcTime = len + offset;
    dt = new Date(utcTime + 3600000 * i);
    return dt;
  },
  /**
   * 设置本地时间
   */
  SetLocalTime(dt, i) {
    if (!i) {
      i = dt.getTimezoneOffset() / 60;
    }
    dt.setTime(dt.getTime() - i * 60 * 60 * 1000);
    return dt;
  },
  /**
   * 添加登录用户参数
   */
  AddLoginUserParams: function (data) {
    var LoginUserInfo = this.globalData.LoginUserInfo;
    data["LoginUserID"] = LoginUserInfo["UserID"];
    data["Token"] = LoginUserInfo["Token"];
    return data;
  },
  /**
   * 绑定数据
   */
  globalData: {
    ServerUrl: "https://myqa.materalcmx.com/",
    PageParams: {},
    LoginUserInfo: null
  }
})