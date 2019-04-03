using Materal.TTA.Common;

namespace User.EFRepository
{
    public class UserUnitOfWorkImpl : EFUnitOfWorkImpl<UserDbContext>, IUserUnitOfWork
    {
        public UserUnitOfWorkImpl(UserDbContext context) : base(context)
        {
        }
    }
}
