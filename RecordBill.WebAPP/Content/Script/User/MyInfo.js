var RecordBill;
(function (RecordBill) {
    var APP;
    (function (APP) {
        var User;
        (function (User) {
            var MyInfoPage = /** @class */ (function () {
                /**
                 * 构造函数
                 */
                function MyInfoPage() {
                    mui.init();
                    this.BindeEvent();
                    this.GetLoginUserInfo();
                }
                /**
                 * 绑定事件
                 */
                MyInfoPage.prototype.BindeEvent = function () {
                    MDMa.AddEvent("BtnEditName", "tap", this.Event_BtnEditName_Tap);
                };
                /**
                 *  修改名称按钮触摸事件
                 * @param e
                 */
                MyInfoPage.prototype.Event_BtnEditName_Tap = function (e) {
                    mui.prompt("text", "deftext", "title", ["取消", "确定"], function (e) {
                        if (e.index == 1) {
                        }
                    });
                };
                MyInfoPage.EditUserInfo = function () {
                    var loginUserM = APP.Common.GetLoginUserInfo();
                    var url = APP.Common.config.ServerURL + "api/User/GetViewInfoByID";
                    var data = {
                        userID: loginUserM.UserID
                    };
                    var SFun = function (resM, xhr, status) {
                        MyInfoPage.config.loginUserInfo = resM["Data"];
                        MyInfoPage.UpdateLoginUserInfo();
                    };
                    var FFun = function (resM, xhr, status) {
                    };
                    var CFun = function (resM, xhr, status) {
                    };
                    APP.Common.SendGet(url, data, SFun, FFun, CFun);
                };
                /**
                 * 更新登录用户信息
                 */
                MyInfoPage.UpdateLoginUserInfo = function () {
                    var LoginUserName = MDMa.$("LoginUserName");
                    if (LoginUserName) {
                        LoginUserName.innerText = MyInfoPage.config.loginUserInfo.Name;
                    }
                    var LoginUserAccount = MDMa.$("LoginUserAccount");
                    if (LoginUserAccount) {
                        LoginUserAccount.innerText = MyInfoPage.config.loginUserInfo.Account;
                    }
                };
                /**
                 * 获得登录用户信息
                 */
                MyInfoPage.prototype.GetLoginUserInfo = function () {
                    var loginUserM = APP.Common.GetLoginUserInfo();
                    var url = APP.Common.config.ServerURL + "api/User/GetViewInfoByID";
                    var data = {
                        userID: loginUserM.UserID
                    };
                    var SFun = function (resM, xhr, status) {
                        MyInfoPage.config.loginUserInfo = resM["Data"];
                        MyInfoPage.UpdateLoginUserInfo();
                    };
                    var FFun = function (resM, xhr, status) {
                    };
                    var CFun = function (resM, xhr, status) {
                    };
                    APP.Common.SendGet(url, data, SFun, FFun, CFun);
                };
                MyInfoPage.config = {
                    loginUserInfo: {
                        ID: "",
                        Account: "",
                        Name: ""
                    }
                };
                return MyInfoPage;
            }());
            User.MyInfoPage = MyInfoPage;
        })(User = APP.User || (APP.User = {}));
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.APP.User.MyInfoPage();
});
//# sourceMappingURL=MyInfo.js.map