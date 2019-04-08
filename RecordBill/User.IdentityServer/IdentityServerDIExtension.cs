using DependencyInjection;
using IdentityServer4.Validation;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace User.IdentityServer
{
    public static class IdentityServerDIExtension
    {
        /// <summary>
        /// 添加认证服务器服务
        /// </summary>
        /// <param name="services"></param>
        public static void AddIdentityServerServices(this IServiceCollection services)
        {
            services.AddBaseServices();
            services.AddRecordBillServices();
            services.AddAutoMapperService(Assembly.Load("RecordBill.ServiceImpl"), Assembly.Load("RecordBill.PresentationModel"));
            IIdentityServerBuilder builder = services.AddIdentityServer()
                .AddInMemoryApiResources(IdentityConfig.GetAPIs())
                .AddInMemoryClients(IdentityConfig.GetClients())
                .AddInMemoryIdentityResources(IdentityConfig.GetIdentityResources());
            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            builder.AddDeveloperSigningCredential();
        }
    }
}
