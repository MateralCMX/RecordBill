using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using MateralTools.MConvert;

namespace RecordBill.API
{

    /// <summary>
    /// 删除请求模型
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class DeleteRequestModel<T>: IVerificationLoginModel
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public T ID { get; set; }
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
    /// 请求模型
    /// </summary>
    public class RequestModel<TModel, VModel> : RequestModel<TModel>
    {
        /// <summary>
        /// 获得对应视图模型
        /// </summary>
        /// <returns>对应视图模型</returns>
        public VModel GetVModel()
        {
            return GetModel<VModel>();
        }
    }
    /// <summary>
    /// 请求模型
    /// </summary>
    public class RequestModel<TModel> : RequestModel
    {
        /// <summary>
        /// 获得对应表模型
        /// </summary>
        /// <returns>对应表模型</returns>
        public TModel GetTModel()
        {
            return GetModel<TModel>();
        }
    }
    /// <summary>
    /// 请求模型
    /// </summary>
    public class RequestModel
    {
        /// <summary>
        /// 获得对应模型
        /// </summary>
        /// <returns>对应模型</returns>
        public T GetModel<T>()
        {
            return this.MCopyProperties<T>();
        }
    }
}