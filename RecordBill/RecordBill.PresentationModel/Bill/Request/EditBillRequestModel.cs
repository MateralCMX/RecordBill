using System;
using System.ComponentModel.DataAnnotations;

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
        [Required(ErrorMessage = "唯一标识不可以为空")]
        public Guid ID { get; set; }
    }
}
