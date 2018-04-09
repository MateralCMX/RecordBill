using System;

namespace RecordBill.Model
{
    /// <summary>
    /// 登录用户模型
    /// </summary>
    public class LoginUserModel
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public Guid UserID { get; set; }
        /// <summary>
        /// Token值
        /// </summary>
        public string Token { get; set; }
    }
}
