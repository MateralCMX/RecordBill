﻿using Materal.Common;
using System;

namespace RecordBill.PresentationModel.Bill.Request
{
    /// <summary>
    /// 查询账单过滤器请求模型
    /// </summary>
    public class QueryBillFilterRequestModel : PageRequestModel
    {
        /// <summary>
        /// 用户Token
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// 开始时间
        /// </summary>
        public DateTime? StartDate { get; set; }
        /// <summary>
        /// 结束时间
        /// </summary>
        public DateTime? EndDate { get; set; }
    }
}
