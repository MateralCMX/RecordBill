using System;

namespace RecordBill.Service.Model.BillCategory
{
    /// <summary>
    /// 添加
    /// </summary>
    public class AddBillCategoryModel
    {
        /// <summary>
        /// 用户唯一标识
        /// </summary>
        public Guid UserID { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
    }
}
