/// <reference path="../../lib/jquery/jquery.d.ts" />
'use strict';
var RecordBill;
(function (RecordBill) {
    var User;
    (function (User) {
        var IndexPage = /** @class */ (function () {
            /**
             * 构造方法
             */
            function IndexPage() {
                this.BindEvent();
                IndexPage.Search(RecordBill.Common.config.PageInfo.PagingIndex);
            }
            /**
             * 绑定事件
             */
            IndexPage.prototype.BindEvent = function () {
                MDMa.AddEvent("BtnSearch", "click", function () {
                    IndexPage.Search(RecordBill.Common.config.PageInfo.PagingIndex);
                });
                MDMa.AddEvent("BtnAdd", "click", this.Event_BtnAdd_Click);
                MDMa.AddEvent("BtnSave", "click", this.Event_BtnSave_Click);
                MDMa.AddEvent("BtnResetPassword", "click", this.Event_BtnResetPassword_Click);
                MDMa.AddEvent("BtnDelete", "click", this.Event_BtnDelete_Click);
            };
            /**
             * 设置输入模型
             * @param inputM
             */
            IndexPage.SetInputInfo = function (inputM) {
                if (inputM === void 0) { inputM = { ID: "", Name: "", Account: "" }; }
                var InputName = MDMa.$("InputName");
                var InputAccount = MDMa.$("InputAccount");
                InputName.value = inputM.Name;
                InputAccount.value = inputM.Account;
                IndexPage.config.SelectedID = inputM.ID;
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
                        Account: MDMa.GetInputValue("InputAccount"),
                        Name: MDMa.GetInputValue("InputName")
                    };
                });
                if (inputM) {
                    var url = RecordBill.Common.config.ServerURL;
                    if (IndexPage.config.SelectedID) {
                        url += "api/User/Update";
                    }
                    else {
                        url += "api/User/Add";
                    }
                    var SFun = function (resM, xhr, status) {
                        element.disabled = false;
                        element.innerText = "保存";
                        $("#EditModal").modal('toggle');
                        RecordBill.Common.ShowMessageBox("操作成功");
                        IndexPage.Search(RecordBill.Common.config.PageInfo.PagingIndex);
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
             * 重置密码按钮事件
             * @param e
             */
            IndexPage.prototype.Event_BtnResetPassword_Click = function (e) {
                var url = RecordBill.Common.config.ServerURL + "api/User/ResetPassword";
                var data = {
                    ID: IndexPage.config.SelectedID
                };
                var SFun = function (resM, xhr, status) {
                    $("#ResetPasswordModal").modal('toggle');
                    RecordBill.Common.ShowMessageBox("密码已重置为：" + resM["Data"]);
                };
                var FFun = function (resM, xhr, status) {
                    RecordBill.Common.ShowMessageBox("密码重置失败：" + resM["Message"]);
                };
                var CFun = function (resM, xhr, status) {
                };
                RecordBill.Common.SendPost(url, data, SFun, FFun, CFun);
            };
            /**
             * 删除按钮事件
             * @param e
             */
            IndexPage.prototype.Event_BtnDelete_Click = function (e) {
                var url = RecordBill.Common.config.ServerURL + "api/User/Delete";
                var data = {
                    ID: IndexPage.config.SelectedID
                };
                var SFun = function (resM, xhr, status) {
                    $("#DeleteModal").modal('toggle');
                    RecordBill.Common.ShowMessageBox("操作成功");
                    IndexPage.Search(RecordBill.Common.config.PageInfo.PagingIndex);
                };
                var FFun = function (resM, xhr, status) {
                    RecordBill.Common.ShowMessageBox("操作失败：" + resM["Message"]);
                };
                var CFun = function (resM, xhr, status) {
                };
                RecordBill.Common.SendPost(url, data, SFun, FFun, CFun);
            };
            /**
             * 列表删除按钮事件
             * @param e
             */
            IndexPage.Event_BtnGroupDelete_Click = function (e) {
                var element = e.target;
                var id = RecordBill.Common.GetDataSetOrPanertDataSet(element, "id");
                IndexPage.SetInputInfo({ ID: id, Name: "", Account: "" });
                $("#DeleteModal").modal('toggle');
            };
            /**
             * 列表重置密码按钮事件
             * @param e
             */
            IndexPage.Event_BtnGroupResetPassword_Click = function (e) {
                var element = e.target;
                var id = RecordBill.Common.GetDataSetOrPanertDataSet(element, "id");
                IndexPage.SetInputInfo({ ID: id, Name: "", Account: "" });
                $("#ResetPasswordModal").modal('toggle');
            };
            /**
             * 列表编辑按钮事件
             * @param e
             */
            IndexPage.Event_BtnGroupEdit_Click = function (e) {
                var element = e.target;
                var id = RecordBill.Common.GetDataSetOrPanertDataSet(element, "id");
                if (id) {
                    IndexPage.GetUserInfoByID(id, function (resM) {
                        IndexPage.SetInputInfo(resM["Data"]);
                        $("#EditModal").modal('toggle');
                    });
                }
            };
            /**
             * 根据ID获得用户信息
             * @param id ID
             * @param sfun 成功方法
             */
            IndexPage.GetUserInfoByID = function (id, sfun) {
                var url = RecordBill.Common.config.ServerURL + "api/User/GetViewInfoByID";
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
             * 查询列表
             * @param pagingIndex 显示页数
             */
            IndexPage.Search = function (pagingIndex) {
                var url = RecordBill.Common.config.ServerURL + "api/User/GetViewInfoByWhere";
                var data = {
                    name: MDMa.GetInputValue("SearchName"),
                    account: MDMa.GetInputValue("SearchAccount"),
                    pagingIndex: pagingIndex,
                    pagingSize: RecordBill.Common.config.PageInfo.PagingSize
                };
                var SFun = function (resM, xhr, status) {
                    var data = resM["Data"]["Data"];
                    RecordBill.Common.config.PageInfo = resM["Data"]["PageInfo"];
                    /*绑定数据*/
                    IndexPage.BindList(data);
                    /*绑定分页工具栏*/
                    RecordBill.Common.BindPageInfo(IndexPage.Event_BtnPage_Click);
                };
                var FFun = function (resM, xhr, status) {
                    RecordBill.Common.ShowMessageBox("查询失败：" + resM["Message"]);
                };
                var CFun = function (resM, xhr, status) {
                };
                RecordBill.Common.SendGet(url, data, SFun, FFun, CFun);
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
                        var trRow = document.createElement("tr");
                        trRow.setAttribute("scope", "row");
                        DataList.appendChild(trRow);
                        var thIndex = document.createElement("th");
                        trRow.appendChild(thIndex);
                        thIndex.innerText = (i + 1).toString();
                        var tdName = document.createElement("td");
                        trRow.appendChild(tdName);
                        tdName.innerText = data[i].Name;
                        var tdAccount = document.createElement("td");
                        trRow.appendChild(tdAccount);
                        tdAccount.innerText = data[i].Account;
                        var tdBtns = document.createElement("td");
                        trRow.appendChild(tdBtns);
                        var divBtnGroup = document.createElement("div");
                        tdBtns.appendChild(divBtnGroup);
                        divBtnGroup.setAttribute("role", "group");
                        divBtnGroup.dataset.id = data[i].ID;
                        MDMa.AddClass(divBtnGroup, ["btn-group", "btn-group-sm"]);
                        var btnRepwd = document.createElement("button");
                        MDMa.AddClass(btnRepwd, ["btn", "btn-secondary", "iconfont", "icon-reset"]);
                        MDMa.AddEvent(btnRepwd, "click", this.Event_BtnGroupResetPassword_Click);
                        divBtnGroup.appendChild(btnRepwd);
                        var btnEdit = document.createElement("button");
                        MDMa.AddClass(btnEdit, ["btn", "btn-info", "iconfont", "icon-edit"]);
                        MDMa.AddEvent(btnEdit, "click", this.Event_BtnGroupEdit_Click);
                        divBtnGroup.appendChild(btnEdit);
                        var btnDelete = document.createElement("button");
                        MDMa.AddClass(btnDelete, ["btn", "btn-danger", "iconfont", "icon-delete"]);
                        MDMa.AddEvent(btnDelete, "click", this.Event_BtnGroupDelete_Click);
                        divBtnGroup.appendChild(btnDelete);
                    }
                }
            };
            /**
             * 翻页按钮事件
             * @param e
             */
            IndexPage.Event_BtnPage_Click = function (e) {
                var value;
                var element = e.target;
                do {
                    value = element.dataset.id;
                } while (!value);
                IndexPage.Search(parseInt(value));
            };
            /**
             *页面配置
             */
            IndexPage.config = {
                SelectedID: ""
            };
            return IndexPage;
        }());
        User.IndexPage = IndexPage;
    })(User = RecordBill.User || (RecordBill.User = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.User.IndexPage();
});
//# sourceMappingURL=Index.js.map