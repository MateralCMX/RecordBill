/// <reference path="../../lib/jquery/jquery.d.ts" />
'use strict';
namespace RecordBill.User {
    export class LoginPage {
        /**
         * 构造方法
         */
        constructor() {
            Common.BindFooterInfo();
            this.BindEvent();
        }
        /**
         * 绑定事件
         */
        private BindEvent() {
            MDMa.AddEvent("btnLogin", "click", this.Event_BtnLogin_Click);
        }
        /**
         * 登录按钮单击事件
         * @param e
         */
        private Event_BtnLogin_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            element.disabled = true;
            element.innerText = "登录中......";
            let inputM: UserLoginRequestModel = Common.GetInputInfo("loginForm", function () {
                return {
                    Account: MDMa.GetInputValue("inputAccount"),
                    Password: MDMa.GetInputValue("inputPassword")
                } as UserLoginRequestModel;
            });
            if (inputM) {
                Common.SetLoginUserInfo();
                LoginPage.Login(inputM);
            }
            else {
                element.disabled = false;
                element.innerText = "登录";
            }
        }
        /**
         * 登录方法
         * @param InputM 请求对象
         */
        private static Login(InputM: UserLoginRequestModel) {
            let url = Common.config.ServerURL + "api/User/Login";
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.SetLoginUserInfo(resM["Data"]);
                let btnLogin = MDMa.$("btnLogin") as HTMLButtonElement;
                btnLogin.innerText = "登录成功";
                window.location.href = Common.config.ServerURL + "Home/Index";
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("登录失败：" + resM["Message"]);
                let btnLogin = MDMa.$("btnLogin") as HTMLButtonElement;
                btnLogin.disabled = false;
                btnLogin.innerText = "登录";
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
    let pageM = new RecordBill.User.LoginPage();
});