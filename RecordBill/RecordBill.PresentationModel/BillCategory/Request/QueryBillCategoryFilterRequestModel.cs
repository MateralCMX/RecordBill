using System.ComponentModel.DataAnnotations;

namespace RecordBill.PresentationModel.BillCategory.Request
{
    /// <summary>
    /// 查询账单类型过滤器请求模型
    /// </summary>
    public class QueryBillCategoryFilterRequestModel
    {
        /// <summary>
        /// 用户Token
        /// </summary>
        [Required(ErrorMessage = "用户Token不可以为空")]
        public string Token { get; set; }
    }
}
