using System;

namespace RecordBill.PresentationModel.BillCategory.Request
{
    /// <summary>
    /// 修改账单类型请求模型
    /// </summary>
    public class EditBillCategoryRequestModel : AddBillCategoryRequestModel
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public Guid ID { get; set; }
    }
}
