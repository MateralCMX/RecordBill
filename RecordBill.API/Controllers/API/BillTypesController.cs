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
    /// 账单类型控制器
    /// </summary>
    [RoutePrefix("api/BillTypes")]
    public class BillTypesController : ApiDBBaseController<BillTypesBLL>
    {
        /// <summary>
        /// 添加一个账单类型
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("Add")]
        public MResultModel<V_BillTypes> Add(BillTypesAddRequestModel inputM)
        {
            try
            {
                T_BillTypes resM = inputM.GetTModel();
                resM = _bll.Add(resM);
                return MResultModel<V_BillTypes>.GetSuccessResultM(resM.MCopyProperties<V_BillTypes>(), "操作成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel<V_BillTypes>.GetFailResultM(null, ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改一个账单类型
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("Update")]
        public MResultModel<V_BillTypes> Update(BillTypesUpdateRequestModel inputM)
        {
            try
            {
                T_BillTypes resM = inputM.GetTModel();
                resM = _bll.Update(resM);
                return MResultModel<V_BillTypes>.GetSuccessResultM(resM.MCopyProperties<V_BillTypes>(), "操作成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel<V_BillTypes>.GetFailResultM(null, ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除一个账单类型
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
        /// 更改位序
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("ChangeStort")]
        public MResultModel ChangeStort(BillTypesChangeStortRequestModel inputM)
        {
            try
            {
                _bll.ChangeStort(inputM.ID1,inputM.ID2);
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
        /// 获得所有账单类型信息
        /// </summary>
        /// <returns>账单类型信息</returns>
        [HttpGet]
        [Route("GetAllTypes")]
        public MResultModel<List<V_BillTypes>> GetAllTypes()
        {
            List<V_BillTypes> resM = _bll.GetAllTypes();
            return MResultModel<List<V_BillTypes>>.GetSuccessResultM(resM, "查询结果");
        }
        /// <summary>
        /// 根据唯一标识获得视图信息
        /// </summary>
        /// <param name="userID">查询账单类型</param>
        /// <returns>返回结果</returns>
        [HttpGet]
        [Route("GetViewInfoByID")]
        public MResultModel<V_BillTypes> GetViewInfoByID(Guid userID)
        {
            V_BillTypes resM = _bll.GetDBModelViewInfoByID(userID);
            return MResultModel<V_BillTypes>.GetSuccessResultM(resM, "查询结果");
        }
    }
}