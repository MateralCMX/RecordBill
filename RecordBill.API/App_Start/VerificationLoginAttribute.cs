using MateralTools.MVerify;
using RecordBill.BLL;
using RecordBill.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace RecordBill.API
{    /// <summary>
     /// 验证登录过滤器
     /// </summary>
    public class VerificationLoginAttribute : ActionFilterAttribute
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        public VerificationLoginAttribute()
        {
        }
        /// <summary>
        /// 登录用户参数名称
        /// </summary>
        public const string LoginUserIDParamName = "LoginUserID";
        /// <summary>
        /// Token参数名称
        /// </summary>
        public const string TokenParamName = "Token";
        /// <summary>
        /// 执行Action之前触发
        /// </summary>
        /// <param name="actionContext"></param>
        public override void OnActionExecuting(HttpActionContext actionContext)
        {
            if (actionContext.ControllerContext.Controller.GetType().GetCustomAttributes(typeof(NotVerificationLoginAttribute), false).Length == 0)
            {
                string MeName = actionContext.ControllerContext.Request.RequestUri.Segments.Last();
                if (actionContext.ControllerContext.Controller.GetType().GetMethod(MeName).GetCustomAttributes(typeof(NotVerificationLoginAttribute), false).Length == 0)
                {
                    Guid loginUserID = Guid.Empty; ;
                    string token = string.Empty;
                    if (actionContext.Request.Method == HttpMethod.Get)
                    {

                        string query = actionContext.Request.RequestUri.Query;
                        if (!query.MIsNullOrEmpty())
                        {
                            string[] paras = query.TrimStart('?').Split('&');
                            string[] temp;
                            foreach (string para in paras)
                            {
                                temp = para.Split('=');
                                if (temp[0] == LoginUserIDParamName && !temp[1].MIsNullOrEmpty())
                                {
                                    loginUserID = Guid.Parse(temp[1]);
                                }
                                else if (temp[0] == TokenParamName && !temp[1].MIsNullOrEmpty())
                                {
                                    token = temp[1];
                                }
                            }
                        }
                    }
                    else
                    {
                        object obj = actionContext.ActionArguments.ToArray()[0].Value;
                        Type objType = obj.GetType();
                        Type iVerificationLoginType = objType.GetInterface(nameof(IVerificationLoginModel));
                        if (iVerificationLoginType != null)
                        {
                            IVerificationLoginModel loginM = (IVerificationLoginModel)obj;
                            loginUserID = loginM.LoginUserID;
                            token = loginM.Token;
                        }
                    }
                    if (loginUserID != Guid.Empty && !token.MIsNullOrEmpty())
                    {
                        TokenBLL tokenBLL = new TokenBLL();
                        bool resM = tokenBLL.VerificationToken(loginUserID, token, TokenTypesEnum.Login);
                        if (resM)//验证通过
                        {
                            base.OnActionExecuting(actionContext);
                        }
                        else//Token过期或用户不存在
                        {
                            actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                        }
                    }
                    else//未找到LoginUserID和Token
                    {
                        actionContext.Response = new HttpResponseMessage(HttpStatusCode.BadRequest);
                    }
                }
                else//方法层不进行登录验证
                {
                    base.OnActionExecuting(actionContext);
                }
            }
            else//控制器层不进行登录验证
            {
                base.OnActionExecuting(actionContext);
            }
        }
    }
    /// <summary>
    /// 不进行登录验证
    /// </summary>
    public class NotVerificationLoginAttribute : Attribute
    {
        /// <summary>
        /// 
        /// </summary>
        public NotVerificationLoginAttribute() { }
    }
}