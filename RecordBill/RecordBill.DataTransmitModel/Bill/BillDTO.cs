using System;

namespace RecordBill.DataTransmitModel.Bill
{
    /// <summary>
    /// 账单数据传输模型
    /// </summary>
    public class BillDTO
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public Guid ID { get; set; }
        /// <summary>
        /// 内容
        /// </summary>
        public string Contents { get; set; }
        /// <summary>
        /// 数量
        /// </summary>
        public double Amount { get; set; }
        /// <summary>
        /// 记账时间
        /// </summary>
        public DateTime RecordDate { get; set; }
        /// <summary>
        /// 记账时间字符串
        /// </summary>
        public string RecordDateStr => RecordDate.ToShortDateString();
        /// <summary>
        /// 类型
        /// </summary>
        public string Category { get; set; }
    }
}
