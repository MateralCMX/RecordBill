namespace RecordBill.Service.Model.User
{
    public class AddUserModel
    {
        /// <summary>
        /// 账户
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
        /// <summary>
        /// 微信OpenID
        /// </summary>
        public string WeChatOpenID { get; set; }
    }
}
