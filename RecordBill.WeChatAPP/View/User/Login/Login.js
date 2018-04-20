// View/User/Login.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    LoginText: "正在登录..."
  },
  /**
   * 登录系统
   */
  Login: function (code) {
    var _this = this;
    var data = {
      code: code,
    };
    var SFun = function (resM) {
      getApp().globalData.LoginUserInfo = resM.data.Data;
      _this.setData({
        LoginText: "登录成功"
      });
      wx.reLaunch({
        url: "/View/Home/Index/Index"
      });
    };
    wx.request({
      url: getApp().globalData.ServerUrl + "api/User/LoginByCode",
      method: "GET",
      data: data,
      success: SFun,
    });
  },
  /**
   * 登录微信
   */
  LoginWX: function () {
    wx.login({
      success: res => {
        this.Login(res.code);
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.LoginWX();
  },
})