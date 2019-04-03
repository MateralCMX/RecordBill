using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace User.EFRepository
{
    public class UserDbContext : DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext> options) : base(options)
        {
        }
        /// <summary>
        /// 用户
        /// </summary>
        public DbSet<Domain.User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        }
    }
}
