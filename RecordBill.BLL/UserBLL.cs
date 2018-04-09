using MateralTools.Base.MSystemInfo;
using MateralTools.MEncryption;
using MateralTools.MResult;
using MateralTools.MVerify;
using RecordBill.DAL;
using RecordBill.Model;
using System;
using System.Collections.Generic;

namespace RecordBill.BLL
{
    /// <summary>
    /// 用户业务逻辑类
    /// </summary>
    public class UserBLL : BaseBLL<UserDAL, T_User, V_User>
    {
        /// <summary>
        /// 默认密码
        /// </summary>
        private const string DefultPassword = "123456";
        /// <summary>
        /// 添加一个用户
        /// </summary>
        /// <param name="model">要添加的用户对象</param>
        /// <param name="idName">主键名称</param>
        /// <returns>添加的用户对象</returns>
        public override T_User Add(T_User model, string idName = "ID")
        {
            model.IsDelete = false;
            model.Password = GetEncodePassword(model);
            return base.Add(model);
        }
        /// <summary>
        /// 修改一个用户
        /// </summary>
        /// <param name="model">修改对象</param>
        /// <param name="idName">主键名称(无用)</param>
        /// <returns>修改后的对象</returns>
        public T_User Update(T_User model)
        {
            T_User DBM = _dal.GetDBModelInfoByID(model.ID);
            if (DBM != null)
            {
                DBM.Account = model.Account;
                DBM.Name = model.Name;
                if (VerificationUpdate(DBM,out string msg))
                {
                    _dal.SaveChange();
                    ApplicationLogBLL.WriteOptionsLog("修改对象：成功",
                        $"操作类型：{typeof(T_User)}\r\n" +
                        $"唯一标识：{model.ID}\r\n" +
                        $"操作时间：{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}\r\n"
                        );
                    return DBM;
                }
                else
                {
                    throw new RecordBillException(msg);
                }
            }
            else
            {
                throw new ApplicationException("修改失败，该对象不存在于数据库中");
            }
        }
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="userID">唯一标识</param>
        /// <param name="oldPassword">旧密码</param>
        /// <param name="newPassword">新密码</param>
        /// <exception cref="RecordBillException"></exception>
        public void EditPassword(Guid userID, string oldPassword, string newPassword)
        {
            T_User model = _dal.GetDBModelInfoByID(userID);
            if (model != null)
            {
                if (VerificationPassword(model.Password, oldPassword))
                {
                    model.Password = GetEncodePassword(newPassword);
                    _dal.SaveChange();
                    ApplicationLogBLL.WriteOptionsLog("修改密码：成功",
                        $"操作用户：{model.Name}\r\n" +
                        $"唯一标识：{model.ID}\r\n" +
                        $"操作时间：{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}\r\n"
                        );
                }
                else
                {
                    throw new RecordBillException("密码错误");
                }
            }
            else
            {
                throw new RecordBillException("该用户不存在");
            }
        }
        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="userID">要重置的对象唯一标识</param>
        public string ResetPassword(Guid userID)
        {
            T_User model = _dal.GetDBModelInfoByID(userID);
            model.Password = GetEncodePassword(DefultPassword);
            _dal.SaveChange();
            return DefultPassword;
        }
        /// <summary>
        /// 根据条件获得用户信息
        /// </summary>
        /// <param name="name">姓名</param>
        /// <param name="account">账户</param>
        /// <param name="pageM">分页模型</param>
        /// <returns>用户信息</returns>
        public List<V_User> GetUserViewInfoByWhere(string name, string account, MPagingModel pageM)
        {
            return _dal.GetUserViewInfoByWhere(name, account, pageM);
        }
        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="account">账户</param>
        /// <param name="password">密码</param>
        /// <returns></returns>
        public LoginUserModel Login(string account, string password)
        {
            T_User DBM = _dal.GetUserInfoByAccount(account);
            if (DBM != null && !DBM.IsDelete)
            {
                if (VerificationPassword(DBM.Password, password))
                {
                    T_Token tokenM = new T_Token
                    {
                        FK_User_ID = DBM.ID
                    };
                    tokenM = new TokenBLL().AddLoginToken(tokenM);
                    List<string> IP = SystemInfoManager.GetLocalIPv4();
                    ApplicationLogBLL.WriteOptionsLog("用户登录：成功",
                        $"登录用户：{DBM.Name}\r\n" +
                        $"唯一标识：{DBM.ID}\r\n" +
                        $"登录地址：{(IP.Count > 0 ? IP[0] : "未知")}\r\n" +
                        $"登录时间：{DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")}\r\n"
                        );
                    return new LoginUserModel { UserID = DBM.ID, Token = tokenM.Value };
                }
                else
                {
                    throw new RecordBillException("密码错误");
                }
            }
            else
            {
                throw new RecordBillException("用户不存在");
            }
        }
        /// <summary>
        /// 验证密码
        /// </summary>
        /// <param name="DBPassword">数据库密码</param>
        /// <param name="InputPassword">输入的密码</param>
        /// <returns>验证结果</returns>
        private bool VerificationPassword(string DBPassword, string InputPassword)
        {
            return DBPassword == GetEncodePassword(InputPassword);
        }
        /// <summary>
        /// 验证模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected override bool Verification(T_User model, out string msg)
        {
            List<string> msgs = new List<string>();
            if (model.Name.MIsNullOrEmpty())
            {
                msgs.Add("名称不能为空");
            }
            if (model.Account.MIsNullOrEmpty())
            {
                msgs.Add("账户不能为空");
            }
            if (model.Password.MIsNullOrEmpty())
            {
                msgs.Add("密码不能为空");
            }
            if (msgs.Count == 0)
            {
                msg = "验证通过。";
                return true;
            }
            else
            {
                msg = "验证未通过：" + string.Join(",", msgs) + "。";
                return false;
            }
        }
        /// <summary>
        /// 验证添加模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected override bool VerificationAdd(T_User model, out string msg)
        {
            if (Verification(model, out msg))
            {
                T_User DBM = _dal.GetUserInfoByAccount(model.Account);
                if (DBM != null)
                {
                    msg = "验证未通过：该账户已被占用。";
                    return false;
                }
            }
            return true;
        }
        /// <summary>
        /// 验证修改模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected override bool VerificationUpdate(T_User model, out string msg)
        {
            if (Verification(model, out msg))
            {
                T_User DBM = _dal.GetUserInfoByAccount(model.Account);
                if (DBM != null && DBM.ID != model.ID)
                {
                    msg = "验证未通过：该账户已被占用。";
                    return false;
                }
            }
            return true;
        }
        /// <summary>
        /// 获得加密后的密码
        /// 为空则获得默认的密码
        /// </summary>
        /// <param name="model">用户对象</param>
        /// <returns>加密后的密码</returns>
        private string GetEncodePassword(T_User model)
        {
            return GetEncodePassword(model == null ? DefultPassword : model.Password.MIsNullOrEmpty() ? DefultPassword : model.Password);
        }
        /// <summary>
        /// 获得加密后的密码
        /// </summary>
        /// <param name="password">密码</param>
        /// <returns>加密后的密码</returns>
        private string GetEncodePassword(string password)
        {
            return EncryptionManager.MD5Encode_32(password);
        }
    }
}
