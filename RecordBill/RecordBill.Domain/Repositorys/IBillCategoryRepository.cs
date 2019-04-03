using System;
using Materal.TTA.Common;

namespace RecordBill.Domain.Repositorys
{
    public interface IBillCategoryRepository : IEFRepository<BillCategory, Guid>
    {
    }
}
