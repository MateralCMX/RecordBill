using MateralTools.MResult;
using RecordBill.Model;
using System;

namespace RecordBill.API
{
    /// <summary>
    /// 账单类型添加请求模型
    /// </summary>
    public class BillTypesAddRequestModel : RequestModel<T_BillTypes>, IVerificationLoginModel
    {
        /// <summary>
        /// 类型名称
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
    /// 账单类型修改请求模型
    /// </summary>
    public class BillTypesUpdateRequestModel : BillTypesAddRequestModel, IVerificationLoginModel
    {
        /// <summary>
        /// 账单类型ID
        /// </summary>
        public Guid ID { get; set; }
    }
    /// <summary>
    /// 账单类型更改排序请求模型
    /// </summary>
    public class BillTypesChangeStortRequestModel : IVerificationLoginModel
    {
        /// <summary>
        /// 对象1ID
        /// </summary>
        public Guid ID1 { get; set; }
        /// <summary>
        /// 对象2ID
        /// </summary>
        public Guid ID2 { get; set; }
        /// <summary>
        /// 登录用户ID
        /// </summary>
        public Guid LoginUserID { get; set; }
        /// <summary>
        /// 登录用户Token
        /// </summary>
        public string Token { get; set; }
    }
}