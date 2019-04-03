using Domain;
using System;

namespace RecordBill.Domain
{
    public sealed class BillCategory : BaseEntity<Guid>
    {
        /// <summary>
        /// 用户唯一标识
        /// </summary>
        public Guid UserID { get; set; }
        /// <summary>
        /// 类型名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 用户
        /// </summary>
        public User User { get; set; }
    }
}
