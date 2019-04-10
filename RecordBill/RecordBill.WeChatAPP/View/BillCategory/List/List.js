// View/BillCategory/List/List.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    billCategories: []
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function (options) {
    this.getList();
  },
  /**
   * 操作子项
   */
  operationItem: function (e) {
    wx.showActionSheet({
      itemList: ['上移', '下移', '编辑', '删除'],
      success: res => {
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:
              if (e.currentTarget.dataset.upid) {
                this.exchangeIndex(e.currentTarget.dataset.upid, e.currentTarget.dataset.id);
              }
              break;
            case 1:
              if (e.currentTarget.dataset.downid) {
                this.exchangeIndex(e.currentTarget.dataset.downid, e.currentTarget.dataset.id);
              }
              break;
            case 2:
              this.gotoEdit(e.currentTarget.dataset.id);
              break;
            case 3:
              this.gotoDelete(e.currentTarget.dataset.id);
              break;
          }
        }
      }
    });
  },
  /**
   * 获得列表
   */
  getList: function () {
    var data = {
      "Token": app.globalData.token
    };
    var success = result => {
      this.bindUpIDAndDownID(result.Data);
      this.setData({
        billCategories: result.Data
      });
    };
    app.sendPost(app.routing.billCategory.getBillCategories, data, success);
  },
  /**
   * 绑定上个ID和下个ID
   */
  bindUpIDAndDownID: function (data) {
    if (data.length == 1) {
      data[0].UpID = null;
      data[0].DownID = null;
      return;
    }
    for (var i = 0; i < data.length; i++) {
      if (i == 0) {
        data[i].UpID = null;
        data[i].DownID = data[i + 1].ID;
      } else if (i == data.length - 1) {
        data[i].UpID = data[i - 1].ID;
        data[i].DownID = null;
      } else {
        data[i].UpID = data[i - 1].ID;
        data[i].DownID = data[i + 1].ID;
      }
    }
  },
  /**
   * 调换位序
   */
  exchangeIndex: function (id1, id2) {
    var data = {
      "ID1": id1,
      "ID2": id2
    };
    var success = result => {
      var index1 = null;
      var index2 = null;
      for (var i = 0; i < this.data.billCategories.length; i++) {
        if (this.data.billCategories[i].ID == id1) {
          index1 = i;
        } else if (this.data.billCategories[i].ID == id2) {
          index2 = i;
        }
        if (index1 != null && index2 != null) {
          var temp = this.data.billCategories[index1];
          this.data.billCategories[index1] = this.data.billCategories[index2];
          this.data.billCategories[index2] = temp;
          this.bindUpIDAndDownID(this.data.billCategories);
          this.setData({
            billCategories: this.data.billCategories
          });
          break;
        }
      }
    };
    app.sendPost(app.routing.billCategory.exchangeBillCategoryIndex, data, success);
  },
  /**
   * 删除
   */
  gotoDelete: function (id) {
    wx.showModal({
      title: '确认删除',
      content: '确认删除该项类型吗？已添加的账单不会被删除。',
      confirmText: "确认",
      cancelText: "取消",
      success: res => {
        if (!res.confirm) return;
        var data = {
          "id": id
        };
        var success = result => {
          for (var i = 0; i < this.data.billCategories.length; i++) {
            if (this.data.billCategories[i].ID == id) {
              this.data.billCategories.splice(i, 1);
              this.setData({
                billCategories: this.data.billCategories
              })
              break;
            }
          }
          wx.showToast({
            title: result.Message,
            icon: 'success',
            duration: 1000,
            success: res => {
              wx.navigateBack({
                delta: 1
              });
            }
          });
        };
        app.sendGet(app.routing.billCategory.deleteBillCategory, data, success);
      }
    });
  },
  /**
   * 编辑
   */
  gotoEdit: function (id) {
    wx.navigateTo({
      url: '/View/BillCategory/Edit/Edit?id=' + id
    });
  },
  /**
   * 新增
   */
  gotoNew: function () {
    wx.navigateTo({
      url: '/View/BillCategory/Edit/Edit'
    });
  }
})