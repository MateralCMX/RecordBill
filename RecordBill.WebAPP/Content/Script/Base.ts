'use strict';
import MDMa = MateralTools.DOMManager;
import MTMa = MateralTools.ToolManager;
import MLMa = MateralTools.LocalDataManager;
namespace RecordBill.APP {
    /**
     * 公共方法
     */
    export class Common {
        public static config = {
            ServerURL: "http://localhost:6731/",//服务器地址
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
                    window["mui"]["alert"]("服务器不能识别该请求。", "请求错误");
                    break;
                case 401://未登录
                    Common.GoToPage("Login");
                    break;
                default://服务器错误或其他
                    window["mui"]["alert"]("服务器发生错误，请联系管理员。", "网页发生错误");
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