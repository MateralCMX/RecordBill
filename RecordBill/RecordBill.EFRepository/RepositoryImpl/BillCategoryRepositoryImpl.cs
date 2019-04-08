using System;
using RecordBill.Domain;
using RecordBill.Domain.Repositorys;

namespace RecordBill.EFRepository.RepositoryImpl
{
    public class BillCategoryRepositoryImpl : RecordBillEFRepositoryImpl<BillCategory, Guid>, IBillCategoryRepository
    {
        public BillCategoryRepositoryImpl(RecordBillDbContext dbContext) : base(dbContext)
        {
        }
    }
}
