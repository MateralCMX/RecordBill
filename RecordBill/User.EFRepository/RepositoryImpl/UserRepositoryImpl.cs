using System;
using User.Domain.Repositorys;

namespace User.EFRepository.RepositoryImpl
{
    public class UserRepositoryImpl : UserEFRepositoryImpl<Domain.User, Guid>, IUserRepository
    {
        public UserRepositoryImpl(UserDbContext dbContext) : base(dbContext)
        {
        }
    }
}
