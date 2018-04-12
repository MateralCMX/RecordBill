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
    /// 账单数据操作类
    /// </summary>
    public sealed class BillDAL : BaseDAL<T_Bill,V_Bill>
    {
        /// <summary>
        /// 根据条件获得账单信息
        /// </summary>
        /// <param name="userID">所属人</param>
        /// <param name="minDate">最小日期</param>
        /// <param name="maxDate">最大日期</param>
        /// <param name="pageM">分页模型</param>
        /// <returns>账单信息</returns>
        public List<V_Bill> GetBillViewInfoByWhere(Guid? userID, DateTime? minDate, DateTime? maxDate, MPagingModel pageM)
        {
            Expression<Func<V_Bill, bool>> expression = m => true;
            if (userID != null)
            {
                expression = expression.And(m => m.FK_User_ID == userID.Value);
            }
            if (minDate != null)
            {
                expression = expression.And(m => m.RecordTime >= minDate.Value.Date);
            }
            if (maxDate != null)
            {
                expression = expression.And(m => m.RecordTime <= maxDate.Value.Date);
            }
            IQueryable<V_Bill> listM = _DB.V_Bill.Where(expression.Compile()).OrderByDescending(m=>m.RecordTime).ThenBy(m=>m.CreateTime).AsQueryable();
            pageM.DataCount = listM.Count();
            listM = listM.Paging(pageM.PagingIndex, pageM.PagingSize);
            return listM.ToList();
        }
    }
}
