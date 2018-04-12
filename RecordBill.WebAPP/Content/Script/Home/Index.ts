namespace RecordBill.APP.Home {
    export class IndexPage {
        private static pullRefresh = null;
        /**
         * 构造函数
         */
        constructor() {
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
        private BindeEvent() {
            MDMa.AddEvent("BtnSearch", "tap", this.Event_BtnSearch_Tap);
            MDMa.AddEvent(window, 'init', function (e) {
                IndexPage.ReSearch();
            });
        }
        /**
         * 重写查询
         */
        private static ReSearch() {
            PageMode.PagingIndex = 1;
            let ListData = MDMa.$("ListData") as HTMLDivElement;
            ListData.innerHTML = "";
            mui('#ListDataPanel').pullRefresh().refresh(true);
            mui("#offCanvasSide").popover("toggle");
            IndexPage.SearchBill();
        }
        /**
         * 点击查询按钮
         * @param e
         */
        private Event_BtnSearch_Tap(e: MouseEvent) {
            IndexPage.ReSearch();
        }
        /**
         * 获得查询条件
         */
        private static GetSearchInput(): QueryBillModel {
            let onlyLookMe = MDMa.$("switchOnlyLookMe").classList.contains("mui-active");
            let queryM: QueryBillModel = new QueryBillModel();
            if (onlyLookMe) {
                queryM.userID = Common.GetLoginUserInfo(true).UserID;
            }
            else {
                queryM.userID = "";
            }
            queryM.maxDate = MDMa.GetInputValue("SearchMaxDate");
            queryM.minDate = MDMa.GetInputValue("SearchMinDate");
            return queryM;
        }
        /**
         * 查询账单
         */
        private static SearchBill() {
            let me = this;
            if (!IndexPage.pullRefresh) {
                IndexPage.pullRefresh = this;
            }
            let serachData = IndexPage.GetSearchInput();
            let data = {
                userID: serachData.userID,
                minDate: serachData.minDate,
                maxDate: serachData.maxDate,
                pagingIndex: PageMode.PagingIndex,
                pagingSize: PageMode.PagingSize,
            }
            let url = Common.config.ServerURL + "api/Bill/GetViewInfoByWhere";
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                IndexPage.BindList(resM["Data"]["Data"]);
                let pageM = resM["Data"]["PageInfo"];
                PageMode.DataCount = pageM["DataCount"];
                PageMode.PagingCount = pageM["PagingCount"];
                PageMode.PagingIndex = pageM["PagingIndex"];
                PageMode.PagingSize = pageM["PagingSize"];
                if (PageMode.PagingIndex >= PageMode.PagingCount) {
                    if (me["endPullupToRefresh"]) {
                        me["endPullupToRefresh"](true);
                    }
                    else if (IndexPage.pullRefresh && IndexPage.pullRefresh["endPullupToRefresh"]) {
                        IndexPage.pullRefresh["endPullupToRefresh"](true);
                    }
                }
                else {
                    PageMode.PagingIndex++;
                    if (me["endPullupToRefresh"]) {
                        me["endPullupToRefresh"](false);
                    }
                    else if (IndexPage.pullRefresh && IndexPage.pullRefresh["endPullupToRefresh"]) {
                        IndexPage.pullRefresh["endPullupToRefresh"](false);
                    }
                }
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, SFun, FFun, CFun);
        }
        /**
         * 绑定列表
         * @param listM 要绑定的对象
         */
        private static BindList(listM: any[]) {
            let ListData = MDMa.$("ListData") as HTMLUListElement;
            if (ListData) {
                for (var i = 0; i < listM.length; i++) {
                    let Li_Item = document.createElement("li");
                    MDMa.AddClass(Li_Item, "mui-table-view-cell mui-media");
                    let A_Item = document.createElement("a");
                    Li_Item.appendChild(A_Item);
                    let Div_Item = document.createElement("div");
                    MDMa.AddClass(Div_Item, "mui-media-body");
                    A_Item.appendChild(Div_Item);
                    let Text_Content = document.createTextNode(listM[i]["Contents"]);
                    Div_Item.appendChild(Text_Content);
                    let P_User = document.createElement("p");
                    MDMa.AddClass(P_User, "mui-ellipsis");
                    P_User.innerText = MTMa.DateTimeFormat(new Date(listM[i]["RecordTime"]), "yyyy-MM-dd") + " " + listM[i]["UserName"];
                    Div_Item.appendChild(P_User);
                    let Span_Amount = document.createElement("span");
                    MDMa.AddClass(Span_Amount, "mui-badge mui-badge-success");
                    Span_Amount.innerText = "￥" + listM[i]["Amount"];
                    A_Item.appendChild(Span_Amount);
                    ListData.appendChild(Li_Item);
                }
            }
        }
    }
    /**
     * 账单查询模型
     */
    class QueryBillModel {
        /**
         * 用户ID
         */
        public userID: string;
        /**
         * 最小日期
         */
        public minDate: Date;
        /**
         * 最大日期
         */
        public maxDate: Date;
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.APP.Home.IndexPage();
});