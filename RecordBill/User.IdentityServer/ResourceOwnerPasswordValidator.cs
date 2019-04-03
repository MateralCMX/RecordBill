using IdentityServer4.Models;
using IdentityServer4.Validation;
using System;
using System.Threading.Tasks;
using User.DataTransmitModel.User;
using User.Service;

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
                LoginUserDTO userFromDb = await _userService.LoginAsync(context.UserName, context.Password);
                context.Result = new GrantValidationResult(userFromDb.ID.ToString(), "custom");
            }
            catch (InvalidOperationException ex)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, ex.Message);
            }
        }
    }
}
