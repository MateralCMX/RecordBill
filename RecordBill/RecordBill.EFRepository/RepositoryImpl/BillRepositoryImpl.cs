using System;
using RecordBill.Domain;
using RecordBill.Domain.Repositorys;

namespace RecordBill.EFRepository.RepositoryImpl
{
    public class BillRepositoryImpl : RecordBillEFRepositoryImpl<Bill, Guid>, IBillRepository
    {
        public BillRepositoryImpl(RecordBillDbContext dbContext) : base(dbContext)
        {
        }
    }
}
