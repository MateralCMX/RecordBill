'use strict';
import MDMa = MateralTools.DOMManager;
import MTMa = MateralTools.ToolManager;
import MLMa = MateralTools.LocalDataManager;
let mui = window["mui"];
let plus = window["plus"];
namespace RecordBill.APP {
    /**
     * 公共方法
     */
    export class Common {
        public static config = {
            ServerURL: "http://myqa.materalcmx.com/",//服务器地址
            LoginUserName: "LOGINUSER",//保存登录用户Key
            PageInfo: {
                PagingIndex:1,
                PagingSize: 20
            } as PageMode
        };
        /**
         * 获得验证对象
         * @param e 触发事件对象
         */
        public static GetValidityState(e: Event): ValidityState {
            MDMa.AddClass((e.target as HTMLInputElement).parentElement, "error");
            let validity: ValidityState = (e.target as HTMLInputElement).validity;
            return validity;
        }
        /**
         * 移除错误样式
         * @param e
         */
        public static RemoveError(e: Event) {
            MDMa.RemoveClass((e.target as HTMLInputElement).parentElement, "error");
        }
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
         * 获得页面路径
         * @param pageName 页面名称
         */
        public static GetPageUrl(pageName: string) {
            let url: string;
            switch (pageName) {
                case "MyInfo":
                    url = "/View/User/MyInfo.html";
                    break;
                case "About":
                    url = "/View/Home/About.html";
                    break;
                case "Setting":
                    url = "/View/Home/Setting.html";
                    break;
                case "AddBill":
                    url = "/View/Bill/Edit.html";
                    break;
                case "Login":
                default:
                    url = "/View/User/Login.html";
                    break;
            }
            return url;
        }
        /**
         * 跳转
         * @param pageName 页面名称
         */
        public static GoToPage(pageName: string) {
            let extras: any = null;
            switch (pageName) {
                case "AddBill":
                    extras = {
                        Type: "Add"
                    };
                    break;
            }
            Common.OpenWindow(Common.GetPageUrl(pageName), pageName, extras);
        }
        /**
         * 打开窗口
         * @param url 路径
         * @param id ID
         * @param extras 参数
         */
        public static OpenWindow(url: string, id: string, extras: any) {
            let opt = {
                url: url,
                id: id,
                styles: {
                    top: 0,//新页面顶部位置
                    bottom: 0,//新页面底部位置
                },
                extras: {
                },
                show: {
                    aniShow: "slide-in-right",//页面显示动画，默认为”slide-in-right“；
                },
                waiting: {
                    title: '正在加载...',//等待对话框上显示的提示内容
                }
            };
            if (extras) {
                opt.extras = extras;
            }
            mui.openWindow(opt);
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
                    mui.toast("服务器不能识别该请求。");
                    break;
                case 401://未登录
                    Common.GoToPage("Login");
                    break;
                default://服务器错误或其他
                    mui.toast("服务器发生错误，请联系管理员。");
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
         * 绑定跳转页面按钮
         */
        public static BindBtnGotoPage() {
            let btns = document.querySelectorAll("*[data-gotopage]");
            for (var i = 0; i < btns.length; i++) {
                MDMa.AddEvent(btns[i], "tap", Common.Event_BtnGotoPage_tap);
            }
        }
        /**
         * 跳转页面按钮事件
         * @param e
         */
        public static Event_BtnGotoPage_tap(e: Event) {
            let element = e.target as HTMLElement;
            let targetPage = Common.GetDataSetOrPanertDataSet(element, "gotopage");
            if (targetPage) {
                Common.GoToPage(targetPage);
            }
        }
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
MDMa.AddEvent(window, "load", function () {
    RecordBill.APP.Common.BindBtnGotoPage();
});