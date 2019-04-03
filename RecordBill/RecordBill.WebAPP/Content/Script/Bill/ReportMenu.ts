namespace RecordBill.APP.Bill {
    export class ReportMenuPage {
        private static config = {
            ID: null,
            MinDatePicker: null,
            MaxDatePicker: null,
            MainPage: {},
            params: {
                minDate: new Date(),
                maxDate: new Date()
            }
        }
        /**
         * 构造函数
         */
        constructor() {
            mui.init();
            this.Init();
            mui.plusReady(function () {
                ReportMenuPage.config.MainPage = plus.webview.currentWebview().opener();
            });
            this.BindeEvent();
        }
        /**
         * 初始化
         */
        private Init() {
            ReportMenuPage.config.MinDatePicker = new mui.DtPicker({
                type: "date",
                beginDate: new Date(2017, 8, 10),
                endDate: new Date(),
                labels: ['年', '月', '日'],
            });
            ReportMenuPage.config.MaxDatePicker = new mui.DtPicker({
                type: "date",
                beginDate: new Date(2017, 8, 10),
                endDate: new Date(),
                labels: ['年', '月', '日'],
            });
            ReportMenuPage.config.params.minDate = new Date(ReportMenuPage.config.params.minDate.getFullYear(), ReportMenuPage.config.params.minDate.getMonth(), 1);
            let BtnMinDate = MDMa.$("BtnMinDate") as HTMLButtonElement;
            BtnMinDate.innerText = MTMa.DateTimeFormat(ReportMenuPage.config.params.minDate, "yyyy/MM/dd");
            let BtnMaxDate = MDMa.$("BtnMaxDate") as HTMLButtonElement;
            BtnMaxDate.innerText = MTMa.DateTimeFormat(ReportMenuPage.config.params.maxDate, "yyyy/MM/dd");
        }
        /**
         * 绑定事件
         */
        private BindeEvent() {
            MDMa.AddEvent("BtnSearch", "tap", this.Event_BtnSearch_Tap);
            MDMa.AddEvent("BtnMinDate", "tap", this.Event_BtnMinDate_Tap);
            MDMa.AddEvent("BtnMaxDate", "tap", this.Event_BtnMaxDate_Tap);
        }
        /**
         * 最小日期选择事件
         * @param e
         */
        private Event_BtnMinDate_Tap(e: Event) {
            ReportMenuPage.config.MinDatePicker.show(function (selectItems) {
                ReportMenuPage.config.params.minDate =  new Date(selectItems.y.value, selectItems.m.value - 1, selectItems.d.value);
                let BtnRecordTime = MDMa.$("BtnMinDate") as HTMLButtonElement;
                BtnRecordTime.innerText = MTMa.DateTimeFormat(ReportMenuPage.config.params.minDate, "yyyy/MM/dd");
            });
        }
        /**
         * 最大日期选择事件
         * @param e
         */
        private Event_BtnMaxDate_Tap(e: Event) {
            ReportMenuPage.config.MaxDatePicker.show(function (selectItems) {
                ReportMenuPage.config.params.maxDate = new Date(selectItems.y.value, selectItems.m.value - 1, selectItems.d.value);
                let BtnRecordTime = MDMa.$("BtnMaxDate") as HTMLButtonElement;
                BtnRecordTime.innerText = MTMa.DateTimeFormat(ReportMenuPage.config.params.maxDate, "yyyy/MM/dd");
            });
        }
        /**
         * 查询按钮点击事件
         * @param e
         */
        private Event_BtnSearch_Tap(e) {
            mui.fire(ReportMenuPage.config.MainPage, "CoseMenu", {
                minDate: ReportMenuPage.config.params.minDate,
                maxDate: ReportMenuPage.config.params.maxDate,
            });
            //let element = e.target;
            //mui(element).button('loading');
            //var InputM = ReportMenuPage.GetInputData();
            //if (InputM) {
            //    ReportMenuPage.Save(InputM)
            //}
            //else {
            //    mui(element).button('reset');
            //}
        }
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.APP.Bill.ReportMenuPage();
});