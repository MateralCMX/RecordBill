using RecordBill.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecordBill.DAL
{
    /// <summary>
    /// 账单类型
    /// </summary>
    public class BillTypesDAL : BaseDAL<T_BillTypes, V_BillTypes>
    {
        /// <summary>
        /// 获得所有类型
        /// </summary>
        /// <returns></returns>
        public List<V_BillTypes> GetAllTypes()
        {
            return _DB.V_BillTypes.OrderBy(m => m.Stort).ToList();
        }
        /// <summary>
        /// 获得最大的排序值
        /// </summary>
        /// <returns>数据库中最大的排序值</returns>
        public int GetMaxStort()
        {
            return _DB.T_BillTypes.Max(m => m.Stort);
        }
    }
}
