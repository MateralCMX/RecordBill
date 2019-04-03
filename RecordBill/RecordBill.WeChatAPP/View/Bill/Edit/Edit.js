// View/Bill/Edit/Edit.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    TypeList: [],
    InputM: {
      ID: "",
      RecordTime: null,
      RecordTimeStr: "",
      Contents: "",
      Amount: "",
      FK_Type_ID: "",
      Type: "",
      TypeIndex: null
    },
    IsBindType: false,
    IsAdd: true,
    IsSaving: false,
    IsDeleting: false,
    BtnSaveText: "保存",
    BtnDeleteText: "删除"
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.bindTypeList();
  },
  /**
   * 绑定类型更改
   */
  bindTypeChange: function (e) {
    if (this.data.IsBindType) {
      var index = parseInt(e.detail.value);
      this.setData({
        "InputM.Type": this.data.TypeList[index].Name,
        "InputM.TypeIndex": index,
        "InputM.FK_Type_ID": this.data.TypeList[index].ID
      });
    }
  },
  /**
   * 绑定时间更改
   */
  bindDateChange: function (e) {
    var values = e.detail.value.split("-");
    var dt = getApp().SetLocalTime(new Date(values[0], parseInt(values[1]) - 1, values[2]));
    var dtStr = getApp().DateTimeFormat(dt, "yyyy/MM/dd");
    this.setData({
      "InputM.RecordTime": dt,
      "InputM.RecordTimeStr": dtStr
    });
  },
  /**
   * 绑定类型列表
   */
  bindTypeList: function () {
    var _this = this;
    var data = {};
    var SFun = function (resM) {
      resM = resM.data.Data;
      _this.setData({
        TypeList: resM,
        "InputM.Type": resM[0].Name,
        "InputM.TypeIndex": 0,
        "InputM.FK_Type_ID": resM[0].ID
      });
      _this.data.IsBindType = true;
      _this.GetBillInfo();
    };
    wx.request({
      url: getApp().globalData.ServerUrl + "api/BillTypes/GetAllTypes",
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
   * 获得账单数据
   */
  GetBillInfo: function () {
    if (this.data.InputM.ID) {
      var _this = this;
      var data = {
        ID: this.data.InputM.ID
      };
      var SFun = function (resM) {
        resM = resM.data.Data;
        var dt = getApp().SetLocalTime(new Date(resM["RecordTime"]));
        console.log(dt);
        _this.setData({
          "IsAdd": false,
          "InputM.RecordTime": dt,
          "InputM.RecordTimeStr": resM["RecordTimeStr"],
          "InputM.Contents": resM["Contents"],
          "InputM.Amount": resM["Amount"],
          "InputM.FK_Type_ID": resM["FK_Type_ID"],
          "InputM.Type": resM["Type"],
          "InputM.TypeIndex": 0,
          "IsSaving": false,
          "IsDeleting": false,
          "BtnSaveText": "保存"
        });
      };
      wx.request({
        url: getApp().globalData.ServerUrl + "api/Bill/GetViewInfoByID",
        method: "GET",
        data: getApp().AddLoginUserParams(data),
        success: SFun,
      });
    }
    else {
      var dt = new Date();
      var dtStr = getApp().DateTimeFormat(dt, "yyyy/MM/dd");
      this.setData({
        "IsAdd": true,
        "InputM.RecordTime": dt,
        "InputM.RecordTimeStr": dtStr,
        "InputM.Contents": "",
        "InputM.Amount": 0,
        "InputM.FK_Type_ID": this.data.TypeList[0].ID,
        "InputM.Type": this.data.TypeList[0].Name,
        "InputM.TypeIndex": 0,
        "IsSaving": false,
        "IsDeleting": false,
        "BtnSaveText": "保存"
      });
    }
  },
  /**
   * 保存
   */
  Save: function (e) {
    var _this = this;
    this.setData({
      IsSaving: true,
      IsDeleting: true,
      BtnSaveText: "保存中..."
    });
    if (!this.data.InputM.Contents) {
      wx.showModal({
        content: '请填写内容',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            _this.setData({
              IsSaving: false,
              IsDeleting: false,
              BtnSaveText: "保存"
            });
          }
        }
      });
    }
    else if (!this.data.InputM.Amount) {
      wx.showModal({
        content: '请填写金额',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            _this.setData({
              IsSaving: false,
              IsDeleting: false,
              BtnSaveText: "保存"
            });
          }
        }
      });
    }
    else {
      var url = this.data.IsAdd ? "api/Bill/Add" : "api/Bill/Update";
      var SFun = function (resM) {
        _this.setData({
          BtnSaveText: "保存成功"
        });
        setTimeout(function () {
          wx.switchTab({
            url: '/View/Home/Index/Index'
          })
        }, 1000);
      };
      wx.request({
        url: getApp().globalData.ServerUrl + url,
        method: "POST",
        data: getApp().AddLoginUserParams(this.data.InputM),
        success: SFun,
      });
    }
  },
  /**
   * 删除
   */
  Delete: function () {
    var _this = this;
    this.setData({
      IsSaving: true,
      IsDeleting: true,
      BtnDeleteText: "删除中..."
    });
    var data = {
      ID: this.data.InputM.ID
    }
    var SFun = function (resM) {
      _this.setData({
        BtnDeleteText: "删除成功"
      });
      setTimeout(function () {
        wx.switchTab({
          url: '/View/Home/Index/Index'
        })
      }, 1000);
    };
    wx.request({
      url: getApp().globalData.ServerUrl + "api/Bill/Delete",
      method: "POST",
      data: getApp().AddLoginUserParams(data),
      success: SFun,
    });
  },
  /**
   * 金额输入
   */
  InputAmount: function (e) {
    this.data.InputM.Amount = e.detail.value;
  },
  /**
   * 内容输入
   */
  InputContents: function (e) {
    this.data.InputM.Contents = e.detail.value;
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var params = getApp().globalData.PageParams;
    if (params && params["ID"]) {
      this.data.InputM.ID = params["ID"];
      getApp().globalData.PageParams = {};
    }
    else {
      this.data.InputM.ID = "";
    }
    if (this.data.IsBindType) {
      this.GetBillInfo();
    }
  }
})