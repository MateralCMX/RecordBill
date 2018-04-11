namespace RecordBill.APP.Home {
    export class SettingPage {
        /**
         * 构造函数
         */
        constructor() {
            mui.init();
            this.BindeEvent();
            this.GetLoginUserInfo();
        }
        /**
         * 绑定事件
         */
        private BindeEvent() {
            MDMa.AddEvent("BtnLogout", "tap", this.Event_BtnLogout_Tap);
        }
        /**
         * 登出按钮
         * @param e
         */
        private Event_BtnLogout_Tap(e: Event) {
            let element = e.target as HTMLButtonElement;
            mui(element).button('loading');
            Common.SetLoginUserInfo();
            mui(element).button('reset');
            element.disabled = true;
            element.innerText = "已安全退出";
            setTimeout(function () {
                Common.GoToPage("Login");
            }, 1000);
        }
        /**
         * 获得登录用户信息
         */
        private GetLoginUserInfo() {
            let loginUserM = Common.GetLoginUserInfo(true);
            let url = Common.config.ServerURL + "api/User/GetViewInfoByID";
            let data = {
                userID: loginUserM.UserID
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                let data = resM["Data"] as UserModel;
                let LoginUserName = MDMa.$("LoginUserName") as HTMLSpanElement;
                if (LoginUserName) {
                    LoginUserName.innerText = data.Name;
                }
                let LoginUserAccount = MDMa.$("LoginUserAccount") as HTMLParagraphElement;
                if (LoginUserAccount) {
                    LoginUserAccount.innerText = "账号：" + data.Account;
                }
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, SFun, FFun, CFun);
        }
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.APP.Home.SettingPage();
});