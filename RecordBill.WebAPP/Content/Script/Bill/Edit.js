var RecordBill;
(function (RecordBill) {
    var APP;
    (function (APP) {
        var Bill;
        (function (Bill) {
            var EditPage = /** @class */ (function () {
                /**
                 * 构造函数
                 */
                function EditPage() {
                    mui.init({
                        beforeback: function () {
                            if (plus) {
                                var self = plus.webview.currentWebview().opener();
                                mui.fire(self, 'init');
                            }
                            return true;
                        }
                    });
                    mui.plusReady(function () {
                        var self = plus.webview.currentWebview();
                        var id = self["ID"];
                        EditPage.config.ID = id;
                        EditPage.SetPageTileByID(id);
                    });
                    this.Init();
                    this.BindeEvent();
                }
                /**
                 * 初始化
                 */
                EditPage.prototype.Init = function () {
                    var nowDate = new Date();
                    var InputRecordTime = MDMa.$("InputRecordTime");
                    InputRecordTime.value = MTMa.DateTimeFormat(nowDate, "yyyy-MM-dd");
                    //let InputAmount = MDMa.$("InputAmount") as HTMLInputElement;
                    //InputAmount.value = "15";
                    //let InputContent = MDMa.$("InputContent") as HTMLInputElement;
                    //InputContent.value = "吃饭";
                };
                /**
                 * 绑定事件
                 */
                EditPage.prototype.BindeEvent = function () {
                    MDMa.AddEvent("BtnSave", "tap", this.Event_BtnSave_Tap);
                    MDMa.AddEvent("InputRecordTime", "invalid", this.Event_InputRecordTime_Invalid);
                    MDMa.AddEvent("InputRecordTime", "change", APP.Common.RemoveError);
                    MDMa.AddEvent("InputAmount", "invalid", this.Event_InputAmount_Invalid);
                    MDMa.AddEvent("InputAmount", "change", APP.Common.RemoveError);
                    MDMa.AddEvent("InputContent", "invalid", this.Event_InputContent_Invalid);
                    MDMa.AddEvent("InputContent", "change", APP.Common.RemoveError);
                };
                /**
                 * 设置页面标题
                 * @param id ID
                 */
                EditPage.SetPageTileByID = function (id) {
                    var PageTitle = MDMa.$("PageTitle");
                    if (PageTitle) {
                        if (id) {
                            PageTitle.innerText = "修改账单";
                        }
                        else {
                            PageTitle.innerText = "添加账单";
                        }
                    }
                };
                /**
                 * 日期验证事件
                 * @param e
                 */
                EditPage.prototype.Event_InputRecordTime_Invalid = function (e) {
                    var validity = APP.Common.GetValidityState(e);
                    if (validity.valueMissing) {
                        mui.toast("请填写记账日期");
                    }
                };
                /**
                 * 金额验证事件
                 * @param e
                 */
                EditPage.prototype.Event_InputAmount_Invalid = function (e) {
                    var validity = APP.Common.GetValidityState(e);
                    if (validity.valueMissing) {
                        mui.toast("请填写金额");
                    }
                    else if (validity.rangeUnderflow) {
                        mui.toast("金额不能小于0.01元");
                    }
                    console.log(validity);
                };
                /**
                 * 内容验证事件
                 * @param e
                 */
                EditPage.prototype.Event_InputContent_Invalid = function (e) {
                    var validity = APP.Common.GetValidityState(e);
                    if (validity.valueMissing) {
                        mui.toast("请填写内容");
                    }
                };
                /**
                 * 保存按钮点击事件
                 * @param e
                 */
                EditPage.prototype.Event_BtnSave_Tap = function (e) {
                    var element = e.target;
                    mui(element).button('loading');
                    var InputM = EditPage.GetInputData();
                    if (InputM) {
                        EditPage.Save(InputM);
                    }
                    else {
                        mui(element).button('reset');
                    }
                };
                /**
                 * 登录方法
                 * @param InputM 请求对象
                 */
                EditPage.Save = function (InputM) {
                    var url = APP.Common.config.ServerURL;
                    if (EditPage.config.ID) {
                        InputM["ID"] = EditPage.config.ID;
                        url += "api/Bill/Update";
                    }
                    else {
                        url += "api/Bill/Add";
                    }
                    var SFun = function (resM, xhr, status) {
                        if (EditPage.config.ID) {
                            mui.toast("保存成功");
                            setTimeout(function () {
                                mui.back();
                            }, 1000);
                        }
                        else {
                            mui.confirm("添加成功，继续添加吗？", "提示", ["取消", "确定"], function (e) {
                                if (e.index == 0) {
                                    mui.back();
                                }
                            });
                        }
                    };
                    var FFun = function (resM, xhr, status) {
                        mui.toast("保存失败");
                    };
                    var CFun = function (resM, xhr, status) {
                        mui("#BtnSave").button('reset');
                    };
                    APP.Common.SendPost(url, InputM, SFun, FFun, CFun);
                };
                /**
                * 获得输入数据
                */
                EditPage.GetInputData = function () {
                    var InputForm = MDMa.$("InputForm");
                    if (InputForm.checkValidity()) {
                        return {
                            RecordTime: MDMa.GetInputValue("InputRecordTime"),
                            Amount: MDMa.GetInputValue("InputAmount"),
                            Contents: MDMa.GetInputValue("InputContent"),
                        };
                    }
                    return null;
                };
                EditPage.config = {
                    ID: null
                };
                return EditPage;
            }());
            Bill.EditPage = EditPage;
        })(Bill = APP.Bill || (APP.Bill = {}));
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.APP.Bill.EditPage();
});
//# sourceMappingURL=Edit.js.map