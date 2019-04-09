using System;

namespace RecordBill.Service.Model.Bill
{
    public class EditBillModel : AddBillModel
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public Guid ID { get; set; }
    }
}
