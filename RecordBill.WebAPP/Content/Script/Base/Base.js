'use strict';
var MDMa = MateralTools.DOMManager;
var MTMa = MateralTools.ToolManager;
var MLMa = MateralTools.LocalDataManager;
var mui = window["mui"];
var plus = window["plus"];
var RecordBill;
(function (RecordBill) {
    var APP;
    (function (APP) {
        /**
         * 公共方法
         */
        var Common = /** @class */ (function () {
            function Common() {
            }
            /**
             * 获得验证对象
             * @param e 触发事件对象
             */
            Common.GetValidityState = function (e) {
                MDMa.AddClass(e.target.parentElement, "error");
                var validity = e.target.validity;
                return validity;
            };
            /**
             * 移除错误样式
             * @param e
             */
            Common.RemoveError = function (e) {
                MDMa.RemoveClass(e.target.parentElement, "error");
            };
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
             * 获得页面路径
             * @param pageName 页面名称
             */
            Common.GetPageUrl = function (pageName) {
                var url;
                switch (pageName) {
                    case "MyInfo":
                        url = "/View/User/MyInfo.html";
                        break;
                    case "MyBill":
                        url = "/View/User/List.html";
                        break;
                    case "About":
                        url = "/View/Home/About.html";
                        break;
                    case "Setting":
                        url = "/View/Home/Setting.html";
                        break;
                    case "AddBill":
                    case "EditBill":
                        url = "/View/Bill/Edit.html";
                        break;
                    case "Login":
                    default:
                        url = "/View/User/Login.html";
                        break;
                }
                return url;
            };
            /**
             * 跳转
             * @param pageName 页面名称
             */
            Common.GoToPage = function (pageName, extras) {
                if (extras === void 0) { extras = {}; }
                switch (pageName) {
                    case "MyBill":
                        extras["Type"] = "My";
                        break;
                }
                Common.OpenWindow(Common.GetPageUrl(pageName), pageName, extras);
            };
            /**
             * 打开窗口
             * @param url 路径
             * @param id ID
             * @param extras 参数
             */
            Common.OpenWindow = function (url, id, extras) {
                var opt = {
                    url: url,
                    id: id,
                    styles: {
                        top: 0,
                        bottom: 0,
                    },
                    extras: {},
                    show: {
                        aniShow: "slide-in-right",
                    },
                    waiting: {
                        title: '正在加载...',
                    }
                };
                if (extras) {
                    opt.extras = extras;
                }
                mui.openWindow(opt);
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
                        mui.toast("服务器不能识别该请求。");
                        break;
                    case 401://未登录
                        Common.GoToPage("Login");
                        break;
                    default://服务器错误或其他
                        mui.toast("服务器发生错误，请联系管理员。");
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
            /**
             * 绑定跳转页面按钮
             */
            Common.BindBtnGotoPage = function () {
                var btns = document.querySelectorAll("*[data-gotopage]");
                for (var i = 0; i < btns.length; i++) {
                    MDMa.AddEvent(btns[i], "tap", Common.Event_BtnGotoPage_tap);
                }
            };
            /**
             * 跳转页面按钮事件
             * @param e
             */
            Common.Event_BtnGotoPage_tap = function (e) {
                var element = e.target;
                var targetPage = Common.GetDataSetOrPanertDataSet(element, "gotopage");
                if (targetPage) {
                    var pageExtras = Common.GetDataSetOrPanertDataSet(element, "extras");
                    if (pageExtras) {
                        var Extras = pageExtras.split("&");
                        var paras = {};
                        var temp = void 0;
                        for (var i = 0; i < Extras.length; i++) {
                            temp = Extras[i].split("=");
                            if (temp[0] && temp[1]) {
                                paras[temp[0]] = temp[1];
                            }
                        }
                        Common.GoToPage(targetPage, paras);
                    }
                    else {
                        Common.GoToPage(targetPage);
                    }
                }
            };
            Common.config = {
                ServerURL: "http://myqa.materalcmx.com/",
                LoginUserName: "LOGINUSER",
            };
            return Common;
        }());
        APP.Common = Common;
        /**
         * 登录用户模型
         */
        var LoginUserModel = /** @class */ (function () {
            function LoginUserModel() {
            }
            return LoginUserModel;
        }());
        APP.LoginUserModel = LoginUserModel;
        /**
         *
         */
        var PageMode = /** @class */ (function () {
            function PageMode() {
            }
            /**
             * 设置值
             * @param inputM
             */
            PageMode.SetValue = function (inputM) {
                PageMode.DataCount = inputM["DataCount"];
                PageMode.PagingCount = inputM["PagingCount"];
                PageMode.PagingIndex = inputM["PagingIndex"];
                PageMode.PagingSize = inputM["PagingSize"];
            };
            /**
             * 当前页面
             */
            PageMode.PagingIndex = 1;
            /**
             * 总页数
             */
            PageMode.PagingCount = 0;
            /**
             * 数据总数
             */
            PageMode.DataCount = 0;
            /**
             * 显示数量
             */
            PageMode.PagingSize = 20;
            return PageMode;
        }());
        APP.PageMode = PageMode;
        /**
         * 用户模型
         */
        var UserModel = /** @class */ (function () {
            function UserModel() {
            }
            return UserModel;
        }());
        APP.UserModel = UserModel;
    })(APP = RecordBill.APP || (RecordBill.APP = {}));
})(RecordBill || (RecordBill = {}));
MDMa.AddEvent(window, "load", function () {
    RecordBill.APP.Common.BindBtnGotoPage();
});
//# sourceMappingURL=Base.js.map