/// <reference path="../../../lib/m-tools/m-tools.ts" />
/// <reference path="../base.ts" />
var RecordBill;
(function (RecordBill) {
    var APP;
    (function (APP) {
        var User;
        (function (User) {
            var LoginPage = /** @class */ (function () {
                /**
                 * 构造函数
                 */
                function LoginPage() {
                    window["mui"]["init"]();
                    this.BindeEvent();
                }
                /**
                 * 绑定事件
                 */
                LoginPage.prototype.BindeEvent = function () {
                    MDMa.AddEvent("BtnLogin", "tap", this.Event_BtnLogin_Tap);
                    MDMa.AddEvent("InputAccount", "invalid", function (e) {
                        MDMa.AddClass(e.target.parentElement, "error");
                    });
                    MDMa.AddEvent("InputAccount", "change", function (e) {
                        MDMa.RemoveClass(e.target.parentElement, "error");
                    });
                    MDMa.AddEvent("InputPassword", "invalid", function (e) {
                        MDMa.AddClass(e.target.parentElement, "error");
                    });
                    MDMa.AddEvent("InputPassword", "change", function (e) {
                        MDMa.RemoveClass(e.target.parentElement, "error");
                    });
                };
                /**
                 * 登录按钮点击事件
                 * @param e
                 */
                LoginPage.prototype.Event_BtnLogin_Tap = function (e) {
                    var element = e.target;
                    window["mui"](element).button('loading');
                    var InputM = LoginPage.GetInputData();
                    if (InputM) {
                        LoginPage.Login(InputM);
                    }
                    else {
                        window["mui"](element).button('reset');
                    }
                };
                /**
                * 获得输入数据
                */
                LoginPage.GetInputData = function () {
                    var loginForm = MDMa.$("loginForm");
                    if (loginForm.checkValidity()) {
                        return {
                            Account: MDMa.GetInputValue("InputAccount"),
                            Password: MDMa.GetInputValue("InputPassword")
                        };
                    }
                    return null;
                };
                /**
                 * 登录方法
                 * @param InputM 请求对象
                 */
                LoginPage.Login = function (InputM) {
                    var url = APP.Common.config.ServerURL + "api/User/Login";
                    var SFun = function (resM, xhr, status) {
                        APP.Common.SetLoginUserInfo(resM["Data"]);
                        window["mui"]["openWindow"]({
                            url: "/View/Index.html",
                            id: "Index",
                            styles: {
                                top: 0,
                                bottom: 0,
                            },
                            extras: {},
                            createNew: false,
                            show: {
                                autoShow: true,
                                aniShow: "slide-in-right",
                            },
                            waiting: {
                                title: '正在加载...',
                            }
                        });
                    };
                    var FFun = function (resM, xhr, status) {
                        window["mui"]["toast"]("帐号或者密码错误");
                        window["mui"]("#BtnLogin").button('reset');
                    };
                    var CFun = function (resM, xhr, status) {
                    };
                    APP.Common.SendPost(url, InputM, SFun, FFun, CFun);
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
        })(User = APP.User || (APP.User = {}));
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.APP.User.LoginPage();
});
//# sourceMappingURL=Login.js.map