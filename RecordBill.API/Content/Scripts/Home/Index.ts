/// <reference path="../../lib/jquery/jquery.d.ts" />
'use strict';
namespace RecordBill.Home {
    export class IndexPage {
        /**
         * 构造方法
         */
        constructor() {
            this.BindEvent();
            this.BindLoginUserInfo();
            this.BindNavMenu();
        }
        /**
         * 绑定事件
         */
        private BindEvent() {
            MDMa.AddEvent("BtnLogout", "click", this.Event_BtnLogout_Click);
            MDMa.AddEvent("BtnSave", "click", this.Event_BtnSave_Click);
            MDMa.AddEvent("BtnEditMyPassword", "click", this.Event_EditMyPassword_Click);
        }
        /**
         * 登录按钮单击事件
         * @param e
         */
        private Event_BtnLogout_Click(e: MouseEvent) {
            Common.SetLoginUserInfo();
            Common.GoToPage("Login");
        }
        /**
         * 获得登录用户信息
         * @param InputM 请求对象
         */
        private BindLoginUserInfo() {
            let url = Common.config.ServerURL + "api/User/GetViewInfoByID";
            let loginUserM = Common.GetLoginUserInfo(true);
            let data = {
                userID: loginUserM.UserID
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                let Data: UserModel = resM["Data"];
                MDMa.$("LoginUserNameDropdown").innerText = Data.Name;
                let InputName = MDMa.$("InputName") as HTMLInputElement
                let InputAccount = MDMa.$("InputAccount") as HTMLInputElement
                InputName.value = Data.Name;
                InputAccount.value = Data.Account;
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("查询用户信息失败：" + resM["Message"]);
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, SFun, FFun, CFun);
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
                let loginUserM = Common.GetLoginUserInfo();
                return {
                    ID: loginUserM.UserID,
                    Account: MDMa.GetInputValue("InputAccount"),
                    Name: MDMa.GetInputValue("InputName")
                } as UserModel;
            });
            if (inputM) {
                let url = Common.config.ServerURL + "api/User/Update";
                let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                    element.disabled = false;
                    element.innerText = "保存";
                    MDMa.$("LoginUserNameDropdown").innerText = inputM.Name;
                    $("#EditModal").modal('toggle');
                    Common.ShowMessageBox("操作成功");
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
         * 修改我的密码按钮事件
         * @param e
         */
        private Event_EditMyPassword_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            element.disabled = true;
            element.innerText = "保存中......";
            let inputM = Common.GetInputInfo("EditMyPasswordForm", function () {
                return {
                    OldPassword: MDMa.GetInputValue("InputOldPassword"),
                    NewPassword: MDMa.GetInputValue("InputNewPassword")
                };
            });
            if (inputM) {
                let url = Common.config.ServerURL + "api/User/EditMyPassword";
                let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                    element.disabled = false;
                    element.innerText = "保存";
                    $("#EditMyPasswordModal").modal('toggle');
                    Common.ShowMessageBox("操作成功");
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
        private NavMenu = [
            {
                Url: "/User/Index",
                Name: "用户中心"
            },
            {
                Url: "/BillType/Index",
                Name: "账单类型"
            },
            {
                Url: "/Help",
                Name: "API文档"
            },
        ];
        /**
         * 绑定导航菜单
         */
        private BindNavMenu() {
            let NavMenuList = MDMa.$("NavMenuList");
            if (NavMenuList) {
                for (var i in this.NavMenu) {
                    let li = document.createElement("li");
                    MDMa.AddClass(li, "nav-item");
                    let a = document.createElement("a");
                    MDMa.AddClass(a, "nav-link");
                    a.dataset.target = this.NavMenu[i].Url;
                    a.innerText = this.NavMenu[i].Name;
                    MDMa.AddEvent(a, "click", this.Event_NavItem_Click);
                    li.appendChild(a);
                    NavMenuList.appendChild(li);
                }
            }
        }
        private Event_NavItem_Click(e: MouseEvent) {
            let element = e.target as HTMLAnchorElement;
            let target = element.dataset.target;
            let mainFrame = MDMa.$("mainFrame") as HTMLIFrameElement;
            if (target && mainFrame) {
                mainFrame.src = target;
            }
        }
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.Home.IndexPage();
});