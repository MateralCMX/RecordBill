using System;
using System.ComponentModel.DataAnnotations;

namespace RecordBill.PresentationModel.Bill.Request
{
    /// <summary>
    /// 查询账单报表过滤器请求模型
    /// </summary>
    public class QueryBillReportFilterRequestModel
    {
        /// <summary>
        /// 用户Token
        /// </summary>
        [Required(ErrorMessage = "用户Token不可以为空")]
        public string Token { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        [Required(ErrorMessage = "开始时间不可以为空")]
        public DateTime StartDate { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        [Required(ErrorMessage = "结束时间不可以为空")]
        public DateTime EndDate { get; set; }
    }
}
