using IdentityServer4.Models;
using IdentityServer4.Validation;
using RecordBill.DataTransmitModel.User;
using RecordBill.Service;
using System;
using System.Threading.Tasks;
using System.Linq;
using RecordBill.Service.Model.User;
using RecordBill.Common;

namespace User.IdentityServer
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private readonly IUserService _userService;

        public ResourceOwnerPasswordValidator(IUserService userService)
        {
            _userService = userService;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                LoginCategory loginCategory = context.Request.Raw.AllKeys.Contains("type")
                    ? (LoginCategory) Enum.Parse(typeof(LoginCategory), context.Request.Raw["type"])
                    : LoginCategory.Password;
                LoginUserDTO userFromDb;
                switch (loginCategory)
                {
                    case LoginCategory.OpenID:
                        userFromDb = await _userService.LoginAsync(context.UserName);
                        if (userFromDb == null)
                        {
                            await _userService.AddUserAsync(new AddUserModel
                            {
                                Account = context.UserName,
                                Name = context.Password,
                                WeChatOpenID = context.UserName
                            });
                            userFromDb = await _userService.LoginAsync(context.UserName);
                        }
                        break;
                    default:
                        userFromDb = await _userService.LoginAsync(context.UserName, context.Password);
                        break;
                }
                context.Result = userFromDb == null ? new GrantValidationResult(TokenRequestErrors.InvalidGrant, "用户不存在") : new GrantValidationResult(userFromDb.ID.ToString(), "custom");
            }
            catch (InvalidOperationException ex)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, ex.Message);
            }
        }
    }
}
