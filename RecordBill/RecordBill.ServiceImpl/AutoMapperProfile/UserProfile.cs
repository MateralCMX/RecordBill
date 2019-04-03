using AutoMapper;
using RecordBill.DataTransmitModel.User;
using RecordBill.Domain;

namespace RecordBill.ServiceImpl.AutoMapperProfile
{
    public sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserListDTO>();
            CreateMap<User, UserDTO>();
            CreateMap<User, LoginUserDTO>();
        }
    }
}
