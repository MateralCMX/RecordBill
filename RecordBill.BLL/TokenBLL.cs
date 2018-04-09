using MateralTools.Base;
using MateralTools.MVerify;
using RecordBill.DAL;
using RecordBill.Model;
using System;
using System.Collections.Generic;

namespace RecordBill.BLL
{
    /// <summary>
    /// Token业务逻辑类
    /// </summary>
    public class TokenBLL : BaseBLL<TokenDAL, T_Token>
    {
        /// <summary>
        /// Token有效时间(小时)
        /// </summary>
        public const int EFFECTIVE_TIME = 10;
        /// <summary>
        /// 添加一个对象
        /// </summary>
        /// <param name="model">token对象</param>
        /// <param name="idName">主键名称</param>
        public override T_Token Add(T_Token model, string idName = "ID")
        {
            SetNewToken(model);
            return base.Add(model);
        }
        /// <summary>
        /// 添加登录Token
        /// </summary>
        /// <param name="model">Token对象</param>
        public T_Token AddLoginToken(T_Token model)
        {
            model.Types = (byte)TokenTypesEnum.Login;
            T_Token DBM = _dal.GetTokenInfoByUserIDAndTokenTypes(model.FK_User_ID, TokenTypesEnum.Login);
            if (DBM != null)
            {
                SetNewToken(DBM);
                _dal.SaveChange();
                model = DBM;
            }
            else
            {
                model = Add(model);
            }
            return model;
        }
        /// <summary>
        /// 设置新的Token
        /// </summary>
        /// <param name="model">Token对象</param>
        private void SetNewToken(T_Token model)
        {
            if (model != null)
            {
                model.CreateTime = DateTime.Now;
                model.Value = CommonManager.GetRandomStrByGUID();
                model.ExpiryTime = model.CreateTime.AddHours(EFFECTIVE_TIME);
            }
            else
            {
                throw new ArgumentNullException("对象不能为空");
            }
        }
        /// <summary>
        /// 验证Token是否有效
        /// </summary>
        /// <param name="userID">用户ID</param>
        /// <param name="token">Token值</param>
        /// <param name="types">Token类型</param>
        /// <returns></returns>
        public bool VerificationToken(Guid userID, string token, TokenTypesEnum types)
        {
            V_Token DBM = _dal.GetTokenViewInfoByUserIDAndTokenTypes(userID, types);
            if (DBM != null && DBM.Value == token)
            {
                return true;
            }
            return false;
        }
        /// <summary>
        /// 验证模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected override bool Verification(T_Token model, out string msg)
        {
            List<string> msgs = new List<string>();
            if (model.FK_User_ID == Guid.Empty)
            {
                msgs.Add("必须属于一个用户");
            }
            if (model.Value.MIsNullOrEmpty())
            {
                msgs.Add("Token值不能为空");
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
    }
}
