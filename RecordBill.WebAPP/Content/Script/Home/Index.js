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
                    mui.init({
                        pullRefresh: {
                            container: "#ListDataPanel",
                            up: {
                                height: 50,
                                auto: true,
                                contentrefresh: "正在加载...",
                                contentnomore: '没有更多数据了',
                                callback: IndexPage.SearchBill
                            }
                        }
                    });
                    this.BindeEvent();
                }
                /**
                 * 绑定事件
                 */
                IndexPage.prototype.BindeEvent = function () {
                    MDMa.AddEvent("BtnSearch", "tap", this.Event_BtnSearch_Tap);
                    MDMa.AddEvent(window, 'init', function (e) {
                        IndexPage.ReSearch();
                    });
                };
                /**
                 * 重写查询
                 */
                IndexPage.ReSearch = function () {
                    APP.PageMode.PagingIndex = 1;
                    var ListData = MDMa.$("ListData");
                    ListData.innerHTML = "";
                    mui('#ListDataPanel').pullRefresh().refresh(true);
                    mui("#offCanvasSide").popover("toggle");
                    IndexPage.SearchBill();
                };
                /**
                 * 点击查询按钮
                 * @param e
                 */
                IndexPage.prototype.Event_BtnSearch_Tap = function (e) {
                    IndexPage.ReSearch();
                };
                /**
                 * 获得查询条件
                 */
                IndexPage.GetSearchInput = function () {
                    var loginUserInfo = APP.Common.GetLoginUserInfo(true);
                    if (loginUserInfo) {
                        var queryM = new QueryBillModel();
                        queryM.userID = loginUserInfo.UserID;
                        queryM.minDate = null;
                        queryM.maxDate = null;
                        return queryM;
                    }
                    return null;
                };
                /**
                 * 查询账单
                 */
                IndexPage.SearchBill = function () {
                    var me = this;
                    if (me["endPullupToRefresh"]) {
                        IndexPage.pullRefresh = me;
                    }
                    var serachData = IndexPage.GetSearchInput();
                    var data = {
                        userID: serachData.userID,
                        minDate: serachData.minDate,
                        maxDate: serachData.maxDate,
                        pagingIndex: APP.PageMode.PagingIndex,
                        pagingSize: APP.PageMode.PagingSize,
                    };
                    var url = APP.Common.config.ServerURL + "api/Bill/GetViewInfoByWhere";
                    var SFun = function (resM, xhr, status) {
                        IndexPage.BindList(resM["Data"]["Data"]);
                        var pageM = resM["Data"]["PageInfo"];
                        APP.PageMode.SetValue(pageM);
                        IndexPage.pullRefresh["endPullupToRefresh"](APP.PageMode.PagingIndex++ >= APP.PageMode.PagingCount);
                    };
                    var FFun = function (resM, xhr, status) {
                    };
                    var CFun = function (resM, xhr, status) {
                    };
                    APP.Common.SendGet(url, data, SFun, FFun, CFun);
                };
                /**
                 * 绑定列表
                 * @param listM 要绑定的对象
                 */
                IndexPage.BindList = function (listM) {
                    var ListData = MDMa.$("ListData");
                    if (ListData) {
                        for (var i = 0; i < listM.length; i++) {
                            var Li_Item = document.createElement("li");
                            Li_Item.dataset.gotopage = "EditBill";
                            Li_Item.dataset.extras = "ID=" + listM[i]["ID"];
                            MDMa.AddEvent(Li_Item, "tap", APP.Common.Event_BtnGotoPage_tap);
                            MDMa.AddClass(Li_Item, "mui-table-view-cell mui-media");
                            var A_Item = document.createElement("a");
                            Li_Item.appendChild(A_Item);
                            var Div_Item = document.createElement("div");
                            MDMa.AddClass(Div_Item, "mui-media-body");
                            A_Item.appendChild(Div_Item);
                            var Text_Content = document.createTextNode(listM[i]["Contents"]);
                            Div_Item.appendChild(Text_Content);
                            var P_User = document.createElement("p");
                            MDMa.AddClass(P_User, "mui-ellipsis");
                            P_User.innerText = MTMa.DateTimeFormat(new Date(listM[i]["RecordTime"]), "yyyy/MM/dd") + "-" + listM[i]["Type"] + "-" + listM[i]["UserName"];
                            Div_Item.appendChild(P_User);
                            var Span_Amount = document.createElement("span");
                            MDMa.AddClass(Span_Amount, "mui-badge mui-badge-success");
                            Span_Amount.innerText = "￥" + listM[i]["Amount"];
                            A_Item.appendChild(Span_Amount);
                            ListData.appendChild(Li_Item);
                        }
                    }
                };
                IndexPage.pullRefresh = null;
                return IndexPage;
            }());
            Home.IndexPage = IndexPage;
            /**
             * 账单查询模型
             */
            var QueryBillModel = /** @class */ (function () {
                function QueryBillModel() {
                }
                return QueryBillModel;
            }());
        })(Home = APP.Home || (APP.Home = {}));
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    var pageM = new RecordBill.APP.Home.IndexPage();
});
//# sourceMappingURL=Index.js.map