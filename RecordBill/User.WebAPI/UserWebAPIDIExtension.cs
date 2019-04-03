using DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
namespace User.WebAPI
{
    /// <summary>
    /// WebAPI依赖注入扩展
    /// </summary>
    public static class UserWebAPIDIExtension
    {
        /// <summary>
        /// 添加WebAPI服务
        /// </summary>
        /// <param name="services"></param>
        public static void AddUserWebAPIServices(this IServiceCollection services)
        {
            services.AddBaseServices();
            services.AddUserServices();
            services.AddAutoMapperService(Assembly.Load("User.ServiceImpl"), Assembly.Load("User.PresentationModel"));
        }
    }
}
