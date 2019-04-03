using Materal.TTA.Common;

namespace User.EFRepository
{
    public class UserEFRepositoryImpl<T, TKey> : EFRepositoryImpl<T, TKey> where T : class, IEntity<TKey>, new()
    {
        public UserEFRepositoryImpl(UserDbContext dbContext) : base(dbContext)
        {
        }
    }
}
