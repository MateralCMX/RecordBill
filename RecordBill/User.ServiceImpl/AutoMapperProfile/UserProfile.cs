using AutoMapper;
using User.DataTransmitModel.User;

namespace User.ServiceImpl.AutoMapperProfile
{
    public sealed class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<Domain.User, UserListDTO>();
            CreateMap<Domain.User, UserDTO>();
            CreateMap<Domain.User, LoginUserDTO>();
        }
    }
}
