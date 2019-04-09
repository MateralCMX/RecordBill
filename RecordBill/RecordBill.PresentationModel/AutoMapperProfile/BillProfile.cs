using AutoMapper;
using RecordBill.PresentationModel.Bill.Request;
using RecordBill.Service.Model.Bill;

namespace RecordBill.PresentationModel.AutoMapperProfile
{
    /// <summary>
    /// 账单AutoMapper配置
    /// </summary>
    public sealed class BillProfile : Profile
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        public BillProfile()
        {
            CreateMap<AddBillRequestModel, AddBillModel>();
            CreateMap<EditBillRequestModel, EditBillModel>();
            CreateMap<QueryBillFilterRequestModel, QueryBillFilterModel>();
            CreateMap<QueryBillReportFilterRequestModel, QueryBillReportFilterModel>();
        }
    }
}
