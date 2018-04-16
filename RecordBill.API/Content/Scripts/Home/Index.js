/// <reference path="../../lib/jquery/jquery.d.ts" />
'use strict';
var RecordBill;
(function (RecordBill) {
    var Home;
    (function (Home) {
        var IndexPage = /** @class */ (function () {
            /**
             * 构造方法
             */
            function IndexPage() {
                this.NavMenu = [
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
                this.BindEvent();
                this.BindLoginUserInfo();
                this.BindNavMenu();
            }
            /**
             * 绑定事件
             */
            IndexPage.prototype.BindEvent = function () {
                MDMa.AddEvent("BtnLogout", "click", this.Event_BtnLogout_Click);
                MDMa.AddEvent("BtnSave", "click", this.Event_BtnSave_Click);
                MDMa.AddEvent("BtnEditMyPassword", "click", this.Event_EditMyPassword_Click);
            };
            /**
             * 登录按钮单击事件
             * @param e
             */
            IndexPage.prototype.Event_BtnLogout_Click = function (e) {
                RecordBill.Common.SetLoginUserInfo();
                RecordBill.Common.GoToPage("Login");
            };
            /**
             * 获得登录用户信息
             * @param InputM 请求对象
             */
            IndexPage.prototype.BindLoginUserInfo = function () {
                var url = RecordBill.Common.config.ServerURL + "api/User/GetViewInfoByID";
                var loginUserM = RecordBill.Common.GetLoginUserInfo(true);
                var data = {
                    userID: loginUserM.UserID
                };
                var SFun = function (resM, xhr, status) {
                    var Data = resM["Data"];
                    MDMa.$("LoginUserNameDropdown").innerText = Data.Name;
                    var InputName = MDMa.$("InputName");
                    var InputAccount = MDMa.$("InputAccount");
                    InputName.value = Data.Name;
                    InputAccount.value = Data.Account;
                };
                var FFun = function (resM, xhr, status) {
                    RecordBill.Common.ShowMessageBox("查询用户信息失败：" + resM["Message"]);
                };
                var CFun = function (resM, xhr, status) {
                };
                RecordBill.Common.SendGet(url, data, SFun, FFun, CFun);
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
                    var loginUserM = RecordBill.Common.GetLoginUserInfo();
                    return {
                        ID: loginUserM.UserID,
                        Account: MDMa.GetInputValue("InputAccount"),
                        Name: MDMa.GetInputValue("InputName")
                    };
                });
                if (inputM) {
                    var url = RecordBill.Common.config.ServerURL + "api/User/Update";
                    var SFun = function (resM, xhr, status) {
                        element.disabled = false;
                        element.innerText = "保存";
                        MDMa.$("LoginUserNameDropdown").innerText = inputM.Name;
                        $("#EditModal").modal('toggle');
                        RecordBill.Common.ShowMessageBox("操作成功");
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
             * 修改我的密码按钮事件
             * @param e
             */
            IndexPage.prototype.Event_EditMyPassword_Click = function (e) {
                var element = e.target;
                element.disabled = true;
                element.innerText = "保存中......";
                var inputM = RecordBill.Common.GetInputInfo("EditMyPasswordForm", function () {
                    return {
                        OldPassword: MDMa.GetInputValue("InputOldPassword"),
                        NewPassword: MDMa.GetInputValue("InputNewPassword")
                    };
                });
                if (inputM) {
                    var url = RecordBill.Common.config.ServerURL + "api/User/EditMyPassword";
                    var SFun = function (resM, xhr, status) {
                        element.disabled = false;
                        element.innerText = "保存";
                        $("#EditMyPasswordModal").modal('toggle');
                        RecordBill.Common.ShowMessageBox("操作成功");
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
             * 绑定导航菜单
             */
            IndexPage.prototype.BindNavMenu = function () {
                var NavMenuList = MDMa.$("NavMenuList");
                if (NavMenuList) {
                    for (var i in this.NavMenu) {
                        var li = document.createElement("li");
                        MDMa.AddClass(li, "nav-item");
                        var a = document.createElement("a");
                        MDMa.AddClass(a, "nav-link");
                        a.dataset.target = this.NavMenu[i].Url;
                        a.innerText = this.NavMenu[i].Name;
                        MDMa.AddEvent(a, "click", this.Event_NavItem_Click);
                        li.appendChild(a);
                        NavMenuList.appendChild(li);
                    }
                }
            };
            IndexPage.prototype.Event_NavItem_Click = function (e) {
                var element = e.target;
                var target = element.dataset.target;
                var mainFrame = MDMa.$("mainFrame");
                if (target && mainFrame) {
                    mainFrame.src = target;
                }
            };
            return IndexPage;
        }());
        Home.IndexPage = IndexPage;
    })(Home = RecordBill.Home || (RecordBill.Home = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.Home.IndexPage();
});
//# sourceMappingURL=Index.js.map