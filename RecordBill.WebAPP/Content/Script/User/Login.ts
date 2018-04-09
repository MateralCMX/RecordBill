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
                window["mui"]["openWindow"]({
                    url: "/View/Index.html",
                    id: "Index",
                    styles: {
                        top: 0,//新页面顶部位置
                        bottom: 0,//新页面底部位置
                    },
                    extras: {
                    },
                    createNew: false,//是否重复创建同样id的webview，默认为false:不重复创建，直接显示
                    show: {
                        autoShow: true,//页面loaded事件发生后自动显示，默认为true
                        aniShow: "slide-in-right",//页面显示动画，默认为”slide-in-right“；
                    },
                    waiting: {
                        title: '正在加载...',//等待对话框上显示的提示内容
                    }
                })
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                window["mui"]["toast"]("帐号或者密码错误");
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