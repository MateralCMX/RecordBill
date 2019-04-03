using MateralTools.MResult;
using RecordBill.Model;
using System;

namespace RecordBill.API
{
    /// <summary>
    /// 用户添加请求模型
    /// </summary>
    public class UserAddRequestModel : RequestModel<T_User>, IVerificationLoginModel
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
    /// 用户修改请求模型
    /// </summary>
    public class UserUpdateRequestModel : UserAddRequestModel, IVerificationLoginModel
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public Guid ID { get; set; }
    }
    /// <summary>
    /// 用户登录请求模型
    /// </summary>
    public class UserLoginRequestModel
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
    /// 用户修改我的密码请求模型
    /// </summary>
    public class UserEditMyPasswordRequestModel : IVerificationLoginModel
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
    /// 用户修改密码请求模型
    /// </summary>
    public class UserEditPasswordRequestModel : UserEditMyPasswordRequestModel, IVerificationLoginModel
    {
        /// <summary>
        /// 用户ID
        /// </summary>
        public Guid UserID { get; set; }
    }
}