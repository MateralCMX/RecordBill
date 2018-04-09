/// <reference path="../../lib/jquery/jquery.d.ts" />
'use strict';
var RecordBill;
(function (RecordBill) {
    var User;
    (function (User) {
        var LoginPage = /** @class */ (function () {
            /**
             * 构造方法
             */
            function LoginPage() {
                RecordBill.Common.BindFooterInfo();
                this.BindEvent();
            }
            /**
             * 绑定事件
             */
            LoginPage.prototype.BindEvent = function () {
                MDMa.AddEvent("btnLogin", "click", this.Event_BtnLogin_Click);
            };
            /**
             * 登录按钮单击事件
             * @param e
             */
            LoginPage.prototype.Event_BtnLogin_Click = function (e) {
                var element = e.target;
                element.disabled = true;
                element.innerText = "登录中......";
                var inputM = RecordBill.Common.GetInputInfo("loginForm", function () {
                    return {
                        Account: MDMa.GetInputValue("inputAccount"),
                        Password: MDMa.GetInputValue("inputPassword")
                    };
                });
                if (inputM) {
                    RecordBill.Common.SetLoginUserInfo();
                    LoginPage.Login(inputM);
                }
                else {
                    element.disabled = false;
                    element.innerText = "登录";
                }
            };
            /**
             * 登录方法
             * @param InputM 请求对象
             */
            LoginPage.Login = function (InputM) {
                var url = RecordBill.Common.config.ServerURL + "api/User/Login";
                var SFun = function (resM, xhr, status) {
                    RecordBill.Common.SetLoginUserInfo(resM["Data"]);
                    var btnLogin = MDMa.$("btnLogin");
                    btnLogin.innerText = "登录成功";
                    window.location.href = RecordBill.Common.config.ServerURL + "Home/Index";
                };
                var FFun = function (resM, xhr, status) {
                    RecordBill.Common.ShowMessageBox("登录失败：" + resM["Message"]);
                    var btnLogin = MDMa.$("btnLogin");
                    btnLogin.disabled = false;
                    btnLogin.innerText = "登录";
                };
                var CFun = function (resM, xhr, status) {
                };
                RecordBill.Common.SendPost(url, InputM, SFun, FFun, CFun);
            };
            return LoginPage;
        }());
        User.LoginPage = LoginPage;
        /**
         * 用户登录请求模型
         */
        var UserLoginRequestModel = /** @class */ (function () {
            function UserLoginRequestModel() {
            }
            return UserLoginRequestModel;
        }());
    })(User = RecordBill.User || (RecordBill.User = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.User.LoginPage();
});
//# sourceMappingURL=Login.js.map