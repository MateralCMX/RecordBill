using Materal.Common;
using RecordBill.DataTransmitModel.Bill;
using RecordBill.Service.Model.Bill;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecordBill.Service
{
    /// <summary>
    /// 账单服务
    /// </summary>
    public interface IBillService
    {
        /// <summary>
        /// 添加账单类型
        /// </summary>
        /// <param name="model"></param>
        Task AddBillAsync(AddBillModel model);
        /// <summary>
        /// 修改账单
        /// </summary>
        /// <param name="model"></param>
        Task EditBillAsync(EditBillModel model);
        /// <summary>
        /// 删除账单
        /// </summary>
        /// <param name="id"></param>
        Task DeleteBillAsync(Guid id);
        /// <summary>
        /// 获得账单列表
        /// </summary>
        /// <param name="model"></param>
        Task<(List<BillDTO> result, PageModel pageModel)> GetBillsAsync(QueryBillFilterModel model);
        /// <summary>
        /// 获得账单信息
        /// </summary>
        /// <param name="id"></param>
        Task<BillDTO> GetBillInfoAsync(Guid id);
        /// <summary>
        /// 获得账单报表
        /// </summary>
        /// <param name="model"></param>
        Task<BillReportDTO> GetBillReportAsync(QueryBillReportFilterModel model);
    }
}
