using AutoMapper;
using RecordBill.DataTransmitModel.BillCategory;
using RecordBill.Domain;

namespace RecordBill.ServiceImpl.AutoMapperProfile
{
    public sealed class BillCategoryProfile : Profile
    {
        public BillCategoryProfile()
        {
            CreateMap<BillCategory, BillCategoryDTO>();
        }
    }
}
