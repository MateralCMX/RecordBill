var RecordBill;
(function (RecordBill) {
    var APP;
    (function (APP) {
        var Home;
        (function (Home) {
            var IndexPage = /** @class */ (function () {
                /**
                 * 构造函数
                 */
                function IndexPage() {
                    APP.Common.GetLoginUserInfo(true);
                    mui.init();
                    this.BindeEvent();
                }
                /**
                 * 绑定事件
                 */
                IndexPage.prototype.BindeEvent = function () {
                };
                return IndexPage;
            }());
            Home.IndexPage = IndexPage;
        })(Home = APP.Home || (APP.Home = {}));
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.APP.Home.IndexPage();
});
//# sourceMappingURL=Index.js.map