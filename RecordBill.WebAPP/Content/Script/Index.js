var RecordBill;
(function (RecordBill) {
    var APP;
    (function (APP) {
        var IndexPage = /** @class */ (function () {
            /**
             * 构造函数
             */
            function IndexPage() {
                window["mui"]["init"]();
                window["mui"]["plusReady"](function () {
                    console.log("当前页面URL：" + window["plus"].webview.currentWebview().getURL());
                });
                this.BindeEvent();
            }
            /**
             * 绑定事件
             */
            IndexPage.prototype.BindeEvent = function () {
            };
            return IndexPage;
        }());
        APP.IndexPage = IndexPage;
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.APP.IndexPage();
});
//# sourceMappingURL=Index.js.map