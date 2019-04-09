using System;

namespace RecordBill.DataTransmitModel.BillCategory
{
    /// <summary>
    /// 账单类型数据传输模型
    /// </summary>
    public class BillCategoryDTO
    {
        /// <summary>
        /// 唯一标识
        /// </summary>
        public Guid ID { get; set; }
        /// <summary>
        /// 名称
        /// </summary>
        public string Name { get; set; }
    }
}
