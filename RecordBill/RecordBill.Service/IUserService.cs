using Materal.Common;
using RecordBill.DataTransmitModel.User;
using RecordBill.Service.Model.User;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecordBill.Service
{
    /// <summary>
    /// 用户服务
    /// </summary>
    public interface IUserService
    {
        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="model">添加模型</param>
        /// <returns></returns>
        Task AddUserAsync(AddUserModel model);
        /// <summary>
        /// 修改用户
        /// </summary>
        /// <param name="model">修改模型</param>
        /// <returns></returns>
        Task EditUserAsync(EditUserModel model);
        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="id">唯一标识</param>
        /// <returns></returns>
        Task DeleteUserAsync(Guid id);
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="model">更改密码模型</param>
        /// <returns></returns>
        Task ChangePasswordAsync(ChangePasswordModel model);
        /// <summary>
        /// 根据UserId获得用户信息
        /// </summary>
        /// <param name="id">唯一标识</param>
        /// <returns></returns>
        Task<UserDTO> GetUserInfoAsync(Guid id);
        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Task<string> ResetPassword(Guid id);
        /// <summary>
        /// 获得用户信息
        /// </summary>
        /// <param name="token">Token</param>
        /// <returns></returns>
        Task<UserDTO> GetUserInfoAsync(string token);
        /// <summary>
        /// 获得用户唯一标识
        /// </summary>
        /// <param name="token">Token</param>
        /// <returns></returns>
        Guid GetUserID(string token);
        /// <summary>
        /// 获得用户列表
        /// </summary>
        /// <param name="model">查询条件模型</param>
        /// <returns></returns>
        Task<(List<UserListDTO> result, PageModel pageModel)> GetUserListAsync(QueryUserFilterModel model);
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="account"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        Task<LoginUserDTO> LoginAsync(string account, string password);
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="openID"></param>
        /// <returns></returns>
        Task<LoginUserDTO> LoginAsync(string openID);
        /// <summary>
        /// 获得加密后的密码
        /// </summary>
        /// <param name="password"></param>
        /// <returns></returns>
        string GetEncodePassword(string password);
    }
}
