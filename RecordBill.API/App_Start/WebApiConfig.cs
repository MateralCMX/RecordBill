using System.Web.Http;
using System.Web.Http.Cors;

namespace RecordBill.API
{
    public static class WebApiConfig
    {
        public static void Register(HttpConfiguration config)
        {
            // Web API 配置和服务
            config.EnableCors(new EnableCorsAttribute("*", "*", "*"));
            // Web API 路由
            config.MapHttpAttributeRoutes();

            config.Routes.MapHttpRoute(
                name: "DefaultApi",
                routeTemplate: "api/{controller}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
            //注册统一异常处理
            config.Filters.Add(new WebApiExceptionAttribute());
            //注册登录验证
            config.Filters.Add(new VerificationLoginAttribute());
        }
    }
}
