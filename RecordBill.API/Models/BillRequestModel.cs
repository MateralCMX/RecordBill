using MateralTools.MResult;
using RecordBill.Model;
using System;

namespace RecordBill.API
{
    /// <summary>
    /// 账单添加请求模型
    /// </summary>
    public class BillAddRequestModel : RequestModel<T_Bill>, IVerificationLoginModel
    {
        /// <summary>
        /// 账号
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
        /// 登录用户ID
        /// </summary>
        public Guid LoginUserID { get; set; }
        /// <summary>
        /// 登录用户Token
        /// </summary>
        public string Token { get; set; }
    }
    /// <summary>
    /// 账单修改请求模型
    /// </summary>
    public class BillUpdateRequestModel : BillAddRequestModel, IVerificationLoginModel
    {
        /// <summary>
        /// 账单ID
        /// </summary>
        public Guid ID { get; set; }
    }
    /// <summary>
    /// 账单登录请求模型
    /// </summary>
    public class BillLoginRequestModel
    {
        /// <summary>
        /// 账号
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 密码
        /// </summary>
        public string Password { get; set; }
    }
    /// <summary>
    /// 账单修改我的密码请求模型
    /// </summary>
    public class BillEditMyPasswordRequestModel : IVerificationLoginModel
    {
        /// <summary>
        /// 旧密码
        /// </summary>
        public string OldPassword { get; set; }
        /// <summary>
        /// 新密码
        /// </summary>
        public string NewPassword { get; set; }
        /// <summary>
        /// 登录用户ID
        /// </summary>
        public Guid LoginUserID { get; set; }
        /// <summary>
        /// 登录用户Token
        /// </summary>
        public string Token { get; set; }
    }
    /// <summary>
    /// 账单修改密码请求模型
    /// </summary>
    public class BillEditPasswordRequestModel : BillEditMyPasswordRequestModel, IVerificationLoginModel
    {
        /// <summary>
        /// 账单ID
        /// </summary>
        public Guid BillID { get; set; }
    }
}