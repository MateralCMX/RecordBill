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
        /// 内容
        /// </summary>
        public string Contents { get; set; }
        /// <summary>
        /// 金额
        /// </summary>
        public decimal Amount { get; set; }
        /// <summary>
        /// 记录时间
        /// </summary>
        public DateTime RecordTime { get; set; }
        /// <summary>
        /// 账单类型ID
        /// </summary>
        public Guid FK_Type_ID { get; set; }
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
}