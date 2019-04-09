using System;

namespace RecordBill.Service.Model.BillCategory
{
    public class EditBillCategoryModel : AddBillCategoryModel
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public Guid ID { get; set; }
    }
}
