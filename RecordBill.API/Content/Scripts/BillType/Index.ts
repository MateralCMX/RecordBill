/// <reference path="../../lib/jquery/jquery.d.ts" />
'use strict';
namespace RecordBill.BillType {
    export class IndexPage {
        /**
         *页面配置 
         */
        private static config = {
            SelectedID: ""
        }
        /**
         * 构造方法
         */
        constructor() {
            this.BindEvent();
            IndexPage.GetAllTypes();
        }
        /**
         * 绑定事件
         */
        private BindEvent() {
            MDMa.AddEvent("BtnAdd", "click", this.Event_BtnAdd_Click);
            MDMa.AddEvent("BtnSave", "click", this.Event_BtnSave_Click);
        }
        /**
         * 添加按钮事件
         * @param e
         */
        private Event_BtnAdd_Click(e: MouseEvent) {
            IndexPage.SetInputInfo();
            $("#EditModal").modal('toggle');
        }
        /**
         * 保存按钮事件
         * @param e
         */
        private Event_BtnSave_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            element.disabled = true;
            element.innerText = "保存中......";
            let inputM: BillTypeModel = Common.GetInputInfo("InputForm", function () {
                return {
                    ID: IndexPage.config.SelectedID,
                    Name: MDMa.GetInputValue("InputName")
                } as BillTypeModel;
            });
            if (inputM) {
                let url = Common.config.ServerURL;
                if (IndexPage.config.SelectedID) {
                    url += "api/BillTypes/Update";
                }
                else {
                    url += "api/BillTypes/Add";
                }
                let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                    element.disabled = false;
                    element.innerText = "保存";
                    $("#EditModal").modal('toggle');
                    Common.ShowMessageBox("操作成功");
                    IndexPage.GetAllTypes();
                };
                let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                    Common.ShowMessageBox("操作失败：" + resM["Message"]);
                };
                let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                };
                Common.SendPost(url, inputM, SFun, FFun, CFun);
            }
            else {
                element.disabled = false;
                element.innerText = "保存";
            }
        }
        /**
         * 列表编辑按钮事件
         * @param e
         */
        private static Event_BtnGroupEdit_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            let id = Common.GetDataSetOrPanertDataSet(element, "id");
            if (id) {
                IndexPage.GetBillTypeInfoByID(id, function (resM) {
                    IndexPage.SetInputInfo(resM["Data"] as BillTypeModel);
                    $("#EditModal").modal('toggle');
                });
            }
        }
        /**
         * 根据ID获得账单类型
         * @param id ID
         * @param sfun 成功方法
         */
        private static GetBillTypeInfoByID(id: string, sfun: Function) {
            let url = Common.config.ServerURL + "api/BillTypes/GetViewInfoByID";
            let data = {
                userID: id
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("查询失败：" + resM["Message"]);
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, sfun, FFun, CFun);
        }
        /**
         * 设置输入模型
         * @param inputM
         */
        private static SetInputInfo(inputM: BillTypeModel = { ID: "", Name: "" }) {
            let InputName = MDMa.$("InputName") as HTMLInputElement;
            InputName.value = inputM.Name;
            IndexPage.config.SelectedID = inputM.ID;
        }
        /**
         * 获得所有类型
         */
        private static GetAllTypes() {
            let url = Common.config.ServerURL + "api/BillTypes/GetAllTypes";
            let data = {
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                let data = resM["Data"] as BillTypeModel[];
                IndexPage.BindList(data);
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("获得类型信息失败：" + resM["Message"]);
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendGet(url, data, SFun, FFun, CFun);
        }
        /**
         * 向上
         */
        private static Event_BtnUp_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            let id1 = Common.GetDataSetOrPanertDataSet(element, "id");
            let id2 = Common.GetDataSetOrPanertDataSet(element, "upid");
            IndexPage.ChangeStort(id1, id2);
        }
        /**
         * 向下
         */
        private static Event_BtnDown_Click(e: MouseEvent) {
            let element = e.target as HTMLButtonElement;
            let id1 = Common.GetDataSetOrPanertDataSet(element, "id");
            let id2 = Common.GetDataSetOrPanertDataSet(element, "nextid");
            IndexPage.ChangeStort(id1, id2);
        }
        /**
         * 更改位序
         * @param id1 第一个ID
         * @param id2 第二个ID
         */
        private static ChangeStort(id1: string, id2: string) {
            let url = Common.config.ServerURL + "api/BillTypes/ChangeStort";
            let data = {
                ID1: id1,
                ID2: id2
            };
            let SFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                IndexPage.GetAllTypes();
            };
            let FFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
                Common.ShowMessageBox("调换位序失败：" + resM["Message"]);
            };
            let CFun: Function = function (resM: any, xhr: XMLHttpRequest, status: number) {
            };
            Common.SendPost(url, data, SFun, FFun, CFun);
        }
        /**
         * 绑定列表
         * @param data
         */
        private static BindList(data: BillTypeModel[]) {
            let DataList = MDMa.$("DataList") as HTMLTableSectionElement;
            if (DataList) {
                DataList.innerHTML = "";
                for (var i = 0; i < data.length; i++) {
                    let Item_Li = document.createElement("li");
                    MDMa.AddClass(Item_Li, "list-group-item");
                    Item_Li.dataset.id = data[i].ID;
                    DataList.appendChild(Item_Li);
                    let Item_Name = document.createTextNode(data[i].Name);
                    Item_Li.appendChild(Item_Name);
                    let btnGroup_Div = document.createElement("div");
                    MDMa.AddClass(btnGroup_Div, "btn-group btn-group-sm list-group-item-panel");
                    btnGroup_Div.setAttribute("role", "group");
                    Item_Li.appendChild(btnGroup_Div);
                    if (i > 0) {
                        let up_Button = document.createElement("button");
                        MDMa.AddClass(up_Button, "btn btn-success iconfont icon-Arrow_up");
                        MDMa.AddEvent(up_Button, "click", IndexPage.Event_BtnUp_Click);
                        btnGroup_Div.appendChild(up_Button);
                        Item_Li.dataset.upid = data[i - 1].ID;
                    }
                    if (i < data.length - 1) {
                        let down_Button = document.createElement("button");
                        MDMa.AddClass(down_Button, "btn btn-success iconfont icon-Arrow_down");
                        MDMa.AddEvent(down_Button, "click", IndexPage.Event_BtnDown_Click);
                        btnGroup_Div.appendChild(down_Button);
                        Item_Li.dataset.nextid = data[i + 1].ID;
                    }
                    let edit_Button = document.createElement("button");
                    MDMa.AddClass(edit_Button, "btn btn-info iconfont icon-edit");
                    MDMa.AddEvent(edit_Button, "click", IndexPage.Event_BtnGroupEdit_Click);
                    btnGroup_Div.appendChild(edit_Button);
                }
            }
        }
    }
    /**
     * 账单类型模型
     */
    class BillTypeModel {
        /**
         * 唯一标识
         */
        public ID: string;
        /**
         * 名称
         */
        public Name: string;
    }
}
MDMa.AddEvent(window, "load", function () {
    let pageM = new RecordBill.BillType.IndexPage();
});