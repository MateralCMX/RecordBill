var RecordBill;
(function (RecordBill) {
    var APP;
    (function (APP) {
        var Home;
        (function (Home) {
            var SettingPage = /** @class */ (function () {
                /**
                 * 构造函数
                 */
                function SettingPage() {
                    mui.init();
                    this.BindeEvent();
                    this.GetLoginUserInfo();
                }
                /**
                 * 绑定事件
                 */
                SettingPage.prototype.BindeEvent = function () {
                    MDMa.AddEvent("BtnLogout", "tap", this.Event_BtnLogout_Tap);
                };
                /**
                 * 登出按钮
                 * @param e
                 */
                SettingPage.prototype.Event_BtnLogout_Tap = function (e) {
                    var element = e.target;
                    mui(element).button('loading');
                    APP.Common.SetLoginUserInfo();
                    mui(element).button('reset');
                    element.disabled = true;
                    element.innerText = "已安全退出";
                    setTimeout(function () {
                        APP.Common.GoToPage("Login");
                    }, 1000);
                };
                /**
                 * 获得登录用户信息
                 */
                SettingPage.prototype.GetLoginUserInfo = function () {
                    var loginUserM = APP.Common.GetLoginUserInfo(true);
                    var url = APP.Common.config.ServerURL + "api/User/GetViewInfoByID";
                    var data = {
                        userID: loginUserM.UserID
                    };
                    var SFun = function (resM, xhr, status) {
                        var data = resM["Data"];
                        var LoginUserName = MDMa.$("LoginUserName");
                        if (LoginUserName) {
                            LoginUserName.innerText = data.Name;
                        }
                        var LoginUserAccount = MDMa.$("LoginUserAccount");
                        if (LoginUserAccount) {
                            LoginUserAccount.innerText = "账号：" + data.Account;
                        }
                    };
                    var FFun = function (resM, xhr, status) {
                    };
                    var CFun = function (resM, xhr, status) {
                    };
                    APP.Common.SendGet(url, data, SFun, FFun, CFun);
                };
                return SettingPage;
            }());
            Home.SettingPage = SettingPage;
        })(Home = APP.Home || (APP.Home = {}));
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.APP.Home.SettingPage();
});
//# sourceMappingURL=Setting.js.map