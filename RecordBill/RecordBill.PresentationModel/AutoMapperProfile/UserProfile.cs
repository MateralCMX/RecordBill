using AutoMapper;
using RecordBill.PresentationModel.User.Request;
using RecordBill.Service.Model.User;

namespace RecordBill.PresentationModel.AutoMapperProfile
{
    /// <summary>
    /// 用户AutoMapper配置
    /// </summary>
    public sealed class UserProfile : Profile
    {
        /// <summary>
        /// 构造方法
        /// </summary>
        public UserProfile()
        {
            CreateMap<AddUserRequestModel, AddUserModel>();
            CreateMap<EditUserRequestModel, EditUserModel>();
            CreateMap<QueryUserFilterRequestModel, QueryUserFilterModel>();
            CreateMap<ChangePasswordRequestModel, ChangePasswordModel>();
        }
    }
}
