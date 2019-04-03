using System.ComponentModel.DataAnnotations;

namespace User.PresentationModel.User.Request
{
    /// <summary>
    /// 根据Token获取用户信息请求模型
    /// </summary>
    public class GetUserInfoByTokenRequestModel
    {
        /// <summary>
        /// Token
        /// </summary>
        [Required(ErrorMessage = "Token不可以为空")]
        public string Token { get; set; }
    }
}
