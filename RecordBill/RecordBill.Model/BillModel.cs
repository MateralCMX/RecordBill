using MateralTools.MConvert;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecordBill.Model
{
    /// <summary>
    /// 账单报告模型
    /// </summary>
    public class BillReportModel
    {
        /// <summary>
        /// 数据
        /// </summary>
        public List<BillModel> Data { get; set; }
        /// <summary>
        /// 最大
        /// </summary>
        public BillModel MaxBill
        {
            get
            {
                return Data.OrderByDescending(m => m.Amount).FirstOrDefault();
            }
        }
        /// <summary>
        /// 最小
        /// </summary>
        public BillModel MinBill
        {
            get
            {
                return Data.OrderBy(m => m.Amount).FirstOrDefault();
            }
        }
        /// <summary>
        /// 总计
        /// </summary>
        public decimal Count
        {
            get
            {
                return Data.Sum(m => m.Amount);
            }
        }
    }
    /// <summary>
    /// 账单模型
    /// </summary>
    public class BillModel:V_Bill
    {
        /// <summary>
        /// 记录时间
        /// </summary>
        public string RecordTimeStr
        {
            get
            {
                return RecordTime.ToString("yyyy/MM/dd");
            }
        }
        /// <summary>
        /// 构造方法
        /// </summary>
        /// <param name="mode"></param>
        public BillModel(V_Bill mode)
        {
            if (mode != null)
            {
                mode.MCopyProperties(this);
            }
        }
        /// <summary>
        /// 获得列表
        /// </summary>
        /// <param name="listM">列表</param>
        /// <returns></returns>
        public static List<BillModel>  GetList(List<V_Bill> listM)
        {
            List<BillModel> resM = new List<BillModel>();
            foreach (V_Bill item in listM)
            {
                resM.Add(new BillModel(item));
            }
            return resM;
        }
    }
}
