using System.ComponentModel.DataAnnotations;

namespace RecordBill.PresentationModel.User.Request
{
    /// <summary>
    /// 微信小程序登录请求模型
    /// </summary>
    public class WeChatAppletLoginRequestModel
    {
        /// <summary>
        /// 代码
        /// </summary>
        [Required(ErrorMessage = "代码不可以为空")]
        public string Code { get; set; }
        /// <summary>
        /// 昵称
        /// </summary>
        [Required(ErrorMessage = "昵称不可以为空")]
        public string NickName { get; set; }
    }
}
