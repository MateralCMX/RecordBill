using Domain;
using System;

namespace User.Domain
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
        /// 删除标识
        /// </summary>
        public bool IsDelete { get; set; }
    }
}
