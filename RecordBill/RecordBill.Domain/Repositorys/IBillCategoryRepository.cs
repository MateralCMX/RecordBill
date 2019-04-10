using System;
using System.Threading.Tasks;
using Materal.TTA.Common;

namespace RecordBill.Domain.Repositorys
{
    public interface IBillCategoryRepository : IEFRepository<BillCategory, Guid>
    {
        /// <summary>
        /// 获得最大位序
        /// </summary>
        /// <returns></returns>
        int GetMaxIndex();
    }
}
