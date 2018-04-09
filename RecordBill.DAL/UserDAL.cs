using MateralTools.MLinQ;
using MateralTools.MResult;
using MateralTools.MVerify;
using RecordBill.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace RecordBill.DAL
{
    /// <summary>
    /// 用户数据操作类
    /// </summary>
    public sealed class UserDAL : BaseDAL<T_User,V_User>
    {
        /// <summary>
        /// 根据条件获得用户信息
        /// </summary>
        /// <param name="name">姓名</param>
        /// <param name="account">账户</param>
        /// <param name="pageM">分页模型</param>
        /// <returns>用户信息</returns>
        public List<V_User> GetUserViewInfoByWhere(string name, string account, MPagingModel pageM)
        {
            Expression<Func<V_User, bool>> expression = m => true;
            if (!name.MIsNullOrEmpty())
            {
                expression = expression.And(m => m.Name.Contains(name));
            }
            if (!account.MIsNullOrEmpty())
            {
                expression = expression.And(m => m.Account == account);
            }
            IQueryable<V_User> listM = _DB.V_User.Where(expression.Compile()).AsQueryable();
            pageM.DataCount = listM.Count();
            listM = listM.Paging(pageM.PagingIndex, pageM.PagingSize);
            return listM.ToList();
        }
        /// <summary>
        /// 根据账户获得用户信息
        /// </summary>
        /// <param name="account">账户</param>
        /// <returns>用户信息</returns>
        public T_User GetUserInfoByAccount(string account)
        {
            return _DB.T_User.Where(m => m.Account == account).FirstOrDefault();
        }
    }
}
