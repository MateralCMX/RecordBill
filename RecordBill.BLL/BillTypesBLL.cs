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
    /// <summary>
    /// 账单类型业务类
    /// </summary>
    public class BillTypesBLL : BaseBLL<BillTypesDAL, T_BillTypes, V_BillTypes>
    {
        /// <summary>
        /// 添加账单类型
        /// </summary>
        /// <param name="model">类型对象</param>
        /// <param name="idName">主键名称</param>
        /// <returns>添加的对象</returns>
        public override T_BillTypes Add(T_BillTypes model, string idName = "ID")
        {
            model.Stort = _dal.GetMaxStort() + 1;
            return base.Add(model, idName);
        }
        /// <summary>
        /// 调换位序
        /// </summary>
        /// <param name="id1">对象1ID</param>
        /// <param name="id2">对象2ID</param>
        public void ChangeStort(Guid id1,Guid id2)
        {
            T_BillTypes model1 = _dal.GetDBModelInfoByID(id1);
            if (model1 != null)
            {
                T_BillTypes model2 = _dal.GetDBModelInfoByID(id2);
                if (model2 != null)
                {
                    int temp = model1.Stort;
                    model1.Stort = model2.Stort;
                    model2.Stort = temp;
                    _dal.SaveChange();
                }
                else
                {
                    throw new RecordBillException("该实体不在数据库中");
                }
            }
            else
            {
                throw new RecordBillException("该实体不在数据库中");
            }
        }
        /// <summary>
        /// 获得所有类型
        /// </summary>
        /// <returns></returns>
        public List<V_BillTypes> GetAllTypes()
        {
            return _dal.GetAllTypes();
        }
        /// <summary>
        /// 验证模型
        /// </summary>
        /// <param name="model">要验证的模型</param>
        /// <param name="msg">提示信息</param>
        /// <returns>验证结果</returns>
        protected override bool Verification(T_BillTypes model, out string msg)
        {
            List<string> msgs = new List<string>();
            if (model.Name.MIsNullOrEmpty())
            {
                msgs.Add("类型名称不能为空");
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
