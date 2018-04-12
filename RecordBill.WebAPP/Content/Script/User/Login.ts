namespace RecordBill.APP.User {
    export class LoginPage {
        /**
         * 构造函数
         */
        constructor() {
            mui.init({
                beforeback: function () {
                    if (plus) {
                        var self = plus.webview.currentWebview().opener();
                        mui.fire(self, 'init');
                    }
                    return true;
                }
            });
            this.BindeEvent();
        }
        /**
         * 绑定事件
         */
        private BindeEvent() {
            MDMa.AddEvent("BtnLogin", "tap", this.Event_BtnLogin_Tap);
            MDMa.AddEvent("InputAccount", "invalid", this.Event_InputAccount_Invalid);
            MDMa.AddEvent("InputAccount", "change", Common.RemoveError);
            MDMa.AddEvent("InputPassword", "invalid", this.Event_InputPassword_Invalid);
            MDMa.AddEvent("InputPassword", "change", Common.RemoveError);
        }
        /**
         * 账号验证事件
         * @param e
         */
        private Event_InputAccount_Invalid(e: Event) {
            let validity: ValidityState = Common.GetValidityState(e);
            if (validity.valueMissing) {
                mui.toast("请填写账号");
            }
        }
        /**
         * 密码验证事件
         * @param e
         */
        private Event_InputPassword_Invalid(e: Event) {
            let validity: ValidityState = Common.GetValidityState(e);
            if (validity.valueMissing) {
                mui.toast("请填写密码");
            }
        }
        /**
         * 登录按钮点击事件
         * @param e
         */
        private Event_BtnLogin_Tap(e) {
            let element = e.target;
            mui(element).button('loading');
            var InputM = LoginPage.GetInputData();
            if (InputM) {
                LoginPage.Login(InputM);
            }
            else {
                mui(element).button('reset');
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
                mui.back();
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                mui.toast("帐号或者密码错误");
                mui("#BtnLogin").button('reset');
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