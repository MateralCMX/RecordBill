using Materal.TTA.Common;

namespace RecordBill.EFRepository
{
    public class RecordBillEFRepositoryImpl<T, TKey> : EFRepositoryImpl<T, TKey> where T : class, IEntity<TKey>, new()
    {
        public RecordBillEFRepositoryImpl(RecordBillDbContext dbContext) : base(dbContext)
        {
        }
    }
}
