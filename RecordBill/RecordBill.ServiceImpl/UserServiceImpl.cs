using AutoMapper;
using Common;
using Materal.Common;
using Materal.ConvertHelper;
using Materal.LinqHelper;
using Microsoft.EntityFrameworkCore;
using RecordBill.DataTransmitModel.User;
using RecordBill.Domain;
using RecordBill.Domain.Repositorys;
using RecordBill.EFRepository;
using RecordBill.Service;
using RecordBill.Service.Model.User;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RecordBill.ServiceImpl
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
        private readonly IBillRepository _billRepository;
        private readonly IBillCategoryRepository _billCategoryRepository;
        private readonly IMapper _mapper;
        private readonly IRecordBillUnitOfWork _unitOfWork;

        public UserServiceImpl(IUserRepository userRepository, IMapper mapper, IRecordBillUnitOfWork unitOfWork, IBillRepository billRepository, IBillCategoryRepository billCategoryRepository)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
            _billRepository = billRepository;
            _billCategoryRepository = billCategoryRepository;
        }

        public async Task AddUserAsync(AddUserModel model)
        {
            if (string.IsNullOrEmpty(model.Account)) throw new InvalidOperationException("账号不能为空");
            if (model.Account.Length > 50) throw new InvalidOperationException("账号长度不能大于50");
            if (string.IsNullOrEmpty(model.Name)) throw new InvalidOperationException("名称不能为空");
            if (model.Name.Length > 50) throw new InvalidOperationException("名称长度不能大于50");
            User userFromDB;
            if (!string.IsNullOrEmpty(model.Account))
            {
                userFromDB = await _userRepository.FirstOrDefaultAsync(m => m.Account == model.Account);
                if (userFromDB != null) throw new InvalidOperationException("账户已存在");
            }
            userFromDB = model.CopyProperties<User>();
            userFromDB.Password = GetEncodePassword(DefaultPassword);
            _unitOfWork.RegisterAdd(userFromDB);
            await _unitOfWork.CommitAsync();
        }

        public async Task EditUserAsync(EditUserModel model)
        {
            User userFromDB;
            if (!string.IsNullOrEmpty(model.Account))
            {
                userFromDB = await _userRepository.FirstOrDefaultAsync(m => m.Account == model.Account && m.ID != model.ID);
                if (userFromDB != null) throw new InvalidOperationException("账户已存在");
            }
            userFromDB = await _userRepository.FirstOrDefaultAsync(model.ID);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            model.CopyProperties(userFromDB);
            userFromDB.UpdateTime = DateTime.Now;
            _unitOfWork.RegisterEdit(userFromDB);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteUserAsync(Guid id)
        {
            User userFromDB = await _userRepository.FirstOrDefaultAsync(id);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            _unitOfWork.RegisterDelete(userFromDB);
            await _unitOfWork.CommitAsync();
        }

        public async Task ChangePasswordAsync(ChangePasswordModel model)
        {
            User userFromDB = await _userRepository.FirstOrDefaultAsync(model.ID);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            if (userFromDB.Password != GetEncodePassword(model.OldPassword)) throw new InvalidOperationException("旧密码错误");
            userFromDB.Password = GetEncodePassword(model.NewPassword);
            userFromDB.UpdateTime = DateTime.Now;
            _unitOfWork.RegisterEdit(userFromDB);
            await _unitOfWork.CommitAsync();
        }

        public async Task<UserDTO> GetUserInfoAsync(Guid id)
        {
            User userFromDB = await _userRepository.FirstOrDefaultAsync(id);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            return _mapper.Map<UserDTO>(userFromDB);
        }

        public async Task<string> ResetPasswordAsync(Guid id)
        {
            User userFromDB = await _userRepository.FirstOrDefaultAsync(id);
            if (userFromDB == null) throw new InvalidOperationException("用户不存在");
            userFromDB.Password = GetEncodePassword(DefaultPassword);
            _unitOfWork.RegisterEdit(userFromDB);
            await _unitOfWork.CommitAsync();
            return DefaultPassword;
        }

        public async Task<UserDTO> GetUserInfoAsync(string token)
        {
            Guid userID = GetUserID(token);
            User userFromDB = await _userRepository.FirstOrDefaultAsync(userID);
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
            Expression<Func<User, bool>> expression = m => true;
            if (!string.IsNullOrEmpty(model.Account))
            {
                expression = expression.And(m => m.Account == model.Account);
            }
            if (!string.IsNullOrEmpty(model.Name))
            {
                expression = expression.And(m => EF.Functions.Like(m.Name, $"%{model.Name}%"));
            }
            (List<User> userFormDB, PageModel pageModel) = await _userRepository.PagingAsync(expression, m => m.Name, model);
            var result = _mapper.Map<List<UserListDTO>>(userFormDB);
            return (result, pageModel);
        }

        public async Task<LoginUserDTO> LoginAsync(string account, string password)
        {
            password = GetEncodePassword(password);
            User userFromDB = await _userRepository.FirstOrDefaultAsync(m => m.Account == account && m.Password == password);
            if (userFromDB == null) throw new InvalidOperationException("用户名或者密码错误");
            return _mapper.Map<LoginUserDTO>(userFromDB);
        }
        public async Task<LoginUserDTO> LoginAsync(string openID)
        {
            User userFromDB = await _userRepository.FirstOrDefaultAsync(m => m.WeChatOpenID == openID);
            if (userFromDB == null) throw new InvalidOperationException("未找到用户");
            return _mapper.Map<LoginUserDTO>(userFromDB);
        }

        public string GetEncodePassword(string password)
        {
            return (PasswordSalt + password + PasswordSalt).ToMd5_32Encode();
        }
    }
}
