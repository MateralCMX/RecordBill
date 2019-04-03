using Microsoft.EntityFrameworkCore;
using RecordBill.Domain;
using System.Reflection;

namespace RecordBill.EFRepository
{
    public class RecordBillDbContext : DbContext
    {
        public RecordBillDbContext(DbContextOptions<RecordBillDbContext> options) : base(options)
        {
        }
        /// <summary>
        /// 日志
        /// </summary>
        public DbSet<Log> Log { get; set; }
        /// <summary>
        /// 用户
        /// </summary>
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
