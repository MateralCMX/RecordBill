using AutoMapper;
using Common;
using IdentityModel.Client;
using Materal.Common;
using Materal.ConvertHelper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using User.DataTransmitModel.User;
using User.PresentationModel.User.Request;
using User.PresentationModel.User.Result;
using User.Service;
using User.Service.Model.User;

namespace User.WebAPI.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// 用户控制器
    /// </summary>
    [Route("api/[controller]/[action]"), ApiController]
    public class UserController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        /// <summary>
        /// 构造方法
        /// </summary>
        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="requestModel">请求模型</param>
        /// <returns></returns>
        [HttpPost, AllowAnonymous]
        public async Task<ResultModel<UserLoginResultModel>> Login(UserLoginRequestModel requestModel)
        {
            var discoveryDocumentRequest = new DiscoveryDocumentRequest
            {
                Address = ApplicationConfig.IdentityServer.Url,
                Policy = new DiscoveryPolicy
                {
                    RequireHttps = false
                }
            };
            var client = new HttpClient();
            DiscoveryResponse discoveryResponse = await client.GetDiscoveryDocumentAsync(discoveryDocumentRequest);
            if (discoveryResponse.IsError) return ResultModel<UserLoginResultModel>.Fail("连接认证服务器失败");
            TokenResponse tokenResponse = await client.RequestPasswordTokenAsync(new PasswordTokenRequest
            {
                Address = discoveryResponse.TokenEndpoint,
                ClientId = "Web",
                ClientSecret = ApplicationConfig.IdentityServer.Secret,
                UserName = requestModel.Account,
                Password = requestModel.Password,
                Scope = ApplicationConfig.IdentityServer.Scope
            });
            if (tokenResponse.IsError) return ResultModel<UserLoginResultModel>.Fail(tokenResponse.ErrorDescription);
            var result = new UserLoginResultModel(tokenResponse.Raw.JsonToObject<TokenResultModel>());
            return ResultModel<UserLoginResultModel>.Success(result, "登录成功");
        }
        /// <summary>
        /// 根据Token获取用户信息
        /// </summary>
        /// <param name="requestModel">请求模型</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ResultModel<UserDTO>> GetUserInfoByToken(GetUserInfoByTokenRequestModel requestModel)
        {
            try
            {
                UserDTO result = await _userService.GetUserInfoAsync(requestModel.Token);
                return ResultModel<UserDTO>.Success(result, "获取成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel<UserDTO>.Fail(ex.Message);
            }
        }
        /// <summary>
        /// 添加用户
        /// </summary>
        /// <param name="requestModel">请求模型</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ResultModel> AddUser(AddUserRequestModel requestModel)
        {
            try
            {
                var model = _mapper.Map<AddUserModel>(requestModel);
                await _userService.AddUserAsync(model);
                return ResultModel.Success("添加成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }
        /// <summary>
        /// 修改用户
        /// </summary>
        /// <param name="requestModel">请求模型</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ResultModel> EditUser(EditUserRequestModel requestModel)
        {
            try
            {
                var model = _mapper.Map<EditUserModel>(requestModel);
                await _userService.EditUserAsync(model);
                return ResultModel.Success("修改成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }
        /// <summary>
        /// 删除用户
        /// </summary>
        /// <param name="id">唯一标识</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ResultModel> DeleteUser(Guid id)
        {
            try
            {
                await _userService.DeleteUserAsync(id);
                return ResultModel.Success("删除成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }
        /// <summary>
        /// 根据UserId获得用户信息及所属角色信息
        /// </summary>
        /// <param name="id">唯一标识</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ResultModel<UserDTO>> GetUserInfo(Guid id)
        {
            try
            {

                UserDTO result = await _userService.GetUserInfoAsync(id);
                return ResultModel<UserDTO>.Success(result, "查询成功");
            }
            catch (InvalidOperationException ex)
            {

                return ResultModel<UserDTO>.Fail(ex.Message);
            }
        }
        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="id">唯一标识</param>
        /// <returns></returns>
        [HttpGet]
        public async Task<ResultModel<string>> ResetPassword(Guid id)
        {
            try
            {
                string result = await _userService.ResetPassword(id);
                return ResultModel<string>.Success(result, "密码已重置");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel<string>.Fail(ex.Message);
            }
        }
        /// <summary>
        /// 更改密码
        /// </summary>
        /// <param name="requestModel">请求模型</param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ResultModel> ChangePassword(ChangePasswordRequestModel requestModel)
        {
            try
            {
                var model = _mapper.Map<ChangePasswordModel>(requestModel);
                model.ID = _userService.GetUserID(requestModel.Token);
                await _userService.ChangePasswordAsync(model);
                return ResultModel.Success("更改成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }
        /// <summary>
        /// 获得用户列表
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public async Task<PageResultModel<UserListDTO>> GetUserList(QueryUserFilterRequestModel requestModel)
        {
            try
            {
                var model = _mapper.Map<QueryUserFilterModel>(requestModel);
                (List<UserListDTO> result, PageModel pageModel) = await _userService.GetUserListAsync(model);
                return PageResultModel<UserListDTO>.Success(result, pageModel, "查询成功");
            }
            catch (InvalidOperationException ex)
            {
                return PageResultModel<UserListDTO>.Fail(null, null, ex.Message);
            }
        }
    }
}
