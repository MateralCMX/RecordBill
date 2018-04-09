using System;

namespace RecordBill.API
{
    /// <summary>
    /// 登录用户接口
    /// </summary>
    public interface IVerificationLoginModel
    {
        /// <summary>
        /// 登录用户ID
        /// </summary>
        Guid LoginUserID { get; set; }
        /// <summary>
        /// 登录用户Token
        /// </summary>
        string Token { get; set; }
    }
}