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
                    mui.init();
                    this.BindeEvent();
                }
                /**
                 * 绑定事件
                 */
                LoginPage.prototype.BindeEvent = function () {
                    MDMa.AddEvent("BtnLogin", "tap", this.Event_BtnLogin_Tap);
                    MDMa.AddEvent("InputAccount", "invalid", this.Event_InputAccount_Invalid);
                    MDMa.AddEvent("InputAccount", "change", APP.Common.RemoveError);
                    MDMa.AddEvent("InputPassword", "invalid", this.Event_InputPassword_Invalid);
                    MDMa.AddEvent("InputPassword", "change", APP.Common.RemoveError);
                };
                /**
                 * 账号验证事件
                 * @param e
                 */
                LoginPage.prototype.Event_InputAccount_Invalid = function (e) {
                    var validity = APP.Common.GetValidityState(e);
                    if (validity.valueMissing) {
                        mui.toast("请填写账号");
                    }
                };
                /**
                 * 密码验证事件
                 * @param e
                 */
                LoginPage.prototype.Event_InputPassword_Invalid = function (e) {
                    var validity = APP.Common.GetValidityState(e);
                    if (validity.valueMissing) {
                        mui.toast("请填写密码");
                    }
                };
                /**
                 * 登录按钮点击事件
                 * @param e
                 */
                LoginPage.prototype.Event_BtnLogin_Tap = function (e) {
                    var element = e.target;
                    mui(element).button('loading');
                    var InputM = LoginPage.GetInputData();
                    if (InputM) {
                        LoginPage.Login(InputM);
                    }
                    else {
                        mui(element).button('reset');
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
                        mui.back();
                    };
                    var FFun = function (resM, xhr, status) {
                        mui.toast("帐号或者密码错误");
                        mui("#BtnLogin").button('reset');
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