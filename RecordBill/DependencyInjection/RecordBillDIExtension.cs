using Common;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;
using RecordBill.EFRepository;
using System.Reflection;

namespace DependencyInjection
{
    /// <summary>
    /// 记账依赖注入扩展类
    /// </summary>
    public static class RecordBillDIExtension
    {
        /// <summary>
        /// 添加记账服务
        /// </summary>
        /// <param name="services"></param>
        public static void AddRecordBillServices(this IServiceCollection services)
        {
            services.AddDbContextPool<RecordBillDbContext>(options => options.UseSqlServer(ApplicationConfig.RecordBillDB.ConnectionString, m =>
            {
                m.EnableRetryOnFailure();
                m.UseRowNumberForPaging();
            }));
            services.AddTransient(typeof(IRecordBillUnitOfWork), typeof(RecordBillUnitOfWorkImpl));
            services.RegisterAssemblyPublicNonGenericClasses(Assembly.Load("RecordBill.EFRepository"))
                .Where(c => c.Name.EndsWith("RepositoryImpl"))
                .AsPublicImplementedInterfaces();
            services.RegisterAssemblyPublicNonGenericClasses(Assembly.Load("RecordBill.ServiceImpl"))
                .Where(c => c.Name.EndsWith("ServiceImpl"))
                .AsPublicImplementedInterfaces();
        }
    }
}
