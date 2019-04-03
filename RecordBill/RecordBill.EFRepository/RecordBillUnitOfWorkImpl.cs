using Materal.TTA.Common;

namespace RecordBill.EFRepository
{
    public class RecordBillUnitOfWorkImpl : EFUnitOfWorkImpl<RecordBillDbContext>, IRecordBillUnitOfWork
    {
        public RecordBillUnitOfWorkImpl(RecordBillDbContext context) : base(context)
        {
        }
    }
}
