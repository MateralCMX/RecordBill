﻿using Materal.Common;
using System.ComponentModel.DataAnnotations;

namespace User.PresentationModel.User.Request
{
    /// <summary>
    /// 查询用户请求模型
    /// </summary>
    public class QueryUserFilterRequestModel : PageRequestModel
    {
        /// <summary>
        /// 账号
        /// </summary>
        [MaxLength(50, ErrorMessage = "账号长度不能超过50")]
        public string Account { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        [MaxLength(50, ErrorMessage = "名称长度不能超过50")]
        public string Name { get; set; }
    }
}
