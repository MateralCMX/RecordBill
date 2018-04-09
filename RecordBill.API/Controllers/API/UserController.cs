using MateralTools.MConvert;
using MateralTools.MResult;
using RecordBill.BLL;
using RecordBill.Model;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace RecordBill.API.Controllers.API
{
    /// <summary>
    /// 用户控制器
    /// </summary>
    [RoutePrefix("api/User")]
    public class UserController : ApiDBBaseController<UserBLL>
    {
        /// <summary>
        /// 添加一个用户
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("Add")]
        public MResultModel<V_User> Add(UserAddRequestModel inputM)
        {
            try
            {
                T_User resM = _bll.Add(inputM.GetTModel());
                return MResultModel<V_User>.GetSuccessResultM(resM.MCopyProperties<V_User>(), "操作成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel<V_User>.GetFailResultM(null, ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改一个用户
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("Update")]
        public MResultModel<V_User> Update(UserUpdateRequestModel inputM)
        {
            try
            {
                T_User resM = _bll.Update(inputM.GetTModel());
                return MResultModel<V_User>.GetSuccessResultM(resM.MCopyProperties<V_User>(), "操作成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel<V_User>.GetFailResultM(null, ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改密码
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("EditPassword")]
        public MResultModel EditPassword(UserEditPasswordRequestModel inputM)
        {
            try
            {
                _bll.EditPassword(inputM.UserID, inputM.OldPassword, inputM.NewPassword);
                return MResultModel.GetSuccessResultM("修改成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel.GetFailResultM(ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改自己的密码
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("EditMyPassword")]
        public MResultModel EditMyPassword(UserEditMyPasswordRequestModel inputM)
        {
            try
            {
                _bll.EditPassword(inputM.LoginUserID, inputM.OldPassword, inputM.NewPassword);
                return MResultModel.GetSuccessResultM("修改成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel.GetFailResultM(ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 重置密码
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("ResetPassword")]
        public MResultModel<string> ResetPassword(DeleteRequestModel<Guid> inputM)
        {
            try
            {
                string resM = _bll.ResetPassword(inputM.ID);
                return MResultModel<string>.GetSuccessResultM(resM, "密码重置成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel<string>.GetFailResultM(null, ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除一个用户
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("Delete")]
        public MResultModel Delete(DeleteRequestModel<Guid> inputM)
        {
            try
            {
                _bll.Delete(inputM.ID);
                return MResultModel.GetSuccessResultM("操作成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel.GetFailResultM(ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 登录(无登录验证)
        /// </summary>
        /// <param name="inputM">登录模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("Login")]
        [NotVerificationLogin]
        public MResultModel<LoginUserModel> Login(UserLoginRequestModel inputM)
        {
            try
            {
                LoginUserModel resM = _bll.Login(inputM.Account, inputM.Password);
                return MResultModel<LoginUserModel>.GetSuccessResultM(resM, "登录结果");
            }
            catch (RecordBillException ex)
            {
#if DEBUG
                return MResultModel<LoginUserModel>.GetFailResultM(null, ex.Message);
#else
                return MResultModel<LoginUserModel>.GetFailResultM(null, "用户名或者密码错误");
#endif
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 根据条件获得视图信息
        /// </summary>
        /// <param name="name">姓名</param>
        /// <param name="account">账户</param>
        /// <param name="pagingIndex">起始页</param>
        /// <param name="pagingSize">显示数量</param>
        /// <returns>返回结果</returns>
        [HttpGet]
        [Route("GetViewInfoByWhere")]
        public MResultModel<MPagingData<List<V_User>>> GetViewInfoByWhere(string name, string account,int pagingIndex,int pagingSize)
        {
            MPagingModel pageM = new MPagingModel
            {
                PagingIndex = pagingIndex,
                PagingSize = pagingSize
            };
            List<V_User> DBList = _bll.GetUserViewInfoByWhere(name,account, pageM);
            MPagingData<List<V_User>> resM = new MPagingData<List<V_User>>
            {
                Data = DBList,
                PageInfo = pageM
            };
            return MResultModel<MPagingData<List<V_User>>>.GetSuccessResultM(resM, "查询结果");
        }
        /// <summary>
        /// 根据唯一标识获得视图信息
        /// </summary>
        /// <param name="userID">查询用户</param>
        /// <returns>返回结果</returns>
        [HttpGet]
        [Route("GetViewInfoByID")]
        public MResultModel<V_User> GetViewInfoByID(Guid userID)
        {
            V_User resM = _bll.GetDBModelViewInfoByID(userID);
            return MResultModel<V_User>.GetSuccessResultM(resM, "查询结果");
        }
    }
}