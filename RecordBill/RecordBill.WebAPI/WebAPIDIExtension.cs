using DependencyInjection;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
namespace RecordBill.WebAPI
{
    /// <summary>
    /// WebAPI依赖注入扩展
    /// </summary>
    public static class WebAPIDIExtension
    {
        /// <summary>
        /// 添加WebAPI服务
        /// </summary>
        /// <param name="services"></param>
        public static void AddWebAPIServices(this IServiceCollection services)
        {
            services.AddBaseServices();
            services.AddRecordBillServices();
            services.AddAutoMapperService(Assembly.Load("RecordBill.ServiceImpl"), Assembly.Load("RecordBill.PresentationModel"));
        }
    }
}
