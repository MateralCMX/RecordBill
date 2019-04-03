using Domain;
using System;
using System.Collections.Generic;

namespace RecordBill.Domain
{
    /// <summary>
    /// 用户
    /// </summary>
    public sealed class User : BaseEntity<Guid>
    {
        /// <summary>
        /// 账户
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }
        /// <summary>
        /// 姓名
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 微信OpenID
        /// </summary>
        public string WeChatOpenID { get; set; }
        /// <summary>
        /// 账单
        /// </summary>
        public ICollection<Bill> Bills { get; set; }
        /// <summary>
        /// 账单类型
        /// </summary>
        public ICollection<BillCategory> BillCategories { get; set; }
    }
}
