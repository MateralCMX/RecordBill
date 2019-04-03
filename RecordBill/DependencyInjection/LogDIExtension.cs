using Common;
using Log.EFRepository;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;
using System.Reflection;

namespace DependencyInjection
{
    /// <summary>
    /// Log依赖注入
    /// </summary>
    public static class LogDIExtension
    {
        /// <summary>
        /// 添加Log数据库服务
        /// </summary>
        /// <param name="services"></param>
        public static void AddLogServices(this IServiceCollection services)
        {
            services.AddDbContextPool<LogDbContext>(options => options.UseSqlServer(ApplicationConfig.LogDB.ConnectionString, m =>
            {
                m.EnableRetryOnFailure();
            }));
            services.AddTransient(typeof(ILogUnitOfWork), typeof(LogUnitOfWorkImpl));
            services.RegisterAssemblyPublicNonGenericClasses(Assembly.Load("Log.ServiceImpl"))
                .Where(c => c.Name.EndsWith("ServiceImpl"))
                .AsPublicImplementedInterfaces();
            services.RegisterAssemblyPublicNonGenericClasses(Assembly.Load("Log.EFRepository"))
                .Where(c => c.Name.EndsWith("RepositoryImpl"))
                .AsPublicImplementedInterfaces();
        }
    }
}
