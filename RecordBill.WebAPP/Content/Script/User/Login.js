/// <reference path="../../../lib/m-tools/m-tools.ts" />
/// <reference path="../base.js" />
/// <reference path="../../../lib/mui/js/mui.min.js" />
var LoginPage = function ()
{
    /**
    * 初始化
    */
    function Init()
    {
        mui.init();
        BindEvent();
    }
    /**
    * 绑定事件
    */
    function BindEvent()
    {
        MDMa.AddEvent("BtnLogin", "tap", Event_BtnLogin_Tap);
        MDMa.AddEvent("InputAccount", "invalid", function (e)
        {
            MDMa.AddClass(e.target.parentElement, "error");
        });
        MDMa.AddEvent("InputAccount", "change", function (e)
        {
            MDMa.RemoveClass(e.target.parentElement, "error");
        });
        MDMa.AddEvent("InputPassword", "invalid", function (e)
        {
            MDMa.AddClass(e.target.parentElement, "error");
        });
        MDMa.AddEvent("InputPassword", "change", function (e)
        {
            MDMa.RemoveClass(e.target.parentElement, "error");
        });
    }
    /**
    * 登录按钮点击事件
    */
    function Event_BtnLogin_Tap(e)
    {
        let element = e.target;
        mui(element).button('loading');
        var InputM = GetInputData();
        if (InputM) {
            Login(InputM);
        }
        else {
            mui(element).button('reset');
        }
    }
    /**
    * 获得输入数据
    */
    function GetInputData() {
        var loginForm = MDMa.$("loginForm");
        if (loginForm.checkValidity()) {
            return {
                Account: MDMa.$("InputAccount").value,
                Password: MDMa.$("InputPassword").value
            }
        }
        return null;
    }
    /**
     * 登录方法
     */
    function Login(InputM)
    {
        if (InputM.Account == "Admin" && InputM.Password == "123456") {
            window.location = "http://127.0.0.1:8020/RecordBill.WebAPP/View/Index.html";
        }
        else {
            mui.alert("帐号或者密码错误");
            mui("#BtnLogin").button('reset');
        }
    }
    return {
        Init: Init
    }
}
MDMa.AddEvent(window, "load", function () {
    var pageM = new LoginPage();
    pageM.Init()
});