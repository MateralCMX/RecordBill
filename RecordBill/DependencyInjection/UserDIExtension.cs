using Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;
using System.Reflection;
using User.EFRepository;

namespace DependencyInjection
{
    /// <summary>
    /// 用户依赖注入扩展类
    /// </summary>
    public static class UserDIExtension
    {
        /// <summary>
        /// 添加用户服务
        /// </summary>
        /// <param name="services"></param>
        public static void AddUserServices(this IServiceCollection services)
        {
            services.AddDbContextPool<UserDbContext>(options => options.UseSqlServer(ApplicationConfig.UserDB.ConnectionString, m =>
            {
                m.EnableRetryOnFailure();
            }));
            services.AddTransient(typeof(IUserUnitOfWork), typeof(UserUnitOfWorkImpl));
            services.RegisterAssemblyPublicNonGenericClasses(Assembly.Load("User.EFRepository"))
                .Where(c => c.Name.EndsWith("RepositoryImpl"))
                .AsPublicImplementedInterfaces();
            services.RegisterAssemblyPublicNonGenericClasses(Assembly.Load("User.ServiceImpl"))
                .Where(c => c.Name.EndsWith("ServiceImpl"))
                .AsPublicImplementedInterfaces();
        }
    }
}
