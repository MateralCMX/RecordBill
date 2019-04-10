using RecordBill.DataTransmitModel.BillCategory;
using RecordBill.Service.Model.BillCategory;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecordBill.Service
{
    /// <summary>
    /// 账单类型服务
    /// </summary>
    public interface IBillCategoryService
    {
        /// <summary>
        /// 添加账单类型
        /// </summary>
        /// <param name="model"></param>
        Task AddBillCategoryAsync(AddBillCategoryModel model);
        /// <summary>
        /// 修改账单类型
        /// </summary>
        /// <param name="model"></param>
        Task EditBillCategoryAsync(EditBillCategoryModel model);
        /// <summary>
        /// 删除账单类型
        /// </summary>
        /// <param name="id"></param>
        Task DeleteBillCategoryAsync(Guid id);
        /// <summary>
        /// 获得账单类型列表
        /// </summary>
        /// <param name="userID"></param>
        Task<List<BillCategoryDTO>> GetBillCategoriesAsync(Guid userID);
        /// <summary>
        /// 获得账单类型信息
        /// </summary>
        /// <param name="id"></param>
        Task<BillCategoryDTO> GetBillCategoryInfoAsync(Guid id);
        /// <summary>
        /// 更换账单类型位序
        /// </summary>
        /// <param name="id1"></param>
        /// <param name="id2"></param>
        /// <returns></returns>
        Task ExchangeBillCategoryIndex(Guid id1, Guid id2);
    }
}
