/// <reference path="../../lib/jquery/jquery.d.ts" />
'use strict';
namespace RecordBill.User {
    export class IndexPage {
        /**
         *页面配置 
         */
        private static config = {
            SelectedID: ""
        }
        /**
         * 构造方法
         */
        constructor() {
            this.BindEvent();
            IndexPage.Search(Common.config.PageInfo.PagingIndex);
        }
        /**
         * 绑定事件
         */
        private BindEvent() {
            MDMa.AddEvent("BtnSearch", "click", function () {
                IndexPage.Search(Common.config.PageInfo.PagingIndex);
            });
            MDMa.AddEvent("BtnAdd", "click", this.Event_BtnAdd_Click);
            MDMa.AddEvent("BtnSave", "click", this.Event_BtnSave_Click);
            MDMa.AddEvent("BtnResetPassword", "click", this.Event_BtnResetPassword_Click);
            MDMa.AddEvent("BtnDelete", "click", this.Event_BtnDelete_Click);
        }
        /**
         * 设置输入模型
         * @param inputM
         */
        private static SetInputInfo(inputM: UserModel = { ID: "", Name: "", Account: "" }) {
            let InputName = MDMa.$("InputName") as HTMLInputElement
            let InputAccount = MDMa.$("InputAccount") as HTMLInputElement
            InputName.value = inputM.Name;
            InputAccount.value = inputM.Account;
            IndexPage.config.SelectedID = inputM.ID;
        }
        /**
         * 添加按钮事件
         * @param e
         */
        private Event_BtnAdd_Click(e: MouseEvent) {
            IndexPage.SetInputInfo();
            $("#EditModal").modal('toggle');
        }
        /**
         * 保存按钮事件
         * @param e
         */
        private Event_BtnSave_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            element.disabled = true;
            element.innerText = "保存中......";
            let inputM: UserModel = Common.GetInputInfo("InputForm", function () {
                return {
                    ID: IndexPage.config.SelectedID,
                    Account: MDMa.GetInputValue("InputAccount"),
                    Name: MDMa.GetInputValue("InputName")
                } as UserModel;
            });
            if (inputM) {
                let url = Common.config.ServerURL;
                if (IndexPage.config.SelectedID) {
                    url += "api/User/Update";
                }
                else {
                    url += "api/User/Add";
                }
                let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                    element.disabled = false;
                    element.innerText = "保存";
                    $("#EditModal").modal('toggle');
                    Common.ShowMessageBox("操作成功");
                    IndexPage.Search(Common.config.PageInfo.PagingIndex);
                };
                let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                    Common.ShowMessageBox("操作失败：" + resM["Message"]);
                };
                let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                };
                Common.SendPost(url, inputM, SFun, FFun, CFun);
            }
            else {
                element.disabled = false;
                element.innerText = "保存";
            }
        }
        /**
         * 重置密码按钮事件
         * @param e
         */
        private Event_BtnResetPassword_Click(e: MouseEvent) {
            let url = Common.config.ServerURL + "api/User/ResetPassword";
            let data = {
                ID: IndexPage.config.SelectedID
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                $("#ResetPasswordModal").modal('toggle');
                Common.ShowMessageBox("密码已重置为：" + resM["Data"]);
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("密码重置失败：" + resM["Message"]);
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendPost(url, data, SFun, FFun, CFun);
        }
        /**
         * 删除按钮事件
         * @param e
         */
        private Event_BtnDelete_Click(e: MouseEvent) {
            let url = Common.config.ServerURL + "api/User/Delete";
            let data = {
                ID: IndexPage.config.SelectedID
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                $("#DeleteModal").modal('toggle');
                Common.ShowMessageBox("操作成功");
                IndexPage.Search(Common.config.PageInfo.PagingIndex);
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("操作失败：" + resM["Message"]);
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendPost(url, data, SFun, FFun, CFun);
        }
        /**
         * 列表删除按钮事件
         * @param e
         */
        private static Event_BtnGroupDelete_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            let id = Common.GetDataSetOrPanertDataSet(element, "id");
            IndexPage.SetInputInfo({ ID: id, Name: "", Account: "" });
            $("#DeleteModal").modal('toggle');
        }
        /**
         * 列表重置密码按钮事件
         * @param e
         */
        private static Event_BtnGroupResetPassword_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            let id = Common.GetDataSetOrPanertDataSet(element, "id");
            IndexPage.SetInputInfo({ ID: id, Name: "", Account: "" });
            $("#ResetPasswordModal").modal('toggle');
        }
        /**
         * 列表编辑按钮事件
         * @param e
         */
        private static Event_BtnGroupEdit_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            let id = Common.GetDataSetOrPanertDataSet(element, "id");
            if (id) {
                IndexPage.GetUserInfoByID(id, function (resM) {
                    IndexPage.SetInputInfo(resM["Data"] as UserModel);
                    $("#EditModal").modal('toggle');
                });
            }
        }
        /**
         * 根据ID获得用户信息
         * @param id ID
         * @param sfun 成功方法
         */
        private static GetUserInfoByID(id: string, sfun: Function) {
            let url = Common.config.ServerURL + "api/User/GetViewInfoByID";
            let data = {
                userID: id
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("查询失败：" + resM["Message"]);
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, sfun, FFun, CFun);
        }
        /**
         * 查询列表
         * @param pagingIndex 显示页数
         */
        private static Search(pagingIndex: number) {
            let url = Common.config.ServerURL + "api/User/GetViewInfoByWhere";
            let data = {
                name: MDMa.GetInputValue("SearchName"),
                account: MDMa.GetInputValue("SearchAccount"),
                pagingIndex: pagingIndex,
                pagingSize: Common.config.PageInfo.PagingSize
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                let data = resM["Data"]["Data"] as UserModel[];
                Common.config.PageInfo = resM["Data"]["PageInfo"] as PageMode;
                /*绑定数据*/
                IndexPage.BindList(data);
                /*绑定分页工具栏*/
                Common.BindPageInfo(IndexPage.Event_BtnPage_Click);
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("查询失败：" + resM["Message"]);
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, SFun, FFun, CFun);
        }
        /**
         * 绑定列表
         * @param data
         */
        private static BindList(data: UserModel[]) {
            let DataList = MDMa.$("DataList") as HTMLTableSectionElement;
            if (DataList) {
                DataList.innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    let trRow = document.createElement("tr");
                    trRow.setAttribute("scope", "row");
                    DataList.appendChild(trRow);
                    let thIndex = document.createElement("th");
                    trRow.appendChild(thIndex);
                    thIndex.innerText = (i + 1).toString();
                    let tdName = document.createElement("td");
                    trRow.appendChild(tdName);
                    tdName.innerText = data[i].Name;
                    let tdAccount = document.createElement("td");
                    trRow.appendChild(tdAccount);
                    tdAccount.innerText = data[i].Account;
                    let tdBtns = document.createElement("td");
                    trRow.appendChild(tdBtns);
                    let divBtnGroup = document.createElement("div");
                    tdBtns.appendChild(divBtnGroup);
                    divBtnGroup.setAttribute("role", "group");
                    divBtnGroup.dataset.id = data[i].ID;
                    MDMa.AddClass(divBtnGroup, ["btn-group", "btn-group-sm"]);
                    let btnRepwd = document.createElement("button");
                    MDMa.AddClass(btnRepwd, ["btn", "btn-secondary", "iconfont", "icon-reset"]);
                    MDMa.AddEvent(btnRepwd, "click", this.Event_BtnGroupResetPassword_Click);
                    divBtnGroup.appendChild(btnRepwd);
                    let btnEdit = document.createElement("button");
                    MDMa.AddClass(btnEdit, ["btn", "btn-info", "iconfont", "icon-edit"]);
                    MDMa.AddEvent(btnEdit, "click", this.Event_BtnGroupEdit_Click);
                    divBtnGroup.appendChild(btnEdit);
                    let btnDelete = document.createElement("button");
                    MDMa.AddClass(btnDelete, ["btn", "btn-danger", "iconfont", "icon-delete"]);
                    MDMa.AddEvent(btnDelete, "click", this.Event_BtnGroupDelete_Click);
                    divBtnGroup.appendChild(btnDelete);
                }
            }
        }
        /**
         * 翻页按钮事件
         * @param e
         */
        private static Event_BtnPage_Click(e: MouseEvent) {
            let value;
            let element: HTMLElement = e.target as HTMLElement;
            do {
                value = element.dataset.id;
            } while (!value);
            IndexPage.Search(parseInt(value));
        }
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.User.IndexPage();
});