using System;

namespace RecordBill.PresentationModel.Bill.Request
{
    /// <summary>
    /// 修改账单请求模型
    /// </summary>
    public class EditBillRequestModel : AddBillRequestModel
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public Guid ID { get; set; }
    }
}
