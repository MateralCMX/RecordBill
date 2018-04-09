/// <reference path="../../../lib/m-tools/m-tools.ts" />
/// <reference path="../base.ts" />
namespace RecordBill.APP.User {
    export class LoginPage {
        /**
         * 构造函数
         */
        constructor() {
            window["mui"]["init"]();
            this.BindeEvent();
        }
        /**
         * 绑定事件
         */
        private BindeEvent() {
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
        }
        /**
         * 登录按钮点击事件
         * @param e
         */
        private Event_BtnLogin_Tap(e) {
            let element = e.target;
            window["mui"](element).button('loading');
            var InputM = LoginPage.GetInputData();
            if (InputM) {
                LoginPage.Login(InputM);
            }
            else {
                window["mui"](element).button('reset');
            }
        }
        /**
        * 获得输入数据
        */
        private static GetInputData() {
            var loginForm = MDMa.$("loginForm") as HTMLFormElement;
            if (loginForm.checkValidity()) {
                return {
                    Account: MDMa.GetInputValue("InputAccount"),
                    Password: MDMa.GetInputValue("InputPassword")
                }
            }
            return null;
        }
        /**
         * 登录方法
         * @param InputM 请求对象
         */
        private static Login(InputM: UserLoginRequestModel) {
            let url = Common.config.ServerURL + "api/User/Login";
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.SetLoginUserInfo(resM["Data"]);
                window.location.href = "/View/Index.html";
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                window["mui"].alert("帐号或者密码错误");
                window["mui"]("#BtnLogin").button('reset');
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendPost(url, InputM, SFun, FFun, CFun);
        }
    }
    /**
     * 用户登录请求模型
     */
    class UserLoginRequestModel {
        /*账号*/
        public Account: string;
        /*密码*/
        public Password: string;
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.APP.User.LoginPage();
});