namespace RecordBill.APP.Bill {
    export class EditPage {
        private static config = {
            ID: null
        }
        /**
         * 构造函数
         */
        constructor() {
            mui.init();
            mui.plusReady(function () {
                var self = plus.webview.currentWebview();
                let id = self["ID"];
                EditPage.config.ID = id;
                EditPage.SetPageTileByID(id);
            })
            this.Init();
            this.BindeEvent();
        }
        /**
         * 初始化
         */
        private Init() {
            let nowDate = new Date();
            let InputRecordTime = MDMa.$("InputRecordTime") as HTMLInputElement;
            InputRecordTime.value = MTMa.DateTimeFormat(nowDate, "yyyy-MM-dd");
            let InputAmount = MDMa.$("InputAmount") as HTMLInputElement;
            InputAmount.value = "15";
            let InputContent = MDMa.$("InputContent") as HTMLInputElement;
            InputContent.value = "吃饭";
        }
        /**
         * 绑定事件
         */
        private BindeEvent() {
            MDMa.AddEvent("BtnSave", "tap", this.Event_BtnSave_Tap);
            MDMa.AddEvent("InputRecordTime", "invalid", this.Event_InputRecordTime_Invalid);
            MDMa.AddEvent("InputRecordTime", "change", Common.RemoveError);
            MDMa.AddEvent("InputAmount", "invalid", this.Event_InputAmount_Invalid);
            MDMa.AddEvent("InputAmount", "change", Common.RemoveError);
            MDMa.AddEvent("InputContent", "invalid", this.Event_InputContent_Invalid);
            MDMa.AddEvent("InputContent", "change", Common.RemoveError);
        }
        /**
         * 设置页面标题
         * @param id ID
         */
        private static SetPageTileByID(id: string) {
            let PageTitle = MDMa.$("PageTitle") as HTMLHeadingElement;
            if (PageTitle) {
                if (id) {
                    PageTitle.innerText = "修改账单";
                }
                else {
                    PageTitle.innerText = "添加账单";
                }
            }
        }
        /**
         * 日期验证事件
         * @param e
         */
        private Event_InputRecordTime_Invalid(e: Event) {
            let validity: ValidityState = Common.GetValidityState(e);
            if (validity.valueMissing) {
                mui.toast("请填写记账日期");
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
                mui.toast("金额不能小于0.01元");
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
         * 登录方法
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
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                if (EditPage.config.ID) {
                    mui.toast("保存成功");
                    setTimeout(function () {
                        mui.back();
                    },1000);
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
                    RecordTime: MDMa.GetInputValue("InputRecordTime"),
                    Amount: MDMa.GetInputValue("InputAmount"),
                    Content: MDMa.GetInputValue("InputContent"),
                };
            }
            return null;
        }
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.APP.Bill.EditPage();
});