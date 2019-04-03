using System;
using RecordBill.Domain;
using RecordBill.Domain.Repositorys;

namespace RecordBill.EFRepository.RepositoryImpl
{
    public class UserRepositoryImpl : RecordBillEFRepositoryImpl<User, Guid>, IUserRepository
    {
        public UserRepositoryImpl(RecordBillDbContext dbContext) : base(dbContext)
        {
        }
    }
}
