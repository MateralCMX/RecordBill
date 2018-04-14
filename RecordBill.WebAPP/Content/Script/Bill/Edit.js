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
                        EditPage.config.ID = self["ID"];
                        EditPage.SetPageTile();
                    });
                    this.Init();
                    this.BindeEvent();
                }
                /**
                 * 初始化
                 */
                EditPage.prototype.Init = function () {
                    var nowDate = new Date();
                    var BtnRecordTime = MDMa.$("BtnRecordTime");
                    BtnRecordTime.innerText = MTMa.DateTimeFormat(nowDate, "yyyy/MM/dd");
                    EditPage.config.datePicker = new mui.DtPicker({
                        type: "date",
                        beginDate: new Date(2017, 8, 10),
                        endDate: new Date(),
                        labels: ['年', '月', '日'],
                    });
                };
                /**
                 * 绑定所有类型
                 */
                EditPage.prototype.BindAllType = function () {
                    var url = APP.Common.config.ServerURL + "api/BillTypes/GetAllTypes";
                    var SFun = function (resM, xhr, status) {
                        var data = resM["Data"];
                        EditPage.config.typePicker = new mui.PopPicker();
                        var popData = [];
                        var BtnType = MDMa.$("BtnType");
                        for (var i = 0; i < data.length; i++) {
                            if (i == 0 && !EditPage.config.ID) {
                                BtnType.innerText = data[i]["Name"];
                                BtnType.dataset.id = data[i]["ID"];
                            }
                            popData.push({
                                value: data[i]["ID"],
                                text: data[i]["Name"]
                            });
                        }
                        EditPage.config.typePicker.setData(popData);
                        MDMa.AddEvent(BtnType, "tap", EditPage.Event_BtnType_Tap);
                        var BtnSave = MDMa.$("BtnSave");
                        BtnSave.disabled = false;
                    };
                    var FFun = function (resM, xhr, status) {
                    };
                    var CFun = function (resM, xhr, status) {
                    };
                    APP.Common.SendGet(url, {}, SFun, FFun, CFun);
                };
                /**
                 * 绑定事件
                 */
                EditPage.prototype.BindeEvent = function () {
                    MDMa.AddEvent("BtnSave", "tap", this.Event_BtnSave_Tap);
                    MDMa.AddEvent("BtnRecordTime", "tap", this.Event_BtnRecordTime_Tap);
                    MDMa.AddEvent("InputAmount", "invalid", this.Event_InputAmount_Invalid);
                    MDMa.AddEvent("InputAmount", "change", APP.Common.RemoveError);
                    MDMa.AddEvent("InputContent", "invalid", this.Event_InputContent_Invalid);
                    MDMa.AddEvent("InputContent", "change", APP.Common.RemoveError);
                    this.BindAllType();
                };
                /**
                 *  类型
                 * @param e
                 */
                EditPage.Event_BtnType_Tap = function (e) {
                    EditPage.config.typePicker.show(function (selectItems) {
                        var BtnType = MDMa.$("BtnType");
                        BtnType.innerText = selectItems[0]["text"];
                        BtnType.dataset.id = selectItems[0]["value"];
                    });
                };
                /**
                 * 日期选择事件
                 * @param e
                 */
                EditPage.prototype.Event_BtnRecordTime_Tap = function (e) {
                    EditPage.config.datePicker.show(function (selectItems) {
                        var selectDate = new Date(selectItems.y.value, selectItems.m.value - 1, selectItems.d.value);
                        var BtnRecordTime = MDMa.$("BtnRecordTime");
                        BtnRecordTime.innerText = MTMa.DateTimeFormat(selectDate, "yyyy/MM/dd");
                    });
                };
                /**
                 * 设置页面标题
                 * @param id ID
                 */
                EditPage.SetPageTile = function () {
                    var PageTitle = MDMa.$("PageTitle");
                    if (PageTitle) {
                        if (EditPage.config.ID) {
                            PageTitle.innerText = "修改账单";
                            var url = APP.Common.config.ServerURL + "api/Bill/GetViewInfoByID";
                            var data = {
                                ID: EditPage.config.ID
                            };
                            var SFun = function (resM, xhr, status) {
                                var data = resM["Data"];
                                var BtnRecordTime = MDMa.$("BtnRecordTime");
                                BtnRecordTime.innerText = MTMa.DateTimeFormat(new Date(data["RecordTime"]), "yyyy/MM/dd");
                                var InputAmount = MDMa.$("InputAmount");
                                InputAmount.value = data["Amount"];
                                var InputContent = MDMa.$("InputContent");
                                InputContent.value = data["Contents"];
                                var BtnType = MDMa.$("BtnType");
                                BtnType.innerText = data["Type"];
                                BtnType.dataset.id = data["FK_Type_ID"];
                            };
                            var FFun = function (resM, xhr, status) {
                            };
                            var CFun = function (resM, xhr, status) {
                            };
                            APP.Common.SendGet(url, data, SFun, FFun, CFun);
                        }
                        else {
                            PageTitle.innerText = "添加账单";
                        }
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
                        mui.toast("金额不能小于0元");
                    }
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
                 * 保存方法
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
                            RecordTime: MDMa.$("BtnRecordTime").innerText,
                            FK_Type_ID: MDMa.$("BtnType").dataset.id,
                            Amount: MDMa.GetInputValue("InputAmount"),
                            Contents: MDMa.GetInputValue("InputContent"),
                        };
                    }
                    return null;
                };
                EditPage.config = {
                    ID: null,
                    datePicker: null,
                    typePicker: null
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