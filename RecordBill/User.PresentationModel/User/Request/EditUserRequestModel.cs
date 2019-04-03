using System;
using System.ComponentModel.DataAnnotations;

namespace User.PresentationModel.User.Request
{
    /// <summary>
    /// 修改用户请求模型
    /// </summary>
    public class EditUserRequestModel : AddUserRequestModel
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        [Required(ErrorMessage = "唯一标识不可以为空")]
        public Guid ID { get; set; }
    }
}
