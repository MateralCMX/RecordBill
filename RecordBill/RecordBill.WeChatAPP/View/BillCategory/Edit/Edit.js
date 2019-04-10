// View/BillCategory/Edit/Edit.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isAdd: true,
    billCategory: {
      Name: ""
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.loadBillCategoryInfo(options.id);
    }
  },
  /**
   * 加载账单类型信息
   */
  loadBillCategoryInfo: function (id) {
    var data = {
      "id": id
    };
    var success = result => {
      this.setData({
        isAdd: false,
        billCategory: result.Data
      });
    };
    app.sendGet(app.routing.billCategory.getBillCategoryInfo, data, success);
  },
  /**
   * 输入名称
   */
  inputName: function (e) {
    this.data.billCategory.Name = e.detail.value;
  },
  /**
   * 保存
   */
  save: function () {
    if (!this.data.billCategory.Name) {
      wx.showModal({
        content: '请填写账单类型名称',
        showCancel: false
      });
      return;
    }
    var url = app.routing.billCategory.addBillCategory;
    var data = {
      "Token": app.globalData.token,
      "Name": this.data.billCategory.Name
    };
    if (!this.data.isAdd) {
      url = app.routing.billCategory.editBillCategory;
      data.ID = this.data.billCategory.ID;
    }
    var success = result => {
      wx.showToast({
        title: result.Message,
        icon: 'success',
        duration: 1000,
        success: res => {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          },1000);
        }
      });
    };
    app.sendPost(url, data, success);
  }
})