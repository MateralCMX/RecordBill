using System.ComponentModel.DataAnnotations;

namespace RecordBill.PresentationModel.User.Request
{
    /// <summary>
    /// 添加用户请求模型
    /// </summary>
    public class AddUserRequestModel
    {
        /// <summary>
        /// 账户
        /// </summary>
        [Required(ErrorMessage = "账号不可以为空"), StringLength(50, ErrorMessage = "账号长度不能超过50")]
        public string Account { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        [Required(ErrorMessage = "名称不可以为空"), StringLength(50, ErrorMessage = "名称长度不能超过50")]
        public string Name { get; set; }
        /// <summary>
        /// 微信OpenID
        /// </summary>
        public string WeChatOpenID { get; set; }
    }
}
