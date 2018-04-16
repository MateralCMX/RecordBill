using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecordBill.Model
{
    /// <summary>
    /// 账单报告模型
    /// </summary>
    public class BillReportModel
    {
        /// <summary>
        /// 数据
        /// </summary>
        public List<V_Bill> Data { get; set; }
        /// <summary>
        /// 最大
        /// </summary>
        public V_Bill MaxBill
        {
            get
            {
                return Data.OrderByDescending(m => m.Amount).FirstOrDefault();
            }
        }
        /// <summary>
        /// 最小
        /// </summary>
        public V_Bill MinBill
        {
            get
            {
                return Data.OrderBy(m => m.Amount).FirstOrDefault();
            }
        }
        /// <summary>
        /// 总计
        /// </summary>
        public decimal Count
        {
            get
            {
                return Data.Sum(m => m.Amount);
            }
        }
    }
}
