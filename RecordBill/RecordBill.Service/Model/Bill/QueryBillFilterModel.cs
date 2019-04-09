using Materal.Common;
using System;

namespace RecordBill.Service.Model.Bill
{
    /// <summary>
    /// 查询账单过滤器模型
    /// </summary>
    public class QueryBillFilterModel : PageRequestModel
    {
        /// <summary>
        /// 用户唯一标识
        /// </summary>
        public Guid UserID { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime? StartDate { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime? EndDate { get; set; }
    }
}
