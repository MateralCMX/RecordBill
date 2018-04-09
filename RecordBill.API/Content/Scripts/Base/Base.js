'use strict';
var MDMa = MateralTools.DOMManager;
var MTMa = MateralTools.ToolManager;
var MLMa = MateralTools.LocalDataManager;
var RecordBill;
(function (RecordBill) {
    /**
     * 公共方法
     */
    var Common = /** @class */ (function () {
        function Common() {
        }
        /**
         * 获得用户输入的信息
         */
        Common.GetInputInfo = function (id, setFun) {
            var resM = null;
            var loginForm = MDMa.$(id);
            if (loginForm.checkValidity()) {
                resM = setFun();
            }
            else {
                MDMa.AddClass(loginForm, "was-validated");
            }
            return resM;
        };
        /**
         * 设置登录用户信息
         * @param data
         */
        Common.SetLoginUserInfo = function (data) {
            if (data === void 0) { data = null; }
            if (data) {
                MLMa.SetLocalData(Common.config.LoginUserName, data, true);
            }
            else {
                MLMa.RemoveLocalData(Common.config.LoginUserName);
            }
        };
        /**
         * 获得登录用户信息
         * @returns 登录用户的信息
         */
        Common.GetLoginUserInfo = function (isGoToLogin) {
            if (isGoToLogin === void 0) { isGoToLogin = false; }
            var resM = MLMa.GetLocalData(Common.config.LoginUserName, true);
            if (resM) {
                return resM;
            }
            else {
                if (isGoToLogin) {
                    Common.GoToPage("Login");
                }
                return null;
            }
        };
        /**
         * 显示提示窗体
         * @param message 消息
         * @param title 标题
         * @param id ID
         */
        Common.ShowMessageBox = function (message, title, id) {
            if (title === void 0) { title = "提示"; }
            if (id === void 0) { id = "MessageBox"; }
            var modal = MDMa.$(id);
            if (!modal) {
                modal = Common.GetMessageBoxElement(id);
            }
            var modal_title = MDMa.$(id + "Label");
            modal_title.innerText = title;
            var modal_body = MDMa.$(id + "Body");
            modal_body.innerText = message;
            $('#' + id).modal('toggle');
        };
        /**
         * 获得提示窗体元素结构
         * @param id ID
         * @param title 标题
         * @param message 消息
         * @returns 提示窗体元素结构
         */
        Common.GetMessageBoxElement = function (id) {
            var modal = document.createElement("div");
            MDMa.AddClass(modal, ["modal", "fade"]);
            modal.setAttribute("id", id);
            modal.setAttribute("tabindex", "-1");
            modal.setAttribute("role", "dialog");
            modal.setAttribute("aria-labelledby", id + "Label");
            modal.setAttribute("aria-hidden", "true");
            document.body.appendChild(modal);
            var modal_dialog = document.createElement("div");
            MDMa.AddClass(modal_dialog, "modal-dialog");
            modal_dialog.setAttribute("role", "document");
            var modal_content = document.createElement("div");
            MDMa.AddClass(modal_content, "modal-content");
            modal_dialog.appendChild(modal_content);
            var modal_header = document.createElement("div");
            MDMa.AddClass(modal_header, "modal-header");
            modal_content.appendChild(modal_header);
            var modal_title = document.createElement("h5");
            MDMa.AddClass(modal_title, "modal-title");
            modal_title.setAttribute("id", id + "Label");
            modal_header.appendChild(modal_title);
            var btn_close = document.createElement("button");
            MDMa.AddClass(btn_close, "close");
            btn_close.setAttribute("type", "button");
            btn_close.setAttribute("data-dismiss", "modal");
            btn_close.setAttribute("aria-label", "Close");
            modal_header.appendChild(btn_close);
            var btn_close_span = document.createElement("span");
            btn_close_span.setAttribute("aria-hidden", "true");
            btn_close_span.innerHTML = "&times; ";
            btn_close.appendChild(btn_close_span);
            var modal_body = document.createElement("div");
            MDMa.AddClass(modal_body, "modal-body");
            modal_body.setAttribute("id", id + "Body");
            modal_content.appendChild(modal_body);
            var modal_footer = document.createElement("div");
            MDMa.AddClass(modal_footer, "modal-footer");
            modal_content.appendChild(modal_footer);
            var btn_close2 = document.createElement("button");
            MDMa.AddClass(btn_close2, ["btn", "btn-secondary"]);
            btn_close2.setAttribute("type", "button");
            btn_close2.setAttribute("data-dismiss", "modal");
            btn_close2.innerText = "关闭";
            modal_footer.appendChild(btn_close2);
            modal.appendChild(modal_dialog);
            return modal;
        };
        /**
         * 获得页面路径
         * @param pageName 页面名称
         */
        Common.GetPageUrl = function (pageName) {
            var url = Common.config.ServerURL;
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
        };
        /**
         * 跳转
         * @param pageName 页面名称
         */
        Common.GoToPage = function (pageName) {
            window.location.href = Common.GetPageUrl(pageName);
        };
        /**
         * 请求错误统一处理方法
         * @param resM 返回值
         * @param xhr Request对象
         * @param status 返回状态
         */
        Common.RequestError = function (resM, xhr, status) {
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
            }
            ;
        };
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
        Common.Send = function (url, type, data, succes, fail, complete) {
            if (succes === void 0) { succes = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            var SFun = function (resM, xhr, status) {
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
            };
            var config = new MateralTools.HttpConfigModel(url, type, data, "json", SFun, Common.RequestError, complete);
            var loginUserM = Common.GetLoginUserInfo();
            if (loginUserM) {
                data["LoginUserID"] = loginUserM.UserID;
                data["Token"] = loginUserM.Token;
            }
            MateralTools.HttpManager.Send(config);
        };
        /**
         * 发送Post请求
         * @param url url地址
         * @param data 数据
         * @param succes 成功方法
         * @param fail 失败方法
         * @param complete 都执行方法
         * @param error 错误方法
         */
        Common.SendPost = function (url, data, succes, fail, complete) {
            if (succes === void 0) { succes = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            Common.Send(url, "post", data, succes, fail, complete);
        };
        /**
         * 发送Get请求
         * @param url url地址
         * @param data 数据
         * @param succes 成功方法
         * @param fail 失败方法
         * @param complete 都执行方法
         * @param error 错误方法
         */
        Common.SendGet = function (url, data, succes, fail, complete) {
            if (succes === void 0) { succes = null; }
            if (fail === void 0) { fail = null; }
            if (complete === void 0) { complete = null; }
            Common.Send(url, "get", data, succes, fail, complete);
        };
        /**
         * 绑定分页工具栏
         * @param SearchFun 查询方法
         * @param id 元素ID
         */
        Common.BindPageInfo = function (SearchFun, id) {
            if (id === void 0) { id = "PageInfoNav"; }
            var PageInfoNav = MDMa.$(id);
            if (PageInfoNav) {
                PageInfoNav.innerHTML = "";
                var PageInfo = document.createElement("ul");
                MDMa.AddClass(PageInfo, "pagination");
                PageInfoNav.appendChild(PageInfo);
                if (Common.config.PageInfo.PagingIndex > 1) {
                    /**
                     * 第一页
                     */
                    var pageFistItem = document.createElement("li");
                    MDMa.AddClass(pageFistItem, "page-item");
                    PageInfo.appendChild(pageFistItem);
                    var pageFistItemA = document.createElement("a");
                    MDMa.AddClass(pageFistItemA, "page-link");
                    pageFistItemA.innerText = "<<".toString();
                    pageFistItemA.dataset.target = "1";
                    MDMa.AddEvent(pageFistItemA, "click", SearchFun);
                    pageFistItem.appendChild(pageFistItemA);
                    /**
                     * 上一页
                     */
                    var pageUpItem = document.createElement("li");
                    MDMa.AddClass(pageUpItem, "page-item");
                    PageInfo.appendChild(pageUpItem);
                    var pageUpItemA = document.createElement("a");
                    MDMa.AddClass(pageUpItemA, "page-link");
                    pageUpItemA.innerText = "<".toString();
                    pageUpItemA.dataset.target = (Common.config.PageInfo.PagingIndex - 1).toString();
                    MDMa.AddEvent(pageUpItemA, "click", SearchFun);
                    pageUpItem.appendChild(pageUpItemA);
                }
                var pageItem = void 0;
                var pageItemA = void 0;
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
                    var pageDownItem = document.createElement("li");
                    MDMa.AddClass(pageDownItem, "page-item");
                    PageInfo.appendChild(pageDownItem);
                    var pageDownItemA = document.createElement("a");
                    MDMa.AddClass(pageDownItemA, "page-link");
                    pageDownItemA.innerText = ">".toString();
                    pageDownItemA.dataset.target = (Common.config.PageInfo.PagingIndex + 1).toString();
                    MDMa.AddEvent(pageDownItemA, "click", SearchFun);
                    pageDownItem.appendChild(pageDownItemA);
                    /**
                     * 最后一页
                     */
                    var pageLastItem = document.createElement("li");
                    MDMa.AddClass(pageLastItem, "page-item");
                    PageInfo.appendChild(pageLastItem);
                    var pageLastItemaA = document.createElement("a");
                    MDMa.AddClass(pageLastItemaA, "page-link");
                    pageLastItemaA.innerText = ">>".toString();
                    pageLastItemaA.dataset.target = Common.config.PageInfo.PagingCount.toString();
                    MDMa.AddEvent(pageLastItemaA, "click", SearchFun);
                    pageLastItem.appendChild(pageLastItemaA);
                }
            }
        };
        /**
         * 获得自定义属性或者父级自定义属性
         * @param element 元素对象
         * @param name 名称
         */
        Common.GetDataSetOrPanertDataSet = function (element, name) {
            var value = "";
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
        };
        Common.config = {
            ServerURL: "http://localhost:6731/",
            LoginUserName: "LOGINUSER",
            PageInfo: {
                PagingIndex: 1,
                PagingSize: 20
            }
        };
        return Common;
    }());
    RecordBill.Common = Common;
    /**
     * 登录用户模型
     */
    var LoginUserModel = /** @class */ (function () {
        function LoginUserModel() {
        }
        return LoginUserModel;
    }());
    RecordBill.LoginUserModel = LoginUserModel;
    /**
     *
     */
    var PageMode = /** @class */ (function () {
        function PageMode() {
        }
        return PageMode;
    }());
    RecordBill.PageMode = PageMode;
    /**
     * 用户模型
     */
    var UserModel = /** @class */ (function () {
        function UserModel() {
        }
        return UserModel;
    }());
    RecordBill.UserModel = UserModel;
})(RecordBill || (RecordBill = {}));
//# sourceMappingURL=Base.js.map