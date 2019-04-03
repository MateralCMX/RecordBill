using System;
using Materal.TTA.Common;

namespace RecordBill.Domain.Repositorys
{
    public interface IBillRepository : IEFRepository<Bill, Guid>
    {
    }
}
