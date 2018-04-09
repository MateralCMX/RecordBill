namespace RecordBill.APP {
    export class IndexPage {
        /**
         * 构造函数
         */
        constructor() {
            window["mui"]["init"]();
            window["mui"]["plusReady"](function () {
                console.log("当前页面URL：" + window["plus"].webview.currentWebview().getURL());
            });
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
    let pageM = new RecordBill.APP.IndexPage();
});