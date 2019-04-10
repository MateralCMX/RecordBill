using RecordBill.Domain;
using RecordBill.Domain.Repositorys;
using System;
using System.Linq;

namespace RecordBill.EFRepository.RepositoryImpl
{
    public class BillCategoryRepositoryImpl : RecordBillEFRepositoryImpl<BillCategory, Guid>, IBillCategoryRepository
    {
        public BillCategoryRepositoryImpl(RecordBillDbContext dbContext) : base(dbContext)
        {
        }

        public int GetMaxIndex()
        {
            if (DBSet.Any())
            {
                return DBSet.Max(m => m.Index);
            }
            return -1;
        }
    }
}
