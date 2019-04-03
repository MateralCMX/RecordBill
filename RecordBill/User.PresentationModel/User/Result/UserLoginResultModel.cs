﻿namespace User.PresentationModel.User.Result
{
    /// <summary>
    /// 用户登录返回模型
    /// </summary>
    public class UserLoginResultModel
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        public UserLoginResultModel()
        {
        }
        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="model"></param>
        public UserLoginResultModel(TokenResultModel model)
        {
            AccessToken = model.access_token;
            TokenType = model.token_type;
            ExpiresSecond = model.expires_in;
        }
        /// <summary>
        /// Token
        /// </summary>
        public string AccessToken { get; set; }
        /// <summary>
        /// 有效秒数
        /// </summary>
        public int ExpiresSecond { get; set; }
        /// <summary>
        /// Token类型
        /// </summary>
        public string TokenType { get; set; }
    }
    /// <summary>
    /// Token返回模型
    /// </summary>
    public class TokenResultModel
    {
#pragma warning disable IDE1006 // 命名样式
        /// <summary>
        /// Token
        /// </summary>
        public string access_token { get; set; }
        /// <summary>
        /// 有效秒数
        /// </summary>
        public int expires_in { get; set; }
        /// <summary>
        /// Token类型
        /// </summary>
        public string token_type { get; set; }
#pragma warning restore IDE1006 // 命名样式
    }
}
