﻿using MateralTools.MConvert;
using MateralTools.MResult;
using MateralTools.MVerify;
using RecordBill.DAL;
using RecordBill.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RecordBill.BLL
{
    public class BillBLL : BaseBLL<BillDAL, T_Bill, V_Bill>
    {
        /// <summary>
        /// 添加一个账单
        /// </summary>
        /// <param name="model">要添加的对象</param>
        /// <param name="idName">主键名称</param>
        /// <returns></returns>
        public override T_Bill Add(T_Bill model, string idName = "ID")
        {
            model.CreateTime = DateTimeOffset.Now;
            return base.Add(model, idName);
        }
        /// <summary>
        /// 更新数据
        /// </summary>
        /// <param name="model">对象</param>
        /// <param name="idName">主键名称</param>
        /// <returns></returns>
        public override T_Bill Update(T_Bill model, string idName = "ID")
        {
            model.CreateTime = DateTimeOffset.Now;
            return base.Update(model, idName);
        }
        /// <summary>
        /// 根据条件获得账单信息
        /// </summary>
        /// <param name="userID">所属人</param>
        /// <param name="minDate">最小日期</param>
        /// <param name="maxDate">最大日期</param>
        /// <param name="pageM">分页模型</param>
        /// <returns>账单信息</returns>
        public List<BillModel> GetBillViewInfoByWhere(Guid? userID, DateTime? minDate, DateTime? maxDate, MPagingModel pageM)
        {
            List<V_Bill> listM = _dal.GetBillViewInfoByWhere(userID, minDate, maxDate, pageM);
            if (listM != null)
            {
                return BillModel.GetList(listM);
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 根据条件获得账单报告信息
        /// </summary>
        /// <param name="userID">所属人</param>
        /// <param name="minDate">最小日期</param>
        /// <param name="maxDate">最大日期</param>
        /// <returns>账单报告信息</returns>
        public BillReportModel GetBillReportInfoByWhere(Guid userID, DateTime minDate, DateTime maxDate)
        {
            List<V_Bill> listM = _dal.GetBillViewInfoByWhere(userID, minDate, maxDate).ToList();
            if (listM != null)
            {
                BillReportModel resM = new BillReportModel
                {
                    Data = BillModel.GetList(listM)
                };
                return resM;
            }
            else
            {
                return null;
            }
        }
        /// <summary>
        /// 验证模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected override bool Verification(T_Bill model, out string msg)
        {
            List<string> msgs = new List<string>();
            if (model.Contents.MIsNullOrEmpty())
            {
                msgs.Add("账单内容不能为空");
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