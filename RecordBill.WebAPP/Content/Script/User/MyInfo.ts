namespace RecordBill.APP.User {
    export class MyInfoPage {
        private static config = {
            loginUserInfo: {
                ID: "",
                Account: "",
                Name: ""
            } as UserModel
        };
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
            MDMa.AddEvent("BtnEditName", "tap", this.Event_BtnEditName_Tap);
        }
        /**
         *  修改名称按钮触摸事件
         * @param e
         */
        private Event_BtnEditName_Tap(e: MouseEvent) {
            mui.prompt("text", "deftext", "title", ["取消", "确定"], function (e) {
                if (e.index == 1) {

                }
            });
        }
        private static EditUserInfo() {
            let loginUserM = Common.GetLoginUserInfo();
            let url = Common.config.ServerURL + "api/User/GetViewInfoByID";
            let data = {
                userID: loginUserM.UserID
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                MyInfoPage.config.loginUserInfo = resM["Data"] as UserModel;
                MyInfoPage.UpdateLoginUserInfo();
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, SFun, FFun, CFun);
        }
        /**
         * 更新登录用户信息
         */
        private static UpdateLoginUserInfo() {
            let LoginUserName = MDMa.$("LoginUserName") as HTMLSpanElement;
            if (LoginUserName) {
                LoginUserName.innerText = MyInfoPage.config.loginUserInfo.Name;
            }
            let LoginUserAccount = MDMa.$("LoginUserAccount") as HTMLParagraphElement;
            if (LoginUserAccount) {
                LoginUserAccount.innerText = MyInfoPage.config.loginUserInfo.Account;
            }
        }
        /**
         * 获得登录用户信息
         */
        private GetLoginUserInfo() {
            let loginUserM = Common.GetLoginUserInfo();
            let url = Common.config.ServerURL + "api/User/GetViewInfoByID";
            let data = {
                userID: loginUserM.UserID
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                MyInfoPage.config.loginUserInfo = resM["Data"] as UserModel;
                MyInfoPage.UpdateLoginUserInfo();
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
    let pageM = new RecordBill.APP.User.MyInfoPage();
});