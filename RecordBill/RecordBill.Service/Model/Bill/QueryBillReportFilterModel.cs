using System;

namespace RecordBill.Service.Model.Bill
{
    /// <summary>
    /// 查询账单报表过滤器模型
    /// </summary>
    public class QueryBillReportFilterModel
    {
        /// <summary>
        /// 用户唯一标识
        /// </summary>
        public Guid UserID { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime StartDate { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime EndDate { get; set; }
    }
}
