using System.ComponentModel.DataAnnotations;

namespace RecordBill.PresentationModel.BillCategory.Request
{
    /// <summary>
    /// 添加账单类型请求模型
    /// </summary>
    public class AddBillCategoryRequestModel
    {
        /// <summary>
        /// 用户Token
        /// </summary>
        [Required(ErrorMessage = "用户Token不可以为空")]
        public string Token { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        [Required(ErrorMessage = "名称不可以为空"), StringLength(20, ErrorMessage = "名称长度不能大于20")]
        public string Name { get; set; }
    }
}
