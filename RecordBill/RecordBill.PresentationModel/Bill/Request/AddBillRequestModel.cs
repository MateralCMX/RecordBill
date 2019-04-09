using System;

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
        public string Token { get; set; }
        /// <summary>
        /// 内容
        /// </summary>
        public string Contents { get; set; }
        /// <summary>
        /// 数量
        /// </summary>
        public double Amount { get; set; }
        /// <summary>
        /// 记账时间
        /// </summary>
        public DateTime RecordDate { get; set; }
        /// <summary>
        /// 类型
        /// </summary>
        public string Category { get; set; }
    }
}
