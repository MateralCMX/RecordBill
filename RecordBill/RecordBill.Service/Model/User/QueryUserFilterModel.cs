using Materal.Common;

namespace RecordBill.Service.Model.User
{
    public sealed class QueryUserFilterModel : PageRequestModel
    {
        /// <summary>
        /// 账号
        /// </summary>
        public string Account { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
    }
}
