namespace RecordBill.APP.Bill {
    export class ReportPage {
        private static config = {
            IsShowMenu: false,
            MenuPage: {},
            MainPage: {},
            params: {
                userID:"",
                minDate: new Date(),
                maxDate: new Date()
            }
        };
        /**
         * 构造方法
         */
        constructor() {
            let loginUserInfo = Common.GetLoginUserInfo(true);
            if (loginUserInfo) {
                ReportPage.config.params.userID = loginUserInfo.UserID;
                this.init();
                mui.init({
                    swipeBack: false,
                    beforeback: function () {
                        if (ReportPage.config.IsShowMenu) {
                            ReportPage.CloseMenu();
                            return false;
                        }
                        else {
                            ReportPage.config.MenuPage["close"]('none');
                            return true;
                        }
                    }
                });
                mui.plusReady(function () {
                    ReportPage.config.MainPage = plus.webview.currentWebview();
                    ReportPage.config.MenuPage = mui.preload({
                        id: 'BillReportMenu',
                        url: 'ReportMenu.html',
                        styles: {
                            left: "20%",
                            width: '80%',
                            zindex: 9997
                        }
                    });
                });
                this.BindEvent();
            }
        }
        /**
         * 初始化
         */
        private init() {
            ReportPage.config.params.minDate = new Date(ReportPage.config.params.minDate.getFullYear(), ReportPage.config.params.minDate.getMonth(), 1);
            this.GetLoginUserInfo();
            ReportPage.Search();
        }
        /**
         * 绑定事件
         */
        private BindEvent() {
            MDMa.AddEvent("ShowMenu", "tap", ReportPage.ToolgeMenu);
            MDMa.AddEvent(window, "CoseMenu", function (e: any) {
                ReportPage.config.params.minDate = new Date(e.detail["minDate"]);
                ReportPage.config.params.maxDate = new Date(e.detail["maxDate"]);
                ReportPage.Search();
                ReportPage.CloseMenu();
            });
        }
        /**
         * 切换菜单
         */
        private static ToolgeMenu() {
            if (!ReportPage.config.IsShowMenu) {
                ReportPage.OpenMenu();
            }
            else {
                ReportPage.CloseMenu();
            }
        }
        /*
         * 显示菜单菜单
         */
        private static OpenMenu() {
            if (!ReportPage.config.IsShowMenu) {
                ReportPage.config.MenuPage["show"]('none', 0, function () {
                    ReportPage.config.MainPage["setStyle"]({
                        left: '-80%',
                        transition: {
                            duration: 150
                        }
                    });
                });
                ReportPage.config.IsShowMenu = true;
            }
        }
        /**
         * 关闭菜单
         */
        private static CloseMenu() {
            if (ReportPage.config.IsShowMenu) {
                ReportPage.config.MainPage["setStyle"]({
                    left: '0',
                    transition: {
                        duration: 150
                    }
                });
                setTimeout(function () {
                    ReportPage.config.MenuPage["hide"]();
                }, 300);
                ReportPage.config.IsShowMenu = false;
            }
        };
        /**
         * 获得登录用户信息
         */
        private GetLoginUserInfo() {
            let url = Common.config.ServerURL + "api/User/GetViewInfoByID";
            let data = {
                userID: ReportPage.config.params.userID
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                let data = resM["Data"] as UserModel;
                let LoginUserInfo = MDMa.$("LoginUserInfo") as HTMLSpanElement;
                if (LoginUserInfo) {
                    LoginUserInfo.innerText = data.Name + "的账单统计";
                }
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, SFun, FFun, CFun);
        }
        /**
         * 查询方法
         */
        private static Search() {
            let url = Common.config.ServerURL + "api/Bill/GetBillReportInfoByWhere";
            let data = {
                userID: ReportPage.config.params.userID,
                minDate: MTMa.DateTimeFormat(ReportPage.config.params.minDate, "yyyy/MM/dd"),
                maxDate: MTMa.DateTimeFormat(ReportPage.config.params.maxDate, "yyyy/MM/dd")
            }
            let SearchTime = MDMa.$("SearchTime") as HTMLParagraphElement;
            SearchTime.innerText = data.minDate + "-" + data.maxDate;
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                ReportPage.BindData(resM["Data"]);
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, SFun, FFun, CFun);
        }
        /**
         * 绑定数据
         * @param inputM
         */
        private static BindData(inputM: any) {
            let AountPrice = MDMa.$("AountPrice") as HTMLSpanElement;
            AountPrice.innerText = inputM["Count"] + "￥";
            let MaxBill = inputM["MaxBill"];
            let MaxContent = MDMa.$("MaxContent") as HTMLSpanElement;
            MaxContent.innerText = MaxBill["Contents"];
            let MaxTime = MDMa.$("MaxTime") as HTMLSpanElement;
            MaxTime.innerText = "最多的一笔[" + MTMa.DateTimeFormat(new Date(MaxBill["RecordTime"]), "yyyy/MM/dd") + "-" + MaxBill["Type"] + "]";
            let MaxPrice = MDMa.$("MaxPrice") as HTMLSpanElement;
            MaxPrice.innerText = MaxBill["Amount"] + "￥";
            let MinBill = inputM["MinBill"];
            let MinContent = MDMa.$("MinContent") as HTMLSpanElement;
            MinContent.innerText = MinBill["Contents"];
            let MinTime = MDMa.$("MinTime") as HTMLSpanElement;
            MinTime.innerText = "最少的一笔[" + MTMa.DateTimeFormat(new Date(MinBill["RecordTime"]), "yyyy/MM/dd") + "-" + MinBill["Type"] + "]";
            let MinPrice = MDMa.$("MinPrice") as HTMLSpanElement;
            MinPrice.innerText = MinBill["Amount"] + "￥";
            ReportPage.BindList(inputM["Data"]);
        }
        /**
         * 绑定列表
         * @param inputM
         */
        private static BindList(listM: any[]) {
            let ListData = MDMa.$("ListData") as HTMLUListElement;
            if (ListData) {
                ListData.innerHTML = "";
                for (var i = 0; i < listM.length; i++) {
                    let Li_Item = document.createElement("li");
                    MDMa.AddEvent(Li_Item, "tap", Common.Event_BtnGotoPage_tap);
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
                    P_User.innerText = MTMa.DateTimeFormat(new Date(listM[i]["RecordTime"]), "yyyy/MM/dd") + "-" + listM[i]["Type"] + "-" + listM[i]["UserName"];
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
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.APP.Bill.ReportPage();
});