using AutoMapper;
using RecordBill.PresentationModel.BillCategory.Request;
using RecordBill.Service.Model.BillCategory;

namespace RecordBill.PresentationModel.AutoMapperProfile
{
    /// <summary>
    /// 账单类型AutoMapper配置
    /// </summary>
    public sealed class BillCategoryProfile : Profile
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        public BillCategoryProfile()
        {
            CreateMap<AddBillCategoryRequestModel, AddBillCategoryModel>();
            CreateMap<EditBillCategoryRequestModel, EditBillCategoryModel>();
        }
    }
}
