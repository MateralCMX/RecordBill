using AutoMapper;
using RecordBill.DataTransmitModel.Bill;
using RecordBill.Domain;

namespace RecordBill.ServiceImpl.AutoMapperProfile
{
    public sealed class BillProfile : Profile
    {
        public BillProfile()
        {
            CreateMap<Bill, BillDTO>();
        }
    }
}
