namespace RecordBill.PresentationModel.BillCategory.Request
{
    /// <summary>
    /// 添加账单类型请求模型
    /// </summary>
    public class AddBillCategoryRequestModel
    {
        /// <summary>
        /// 用户Token
        /// </summary>
        public string Token { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
    }
}
