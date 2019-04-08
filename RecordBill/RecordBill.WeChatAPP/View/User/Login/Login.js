// View/User/Login.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  /**
   * 获得用户信息
   */
  getUserInfo: function(e) {
    var serverLoginSuccess = result => {
      if (result.data.ResultType == 0) {
        app.globalData.userInfo = e.detail.userInfo;
        app.globalData.token = result.data.Data.AccessToken;
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        });
      }
    };
    wx.login({
      success: result => {
        wx.request({
          url: app.globalData.serverUrl + "/api/User/LoginByWeChatCode",
          method: "Post",
          data: {
            "Code": result.code,
            "NickName": e.detail.userInfo.nickName
          },
          success: serverLoginSuccess
        });
      }
    });
  },
  /**
   * 跳转到主页
   */
  gotoIndex:function(e){
    wx.reLaunch({
      url: '/View/Home/Index/Index'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
    } else if (this.data.canIUse) {
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
      };
    } else {
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo;
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
        }
      });
    }
  },
})