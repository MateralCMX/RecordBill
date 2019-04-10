using System;
using System.ComponentModel.DataAnnotations;

namespace RecordBill.PresentationModel.Bill.Request
{
    /// <summary>
    /// 添加账单请求模型
    /// </summary>
    public class AddBillRequestModel
    {
        /// <summary>
        /// 用户Token
        /// </summary>
        [Required(ErrorMessage = "用户Token不可以为空")]
        public string Token { get; set; }
        /// <summary>
        /// 内容
        /// </summary>
        [Required(ErrorMessage = "内容不可以为空")]
        public string Contents { get; set; }
        /// <summary>
        /// 金额
        /// </summary>
        [Required(ErrorMessage = "金额不可以为空"), Range(0, double.MaxValue, ErrorMessage = "数量不能小于0")]
        public double Amount { get; set; }
        /// <summary>
        /// 记账时间
        /// </summary>
        [Required(ErrorMessage = "记账时间不可以为空")]
        public DateTime RecordDate { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        [Required(ErrorMessage = "类型不可以为空"), StringLength(20, ErrorMessage = "账号长度不能超过50")]
        public string Category { get; set; }
    }
}
