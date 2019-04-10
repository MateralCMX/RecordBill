using Domain;
using System;

namespace RecordBill.Domain
{
    public sealed class Bill : BaseEntity<Guid>
    {
        /// <summary>
        /// 用户唯一标识
        /// </summary>
        public Guid UserID { get; set; }
        /// <summary>
        /// 内容
        /// </summary>
        public string Contents { get; set; }
        /// <summary>
        /// 金额
        /// </summary>
        public double Amount { get; set; }
        /// <summary>
        /// 记账时间
        /// </summary>
        public DateTime RecordDate { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        public string Category { get; set; }
        /// <summary>
        /// 用户
        /// </summary>
        public User User { get; set; }
    }
}
