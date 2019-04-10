using System;
using System.ComponentModel.DataAnnotations;

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
        [Required(ErrorMessage = "唯一标识不可以为空")]
        public Guid ID { get; set; }
    }
}
