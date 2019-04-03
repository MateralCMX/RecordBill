using AutoMapper;
using Common;
using Materal.Common;
using Materal.ConvertHelper;
using Materal.LinqHelper;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using User.DataTransmitModel.User;
using User.Domain.Repositorys;
using User.EFRepository;
using User.Service;
using User.Service.Model.User;

namespace User.ServiceImpl
{
    public class UserServiceImpl : IUserService
    {
        /// <summary>
        /// 默认密码
        /// </summary>
        private const string DefaultPassword = "123456";
        /// <summary>
        /// 加密盐
        /// </summary>
        private const string PasswordSalt = "Materal";
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IUserUnitOfWork _userUnitOfWork;

        public UserServiceImpl(IUserRepository userRepository, IMapper mapper, IUserUnitOfWork userUnitOfWork)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _userUnitOfWork = userUnitOfWork;
        }

        public async Task AddUserAsync(AddUserModel model)
        {
            if (string.IsNullOrEmpty(model.Account)) throw new InvalidOperationException("账号不能为空");
            if (model.Account.Length > 50) throw new InvalidOperationException("账号长度不能大于50");
            if (string.IsNullOrEmpty(model.Name)) throw new InvalidOperationException("名称不能为空");
            if (model.Name.Length > 50) throw new InvalidOperationException("名称长度不能大于50");
            Domain.User userFromDB;
            if (!string.IsNullOrEmpty(model.Account))
            {
                userFromDB = await _userRepository.FirstOrDefaultAsync(m => m.Account == model.Account);
                if (userFromDB != null) throw new InvalidOperationException("账户已存在");
            }
            userFromDB = model.CopyProperties<Domain.User>();
            userFromDB.Password = GetEncodePassword(DefaultPassword);
            _userUnitOfWork.RegisterAdd(userFromDB);
            await _userUnitOfWork.CommitAsync();
        }

        public async Task EditUserAsync(EditUserModel model)
        {
            Domain.User userFromDB;
            if (!string.IsNullOrEmpty(model.Account))
            {
                userFromDB = await _userRepository.FirstOrDefaultAsync(m => m.Account == model.Account && m.ID != model.ID);
                if (userFromDB != null) throw new InvalidOperationException("账户已存在");
            }
            userFromDB = await _userRepository.FirstOrDefaultAsync(model.ID);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            model.CopyProperties(userFromDB);
            userFromDB.UpdateTime = DateTime.Now;
            _userUnitOfWork.RegisterEdit(userFromDB);
            await _userUnitOfWork.CommitAsync();
        }

        public async Task DeleteUserAsync(Guid id)
        {
            Domain.User userFromDB = await _userRepository.FirstOrDefaultAsync(id);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            userFromDB.IsDelete = true;
            userFromDB.UpdateTime = DateTime.Now;
            _userUnitOfWork.RegisterEdit(userFromDB);
            await _userUnitOfWork.CommitAsync();
        }

        public async Task ChangePasswordAsync(ChangePasswordModel model)
        {
            Domain.User userFromDB = await _userRepository.FirstOrDefaultAsync(model.ID);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            if (userFromDB.Password != GetEncodePassword(model.OldPassword)) throw new InvalidOperationException("旧密码错误");
            userFromDB.Password = GetEncodePassword(model.NewPassword);
            userFromDB.UpdateTime = DateTime.Now;
            _userUnitOfWork.RegisterEdit(userFromDB);
            await _userUnitOfWork.CommitAsync();
        }

        public async Task<UserDTO> GetUserInfoAsync(Guid id)
        {
            Domain.User userFromDB = await _userRepository.FirstOrDefaultAsync(id);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            return _mapper.Map<UserDTO>(userFromDB);
        }

        public async Task<string> ResetPassword(Guid id)
        {
            Domain.User userFromDB = await _userRepository.FirstOrDefaultAsync(id);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            userFromDB.Password = GetEncodePassword(DefaultPassword);
            _userUnitOfWork.RegisterEdit(userFromDB);
            await _userUnitOfWork.CommitAsync();
            return DefaultPassword;
        }

        public async Task<UserDTO> GetUserInfoAsync(string token)
        {
            Guid userID = GetUserID(token);
            Domain.User userFromDB = await _userRepository.FirstOrDefaultAsync(userID);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            return _mapper.Map<UserDTO>(userFromDB);
        }

        public Guid GetUserID(string token)
        {
            Guid userID;
            try
            {
                IDictionary<string, object> tokenDic = JWTHelper.DecodeJWT(token, ApplicationConfig.IdentityServer.Secret);
                userID = Guid.Parse(tokenDic["sub"].ToString());
                if (userID == Guid.Empty) throw new InvalidOperationException("未找到用户ID");
            }
            catch (InvalidOperationException)
            {
                throw;
            }
            catch (Exception ex)
            {
                throw new InvalidOperationException("Token错误", ex);
            }
            return userID;
        }

        public async Task<(List<UserListDTO> result, PageModel pageModel)> GetUserListAsync(QueryUserFilterModel model)
        {
            Expression<Func<Domain.User, bool>> expression = m => true;
            if (!string.IsNullOrEmpty(model.Account))
            {
                expression = expression.And(m => m.Account == model.Account);
            }
            if (!string.IsNullOrEmpty(model.Name))
            {
                expression = expression.And(m => EF.Functions.Like(m.Name, $"%{model.Name}%"));
            }
            (List<Domain.User> userFormDB, PageModel pageModel) = await _userRepository.PagingAsync(expression, m => m.Name, model);
            var result = _mapper.Map<List<UserListDTO>>(userFormDB);
            return (result, pageModel);
        }

        public async Task<LoginUserDTO> LoginAsync(string account, string password)
        {
            password = GetEncodePassword(password);
            Domain.User userFromDB = await _userRepository.FirstOrDefaultAsync(m => m.Account == account && m.Password == password);
            if (userFromDB == null) throw new InvalidOperationException("用户名或者密码错误");
            return _mapper.Map<LoginUserDTO>(userFromDB);
        }

        public string GetEncodePassword(string password)
        {
            return (PasswordSalt + password + PasswordSalt).ToMd5_32Encode();
        }
    }
}
