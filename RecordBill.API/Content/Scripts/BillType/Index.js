/// <reference path="../../lib/jquery/jquery.d.ts" />
'use strict';
var RecordBill;
(function (RecordBill) {
    var BillType;
    (function (BillType) {
        var IndexPage = /** @class */ (function () {
            /**
             * 构造方法
             */
            function IndexPage() {
                this.BindEvent();
                IndexPage.GetAllTypes();
            }
            /**
             * 绑定事件
             */
            IndexPage.prototype.BindEvent = function () {
                MDMa.AddEvent("BtnAdd", "click", this.Event_BtnAdd_Click);
                MDMa.AddEvent("BtnSave", "click", this.Event_BtnSave_Click);
            };
            /**
             * 添加按钮事件
             * @param e
             */
            IndexPage.prototype.Event_BtnAdd_Click = function (e) {
                IndexPage.SetInputInfo();
                $("#EditModal").modal('toggle');
            };
            /**
             * 保存按钮事件
             * @param e
             */
            IndexPage.prototype.Event_BtnSave_Click = function (e) {
                var element = e.target;
                element.disabled = true;
                element.innerText = "保存中......";
                var inputM = RecordBill.Common.GetInputInfo("InputForm", function () {
                    return {
                        ID: IndexPage.config.SelectedID,
                        Name: MDMa.GetInputValue("InputName")
                    };
                });
                if (inputM) {
                    var url = RecordBill.Common.config.ServerURL;
                    if (IndexPage.config.SelectedID) {
                        url += "api/BillTypes/Update";
                    }
                    else {
                        url += "api/BillTypes/Add";
                    }
                    var SFun = function (resM, xhr, status) {
                        element.disabled = false;
                        element.innerText = "保存";
                        $("#EditModal").modal('toggle');
                        RecordBill.Common.ShowMessageBox("操作成功");
                        IndexPage.GetAllTypes();
                    };
                    var FFun = function (resM, xhr, status) {
                        RecordBill.Common.ShowMessageBox("操作失败：" + resM["Message"]);
                    };
                    var CFun = function (resM, xhr, status) {
                    };
                    RecordBill.Common.SendPost(url, inputM, SFun, FFun, CFun);
                }
                else {
                    element.disabled = false;
                    element.innerText = "保存";
                }
            };
            /**
             * 列表编辑按钮事件
             * @param e
             */
            IndexPage.Event_BtnGroupEdit_Click = function (e) {
                var element = e.target;
                var id = RecordBill.Common.GetDataSetOrPanertDataSet(element, "id");
                if (id) {
                    IndexPage.GetBillTypeInfoByID(id, function (resM) {
                        IndexPage.SetInputInfo(resM["Data"]);
                        $("#EditModal").modal('toggle');
                    });
                }
            };
            /**
             * 根据ID获得账单类型
             * @param id ID
             * @param sfun 成功方法
             */
            IndexPage.GetBillTypeInfoByID = function (id, sfun) {
                var url = RecordBill.Common.config.ServerURL + "api/BillTypes/GetViewInfoByID";
                var data = {
                    userID: id
                };
                var FFun = function (resM, xhr, status) {
                    RecordBill.Common.ShowMessageBox("查询失败：" + resM["Message"]);
                };
                var CFun = function (resM, xhr, status) {
                };
                RecordBill.Common.SendGet(url, data, sfun, FFun, CFun);
            };
            /**
             * 设置输入模型
             * @param inputM
             */
            IndexPage.SetInputInfo = function (inputM) {
                if (inputM === void 0) { inputM = { ID: "", Name: "" }; }
                var InputName = MDMa.$("InputName");
                InputName.value = inputM.Name;
                IndexPage.config.SelectedID = inputM.ID;
            };
            /**
             * 获得所有类型
             */
            IndexPage.GetAllTypes = function () {
                var url = RecordBill.Common.config.ServerURL + "api/BillTypes/GetAllTypes";
                var data = {};
                var SFun = function (resM, xhr, status) {
                    var data = resM["Data"];
                    IndexPage.BindList(data);
                };
                var FFun = function (resM, xhr, status) {
                    RecordBill.Common.ShowMessageBox("获得类型信息失败：" + resM["Message"]);
                };
                var CFun = function (resM, xhr, status) {
                };
                RecordBill.Common.SendGet(url, data, SFun, FFun, CFun);
            };
            /**
             * 向上
             */
            IndexPage.Event_BtnUp_Click = function (e) {
                var element = e.target;
                var id1 = RecordBill.Common.GetDataSetOrPanertDataSet(element, "id");
                var id2 = RecordBill.Common.GetDataSetOrPanertDataSet(element, "upid");
                IndexPage.ChangeStort(id1, id2);
            };
            /**
             * 向下
             */
            IndexPage.Event_BtnDown_Click = function (e) {
                var element = e.target;
                var id1 = RecordBill.Common.GetDataSetOrPanertDataSet(element, "id");
                var id2 = RecordBill.Common.GetDataSetOrPanertDataSet(element, "nextid");
                IndexPage.ChangeStort(id1, id2);
            };
            /**
             * 更改位序
             * @param id1 第一个ID
             * @param id2 第二个ID
             */
            IndexPage.ChangeStort = function (id1, id2) {
                var url = RecordBill.Common.config.ServerURL + "api/BillTypes/ChangeStort";
                var data = {
                    ID1: id1,
                    ID2: id2
                };
                var SFun = function (resM, xhr, status) {
                    IndexPage.GetAllTypes();
                };
                var FFun = function (resM, xhr, status) {
                    RecordBill.Common.ShowMessageBox("调换位序失败：" + resM["Message"]);
                };
                var CFun = function (resM, xhr, status) {
                };
                RecordBill.Common.SendPost(url, data, SFun, FFun, CFun);
            };
            /**
             * 绑定列表
             * @param data
             */
            IndexPage.BindList = function (data) {
                var DataList = MDMa.$("DataList");
                if (DataList) {
                    DataList.innerHTML = "";
                    for (var i = 0; i < data.length; i++) {
                        var Item_Li = document.createElement("li");
                        MDMa.AddClass(Item_Li, "list-group-item");
                        Item_Li.dataset.id = data[i].ID;
                        DataList.appendChild(Item_Li);
                        var Item_Name = document.createTextNode(data[i].Name);
                        Item_Li.appendChild(Item_Name);
                        var btnGroup_Div = document.createElement("div");
                        MDMa.AddClass(btnGroup_Div, "btn-group btn-group-sm list-group-item-panel");
                        btnGroup_Div.setAttribute("role", "group");
                        Item_Li.appendChild(btnGroup_Div);
                        if (i > 0) {
                            var up_Button = document.createElement("button");
                            MDMa.AddClass(up_Button, "btn btn-success iconfont icon-Arrow_up");
                            MDMa.AddEvent(up_Button, "click", IndexPage.Event_BtnUp_Click);
                            btnGroup_Div.appendChild(up_Button);
                            Item_Li.dataset.upid = data[i - 1].ID;
                        }
                        if (i < data.length - 1) {
                            var down_Button = document.createElement("button");
                            MDMa.AddClass(down_Button, "btn btn-success iconfont icon-Arrow_down");
                            MDMa.AddEvent(down_Button, "click", IndexPage.Event_BtnDown_Click);
                            btnGroup_Div.appendChild(down_Button);
                            Item_Li.dataset.nextid = data[i + 1].ID;
                        }
                        var edit_Button = document.createElement("button");
                        MDMa.AddClass(edit_Button, "btn btn-info iconfont icon-edit");
                        MDMa.AddEvent(edit_Button, "click", IndexPage.Event_BtnGroupEdit_Click);
                        btnGroup_Div.appendChild(edit_Button);
                    }
                }
            };
            /**
             *页面配置
             */
            IndexPage.config = {
                SelectedID: ""
            };
            return IndexPage;
        }());
        BillType.IndexPage = IndexPage;
        /**
         * 账单类型模型
         */
        var BillTypeModel = /** @class */ (function () {
            function BillTypeModel() {
            }
            return BillTypeModel;
        }());
    })(BillType = RecordBill.BillType || (RecordBill.BillType = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.BillType.IndexPage();
});
//# sourceMappingURL=Index.js.map