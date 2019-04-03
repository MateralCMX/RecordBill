using System;
using Materal.TTA.Common;

namespace RecordBill.Domain.Repositorys
{
    public interface IUserRepository : IEFRepository<User, Guid>
    {
    }
}
