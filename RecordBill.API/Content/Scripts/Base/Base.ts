'use strict';
import MDMa = MateralTools.DOMManager;
import MTMa = MateralTools.ToolManager;
import MLMa = MateralTools.LocalDataManager;
namespace RecordBill {
    /**
     * 公共方法
     */
    export class Common {
        public static config = {
            ServerURL: "http://MYQA.MateralCMX.com/",//"http://localhost:6731/",//
            LoginUserName: "LOGINUSER",//保存登录用户Key
            PageInfo: {
                PagingIndex:1,
                PagingSize: 20
            } as PageMode
        };
        /**
         * 获得用户输入的信息
         */
        public static GetInputInfo(id: string, setFun: Function): any {
            let resM = null;
            let loginForm: HTMLFormElement = MDMa.$(id) as HTMLFormElement;
            if (loginForm.checkValidity()) {
                resM = setFun();
            }
            else {
                MDMa.AddClass(loginForm, "was-validated");
            }
            return resM;
        }
        /**
         * 设置登录用户信息
         * @param data
         */
        public static SetLoginUserInfo(data: LoginUserModel = null) {
            if (data) {
                MLMa.SetLocalData(Common.config.LoginUserName, data, true);
            }
            else {
                MLMa.RemoveLocalData(Common.config.LoginUserName);
            }
        }
        /**
         * 获得登录用户信息
         * @returns 登录用户的信息
         */
        public static GetLoginUserInfo(isGoToLogin: boolean = false): LoginUserModel | null {
            let resM = MLMa.GetLocalData(Common.config.LoginUserName, true);
            if (resM) {
                return resM as LoginUserModel;
            }
            else {
                if (isGoToLogin) {
                    Common.GoToPage("Login");
                }
                return null;
            }
        }
        /**
         * 显示提示窗体
         * @param message 消息
         * @param title 标题
         * @param id ID
         */
        public static ShowMessageBox(message: string, title: string = "提示", id: string = "MessageBox") {
            let modal: HTMLDivElement = MDMa.$(id) as HTMLDivElement;
            if (!modal) {
                modal = Common.GetMessageBoxElement(id);
            }
            let modal_title = MDMa.$(id + "Label");
            modal_title.innerText = title;
            let modal_body = MDMa.$(id + "Body");
            modal_body.innerText = message;
            $('#' + id).modal('toggle');
        }
        /**
         * 获得提示窗体元素结构
         * @param id ID
         * @param title 标题
         * @param message 消息
         * @returns 提示窗体元素结构
         */
        private static GetMessageBoxElement(id: string) {
            let modal = document.createElement("div");
            MDMa.AddClass(modal, ["modal", "fade"]);
            modal.setAttribute("id", id);
            modal.setAttribute("tabindex", "-1");
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-labelledby", id + "Label");
            modal.setAttribute("aria-hidden", "true");
            document.body.appendChild(modal);
            let modal_dialog = document.createElement("div");
            MDMa.AddClass(modal_dialog, "modal-dialog");
            modal_dialog.setAttribute("role", "document");
            let modal_content = document.createElement("div");
            MDMa.AddClass(modal_content, "modal-content");
            modal_dialog.appendChild(modal_content);
            let modal_header = document.createElement("div");
            MDMa.AddClass(modal_header, "modal-header");
            modal_content.appendChild(modal_header);
            let modal_title = document.createElement("h5");
            MDMa.AddClass(modal_title, "modal-title");
            modal_title.setAttribute("id", id + "Label");
            modal_header.appendChild(modal_title);
            let btn_close = document.createElement("button");
            MDMa.AddClass(btn_close, "close");
            btn_close.setAttribute("type", "button");
            btn_close.setAttribute("data-dismiss", "modal");
            btn_close.setAttribute("aria-label", "Close");
            modal_header.appendChild(btn_close);
            let btn_close_span = document.createElement("span");
            btn_close_span.setAttribute("aria-hidden", "true");
            btn_close_span.innerHTML = "&times; ";
            btn_close.appendChild(btn_close_span);
            let modal_body = document.createElement("div");
            MDMa.AddClass(modal_body, "modal-body");
            modal_body.setAttribute("id", id + "Body");
            modal_content.appendChild(modal_body);
            let modal_footer = document.createElement("div");
            MDMa.AddClass(modal_footer, "modal-footer");
            modal_content.appendChild(modal_footer);
            let btn_close2 = document.createElement("button");
            MDMa.AddClass(btn_close2, ["btn", "btn-secondary"]);
            btn_close2.setAttribute("type", "button");
            btn_close2.setAttribute("data-dismiss", "modal");
            btn_close2.innerText = "关闭";
            modal_footer.appendChild(btn_close2);
            modal.appendChild(modal_dialog);
            return modal;
        }
        /**
         * 获得页面路径
         * @param pageName 页面名称
         */
        public static GetPageUrl(pageName: string) {
            let url: string = Common.config.ServerURL;
            switch (pageName) {
                case "Home":
                    url += "Home/Index";
                    break;
                case "Login":
                default:
                    url += "User/Login";
                    break;
            }
            return url;
        }
        /**
         * 跳转
         * @param pageName 页面名称
         */
        public static GoToPage(pageName: string) {
            window.location.href = Common.GetPageUrl(pageName);
        }
        /**
         * 请求错误统一处理方法
         * @param resM 返回值
         * @param xhr Request对象
         * @param status 返回状态
         */
        private static RequestError(resM: any, xhr: XMLHttpRequest, status: number) {
            switch (status) {
                case 400://参数错误
                    Common.ShowMessageBox("服务器不能识别该请求。", "请求错误", "ErrorMessageBox");
                    break;
                case 401://未登录
                    Common.GoToPage("Login");
                    break;
                default://服务器错误或其他
                    Common.ShowMessageBox("服务器发生错误，请联系管理员。", "网页发生错误", "ErrorMessageBox");
                    break;
            };
        }
        /**
         * 发送请求
         * @param url url地址
         * @param type 请求类型
         * @param data 数据
         * @param succes 成功方法
         * @param fail 失败方法
         * @param complete 都执行方法
         * @param error 错误方法
         */
        public static Send(url: string, type: string, data: any, succes: Function = null, fail: Function = null, complete: Function = null) {
            let SFun = function (resM: any, xhr: XMLHttpRequest, status: number) {
                switch (resM["ResultType"]) {
                    case 0:
                        if (succes) {
                            succes(resM, xhr, status);
                        }
                        break;
                    case 1:
                        if (fail) {
                            fail(resM, xhr, status);
                        }
                        break;
                    case 2:
                        Common.RequestError(resM, xhr, status);
                        break;
                }
            }
            let config: MateralTools.HttpConfigModel = new MateralTools.HttpConfigModel(url, type, data, "json", SFun, Common.RequestError, complete)
            let loginUserM: LoginUserModel = Common.GetLoginUserInfo();
            if (loginUserM) {
                data["LoginUserID"] = loginUserM.UserID;
                data["Token"] = loginUserM.Token;
            }
            MateralTools.HttpManager.Send(config);
        }
        /**
         * 发送Post请求
         * @param url url地址
         * @param data 数据
         * @param succes 成功方法
         * @param fail 失败方法
         * @param complete 都执行方法
         * @param error 错误方法
         */
        public static SendPost(url: string, data: any, succes: Function = null, fail: Function = null, complete: Function = null) {
            Common.Send(url, "post", data, succes, fail, complete);
        }
        /**
         * 发送Get请求
         * @param url url地址
         * @param data 数据
         * @param succes 成功方法
         * @param fail 失败方法
         * @param complete 都执行方法
         * @param error 错误方法
         */
        public static SendGet(url: string, data: any, succes: Function = null, fail: Function = null, complete: Function = null) {
            Common.Send(url, "get", data, succes, fail, complete);
        }
        /**
         * 绑定分页工具栏
         * @param SearchFun 查询方法
         * @param id 元素ID
         */
        public static BindPageInfo(SearchFun: Function, id: string | HTMLElement = "PageInfoNav") {
            let PageInfoNav = MDMa.$(id) as HTMLElement;
            if (PageInfoNav) {
                PageInfoNav.innerHTML = "";
                let PageInfo = document.createElement("ul");
                MDMa.AddClass(PageInfo, "pagination");
                PageInfoNav.appendChild(PageInfo);
                if (Common.config.PageInfo.PagingIndex > 1) {
                    /**
                     * 第一页
                     */
                    let pageFistItem = document.createElement("li");
                    MDMa.AddClass(pageFistItem, "page-item");
                    PageInfo.appendChild(pageFistItem);
                    let pageFistItemA = document.createElement("a");
                    MDMa.AddClass(pageFistItemA, "page-link");
                    pageFistItemA.innerText = "<<".toString();
                    pageFistItemA.dataset.target = "1";
                    MDMa.AddEvent(pageFistItemA, "click", SearchFun);
                    pageFistItem.appendChild(pageFistItemA);
                    /**
                     * 上一页
                     */
                    let pageUpItem = document.createElement("li");
                    MDMa.AddClass(pageUpItem, "page-item");
                    PageInfo.appendChild(pageUpItem);
                    let pageUpItemA = document.createElement("a");
                    MDMa.AddClass(pageUpItemA, "page-link");
                    pageUpItemA.innerText = "<".toString();
                    pageUpItemA.dataset.target = (Common.config.PageInfo.PagingIndex - 1).toString();
                    MDMa.AddEvent(pageUpItemA, "click", SearchFun);
                    pageUpItem.appendChild(pageUpItemA);
                }
                let pageItem: HTMLLIElement;
                let pageItemA: HTMLAnchorElement;
                for (var i = 1; i < Common.config.PageInfo.PagingCount + 1; i++) {
                    pageItem = document.createElement("li");
                    MDMa.AddClass(pageItem, "page-item");
                    PageInfo.appendChild(pageItem);
                    pageItemA = document.createElement("a");
                    MDMa.AddClass(pageItemA, "page-link");
                    pageItemA.innerText = (i + ((Common.config.PageInfo.PagingIndex - 1) * Common.config.PageInfo.PagingCount)).toString();
                    if (i != Common.config.PageInfo.PagingIndex) {
                        pageItemA.dataset.target = i.toString();
                        MDMa.AddEvent(pageItemA, "click", SearchFun);
                    }
                    pageItem.appendChild(pageItemA);
                }
                if (Common.config.PageInfo.PagingIndex < Common.config.PageInfo.PagingCount) {
                    /**
                     * 下一页
                     */
                    let pageDownItem = document.createElement("li");
                    MDMa.AddClass(pageDownItem, "page-item");
                    PageInfo.appendChild(pageDownItem);
                    let pageDownItemA = document.createElement("a");
                    MDMa.AddClass(pageDownItemA, "page-link");
                    pageDownItemA.innerText = ">".toString();
                    pageDownItemA.dataset.target = (Common.config.PageInfo.PagingIndex + 1).toString();
                    MDMa.AddEvent(pageDownItemA, "click", SearchFun);
                    pageDownItem.appendChild(pageDownItemA);
                    /**
                     * 最后一页
                     */
                    let pageLastItem = document.createElement("li");
                    MDMa.AddClass(pageLastItem, "page-item");
                    PageInfo.appendChild(pageLastItem);
                    let pageLastItemaA = document.createElement("a");
                    MDMa.AddClass(pageLastItemaA, "page-link");
                    pageLastItemaA.innerText = ">>".toString();
                    pageLastItemaA.dataset.target = Common.config.PageInfo.PagingCount.toString();
                    MDMa.AddEvent(pageLastItemaA, "click", SearchFun);
                    pageLastItem.appendChild(pageLastItemaA);
                }
            }
        }
        /**
         * 获得自定义属性或者父级自定义属性
         * @param element 元素对象
         * @param name 名称
         */
        public static GetDataSetOrPanertDataSet(element: string | HTMLElement, name: string): string {
            let value = "";
            element = MDMa.$(element);
            while (!value) {
                value = MDMa.GetDataSet(element)[name];
                if (element["parentElement"]) {
                    element = element["parentElement"];
                }
                else {
                    break;
                }
            }
            return value;
        }
        /**
         * 绑定标准页面脚部
         */
        public static BindFooterInfo() {
            let footers = document.getElementsByClassName("DefultFooter");
            for (var i = 0; i < footers.length; i++) {
                let ContentP = document.createElement("p");
                ContentP.textContent = "小本本";
                let KeepA = document.createElement("a");
                KeepA.href = "http://www.miibeian.gov.cn";
                KeepA.target = "_blank";
                KeepA.textContent = "滇ICP备17011382号-1";
                let CopyrightP = document.createElement("p");
                CopyrightP.textContent = "Materal © 2018 -- 小瑞瑞";
                footers[i].appendChild(ContentP);
                footers[i].appendChild(CopyrightP);
                footers[i].appendChild(KeepA);
            }
        };
    }
    /**
     * 登录用户模型
     */
    export class LoginUserModel {
        /*用户ID*/
        public UserID: string;
        /*Token*/
        public Token: string;
    }
    /**
     * 
     */
    export class PageMode {
        /**
         * 当前页面
         */
        public PagingIndex: number;
        /**
         * 总页数
         */
        public PagingCount: number;
        /**
         * 数据总数
         */
        public DataCount: number;
        /**
         * 显示数量
         */
        public PagingSize: number;
    }
    /**
     * 用户模型
     */
    export class UserModel {
        /**
         * 唯一标识
         */
        public ID: string;
        /**
         * 姓名
         */
        public Name: string;
        /**
         * 账户
         */
        public Account: string;
    }
}