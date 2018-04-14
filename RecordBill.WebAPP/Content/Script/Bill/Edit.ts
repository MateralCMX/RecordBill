namespace RecordBill.APP.Bill {
    export class EditPage {
        private static config = {
            ID: null,
            datePicker: null,
            typePicker: null
        }
        /**
         * 构造函数
         */
        constructor() {
            mui.init({
                beforeback: function () {
                    if (plus) {
                        var self = plus.webview.currentWebview().opener();
                        mui.fire(self, 'init');
                    }
                    return true;
                }
            });
            mui.plusReady(function () {
                var self = plus.webview.currentWebview();
                EditPage.config.ID = self["ID"];
                EditPage.SetPageTile();
            });
            this.Init();
            this.BindeEvent();
        }
        /**
         * 初始化
         */
        private Init() {
            let nowDate = new Date();
            let BtnRecordTime = MDMa.$("BtnRecordTime") as HTMLButtonElement;
            BtnRecordTime.innerText = MTMa.DateTimeFormat(nowDate, "yyyy/MM/dd");
            EditPage.config.datePicker = new mui.DtPicker({
                type: "date",//设置日历初始视图模式 
                beginDate: new Date(2017, 8, 10),//设置开始日期 
                endDate: new Date(),//设置结束日期 
                labels: ['年', '月', '日'],//设置默认标签区域提示语 
            });
        }
        /**
         * 绑定所有类型
         */
        private BindAllType() {
            let url = Common.config.ServerURL + "api/BillTypes/GetAllTypes";
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                let data = resM["Data"] as any[];
                EditPage.config.typePicker = new mui.PopPicker();
                let popData = [];
                let BtnType = MDMa.$("BtnType") as HTMLButtonElement;
                for (var i = 0; i < data.length; i++) {
                    if (i == 0 && !EditPage.config.ID) {
                        BtnType.innerText = data[i]["Name"];
                        BtnType.dataset.id = data[i]["ID"];
                    }
                    popData.push(
                        {
                            value: data[i]["ID"],
                            text: data[i]["Name"]
                        }
                    );
                }
                EditPage.config.typePicker.setData(popData);
                MDMa.AddEvent(BtnType, "tap", EditPage.Event_BtnType_Tap);
                let BtnSave = MDMa.$("BtnSave") as HTMLButtonElement;
                BtnSave.disabled = false;
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, {}, SFun, FFun, CFun);
        }
        /**
         * 绑定事件
         */
        private BindeEvent() {
            MDMa.AddEvent("BtnSave", "tap", this.Event_BtnSave_Tap);
            MDMa.AddEvent("BtnRecordTime", "tap", this.Event_BtnRecordTime_Tap);
            MDMa.AddEvent("InputAmount", "invalid", this.Event_InputAmount_Invalid);
            MDMa.AddEvent("InputAmount", "change", Common.RemoveError);
            MDMa.AddEvent("InputContent", "invalid", this.Event_InputContent_Invalid);
            MDMa.AddEvent("InputContent", "change", Common.RemoveError);
            this.BindAllType();
        }
        /**
         *  类型
         * @param e
         */
        private static Event_BtnType_Tap(e: Event) {
            EditPage.config.typePicker.show(function (selectItems) {
                let BtnType = MDMa.$("BtnType") as HTMLButtonElement;
                BtnType.innerText = selectItems[0]["text"];
                BtnType.dataset.id = selectItems[0]["value"];
            });
        }
        /**
         * 日期选择事件
         * @param e
         */
        private Event_BtnRecordTime_Tap(e: Event) {
            EditPage.config.datePicker.show(function (selectItems) {
                let selectDate = new Date(selectItems.y.value, selectItems.m.value - 1, selectItems.d.value);
                let BtnRecordTime = MDMa.$("BtnRecordTime") as HTMLButtonElement;
                BtnRecordTime.innerText = MTMa.DateTimeFormat(selectDate, "yyyy/MM/dd");
            });
        }
        /**
         * 设置页面标题
         * @param id ID
         */
        private static SetPageTile() {
            let PageTitle = MDMa.$("PageTitle") as HTMLHeadingElement;
            if (PageTitle) {
                if (EditPage.config.ID) {
                    PageTitle.innerText = "修改账单";
                    let url = Common.config.ServerURL + "api/Bill/GetViewInfoByID";
                    let data = {
                        ID: EditPage.config.ID
                    };
                    let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                        let data = resM["Data"];
                        let BtnRecordTime = MDMa.$("BtnRecordTime") as HTMLInputElement;
                        BtnRecordTime.innerText = MTMa.DateTimeFormat(new Date(data["RecordTime"]), "yyyy/MM/dd");
                        let InputAmount = MDMa.$("InputAmount") as HTMLInputElement;
                        InputAmount.value = data["Amount"];
                        let InputContent = MDMa.$("InputContent") as HTMLInputElement;
                        InputContent.value = data["Contents"];
                        let BtnType = MDMa.$("BtnType") as HTMLButtonElement;
                        BtnType.innerText = data["Type"];
                        BtnType.dataset.id = data["FK_Type_ID"];
                    };
                    let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                    };
                    let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                    };
                    Common.SendGet(url, data, SFun, FFun, CFun);
                }
                else {
                    PageTitle.innerText = "添加账单";
                }
            }
        }
        /**
         * 金额验证事件
         * @param e
         */
        private Event_InputAmount_Invalid(e: Event) {
            let validity: ValidityState = Common.GetValidityState(e);
            if (validity.valueMissing) {
                mui.toast("请填写金额");
            }
            else if (validity.rangeUnderflow) {
                mui.toast("金额不能小于0元");
            }
            console.log(validity);
        }
        /**
         * 内容验证事件
         * @param e
         */
        private Event_InputContent_Invalid(e: Event) {
            let validity: ValidityState = Common.GetValidityState(e);
            if (validity.valueMissing) {
                mui.toast("请填写内容");
            }
        }
        /**
         * 保存按钮点击事件
         * @param e
         */
        private Event_BtnSave_Tap(e) {
            let element = e.target;
            mui(element).button('loading');
            var InputM = EditPage.GetInputData();
            if (InputM) {
                EditPage.Save(InputM)
            }
            else {
                mui(element).button('reset');
            }
        }
        /**
         * 保存方法
         * @param InputM 请求对象
         */
        private static Save(InputM) {
            let url = Common.config.ServerURL;
            if (EditPage.config.ID) {
                InputM["ID"] = EditPage.config.ID;
                url += "api/Bill/Update";
            }
            else {
                url += "api/Bill/Add";
            }
            console.log(InputM);
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                if (EditPage.config.ID) {
                    mui.toast("保存成功");
                    setTimeout(function () {
                        mui.back();
                    }, 1000);
                }
                else {
                    mui.confirm("添加成功，继续添加吗？", "提示", ["取消", "确定"], function (e) {
                        if (e.index == 0) {
                            mui.back();
                        }
                    });
                }
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                mui.toast("保存失败");
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                mui("#BtnSave").button('reset');
            };
            Common.SendPost(url, InputM, SFun, FFun, CFun);
        }
        /**
        * 获得输入数据
        */
        private static GetInputData() {
            var InputForm = MDMa.$("InputForm") as HTMLFormElement;
            if (InputForm.checkValidity()) {
                return {
                    RecordTime: MDMa.$("BtnRecordTime").innerText,
                    FK_Type_ID: (MDMa.$("BtnType") as HTMLButtonElement).dataset.id,
                    Amount: MDMa.GetInputValue("InputAmount"),
                    Contents: MDMa.GetInputValue("InputContent"),
                };
            }
            return null;
        }
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.APP.Bill.EditPage();
});