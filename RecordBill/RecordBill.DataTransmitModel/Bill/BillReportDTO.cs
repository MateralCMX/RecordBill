using System.Collections.Generic;
using System.Linq;

namespace RecordBill.DataTransmitModel.Bill
{
    /// <summary>
    /// 账单报表数据传输模型
    /// </summary>
    public class BillReportDTO
    {
        /// <summary>
        /// 最少的一笔
        /// </summary>
        public BillDTO MinBill => Bills.OrderBy(m => m.Amount).FirstOrDefault();
        /// <summary>
        /// 最贵的一笔
        /// </summary>
        public BillDTO MaxBill => Bills.OrderByDescending(m => m.Amount).FirstOrDefault();
        /// <summary>
        /// 总共花费
        /// </summary>
        public double Sum => Bills.Sum(m => m.Amount);
        /// <summary>
        /// 账单信息
        /// </summary>
        public List<BillDTO> Bills { get; set; }
    }
}
