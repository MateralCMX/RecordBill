namespace RecordBill.APP.Home {
    export class IndexPage {
        /**
         * 构造函数
         */
        constructor() {
            Common.GetLoginUserInfo(true);
            mui.init();
            this.BindeEvent();
        }
        /**
         * 绑定事件
         */
        private BindeEvent() {
        }
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.APP.Home.IndexPage();
});