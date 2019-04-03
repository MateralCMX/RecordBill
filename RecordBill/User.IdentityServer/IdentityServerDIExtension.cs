using DependencyInjection;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Hosting;
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
        /// <param name="environment"></param>
        /// <param name="migrationsAssembly"></param>
        public static void AddIdentityServerServices(this IServiceCollection services, IHostingEnvironment environment, string migrationsAssembly)
        {
            services.AddBaseServices();
            services.AddRecordBillServices();
            services.AddAutoMapperService(Assembly.Load("RecordBill.ServiceImpl"));
            IIdentityServerBuilder builder = services.AddIdentityServer()
                .AddInMemoryApiResources(IdentityConfig.GetAPIs())
                .AddInMemoryClients(IdentityConfig.GetClients())
                .AddInMemoryIdentityResources(IdentityConfig.GetIdentityResources());
            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            builder.AddDeveloperSigningCredential();
        }
    }
}
