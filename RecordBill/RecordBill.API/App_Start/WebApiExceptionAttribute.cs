using RecordBill.BLL;
using System;
using System.Net;
using System.Net.Http;
using System.Web.Http.Filters;

namespace RecordBill.API
{
    /// <summary>
    ///  WebAPI异常处理
    /// </summary>
    public class WebApiExceptionAttribute : ExceptionFilterAttribute
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        public WebApiExceptionAttribute()
        {
        }
        /// <summary>
        /// 发生异常时触发
        /// </summary>
        /// <param name="actionExecutedContext">请求对象</param>
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            Exception ex = actionExecutedContext.Exception;
            ApplicationLogBLL.WriteExceptionLog(ex);
            base.OnException(actionExecutedContext);
            actionExecutedContext.Response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
        }
    }
}