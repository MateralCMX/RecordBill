using MateralTools.MConvert;
using MateralTools.MResult;
using MateralTools.MVerify;
using RecordBill.BLL;
using RecordBill.Model;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace RecordBill.API.Controllers.API
{
    /// <summary>
    /// 账单控制器
    /// </summary>
    [RoutePrefix("api/Bill")]
    public class BillController : ApiDBBaseController<BillBLL>
    {
        /// <summary>
        /// 添加一个账单
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("Add")]
        public MResultModel<V_Bill> Add(BillAddRequestModel inputM)
        {
            try
            {
                T_Bill resM = inputM.GetTModel();
                resM.FK_User_ID = inputM.LoginUserID;
                resM = _bll.Add(resM);
                return MResultModel<V_Bill>.GetSuccessResultM(resM.MCopyProperties<V_Bill>(), "操作成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel<V_Bill>.GetFailResultM(null, ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 修改一个账单
        /// </summary>
        /// <param name="inputM">输入模型</param>
        /// <returns>返回结果</returns>
        [HttpPost]
        [Route("Update")]
        public MResultModel<V_Bill> Update(BillUpdateRequestModel inputM)
        {
            try
            {
                T_Bill resM = inputM.GetTModel();
                resM.FK_User_ID = inputM.LoginUserID;
                resM = _bll.Update(resM);
                return MResultModel<V_Bill>.GetSuccessResultM(resM.MCopyProperties<V_Bill>(), "操作成功");
            }
            catch (RecordBillException ex)
            {
                return MResultModel<V_Bill>.GetFailResultM(null, ex.Message);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        /// <summary>
        /// 删除一个账单
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
        /// 根据条件获得账单信息
        /// </summary>
        /// <param name="userID">所属人</param>
        /// <param name="minDate">最小日期</param>
        /// <param name="maxDate">最大日期</param>
        /// <param name="pageM">分页模型</param>
        /// <returns>账单信息</returns>
        [HttpGet]
        [Route("GetViewInfoByWhere")]
        public MResultModel<MPagingData<List<BillModel>>> GetViewInfoByWhere(Guid? userID, DateTime? minDate, DateTime? maxDate, int pagingIndex,int pagingSize)
        {
            MPagingModel pageM = new MPagingModel
            {
                PagingIndex = pagingIndex,
                PagingSize = pagingSize
            };
            List<BillModel> DBList = _bll.GetBillViewInfoByWhere(userID, minDate, maxDate, pageM);
            MPagingData<List<BillModel>> resM = new MPagingData<List<BillModel>>
            {
                Data = DBList,
                PageInfo = pageM
            };
            return MResultModel<MPagingData<List<BillModel>>>.GetSuccessResultM(resM, "查询结果");
        }
        /// <summary>
        /// 根据唯一标识获得视图信息
        /// </summary>
        /// <param name="ID">查询账单</param>
        /// <returns>返回结果</returns>
        [HttpGet]
        [Route("GetViewInfoByID")]
        public MResultModel<BillModel> GetViewInfoByID(Guid ID)
        {
            V_Bill resM = _bll.GetDBModelViewInfoByID(ID);
            return MResultModel<BillModel>.GetSuccessResultM(new BillModel(resM), "查询结果");
        }
        /// <summary>
        /// 根据条件获得账单报告信息
        /// </summary>
        /// <param name="userID">所属人</param>
        /// <param name="minDate">最小日期(2017/09/10)</param>
        /// <param name="maxDate">最大日期(2018/04/20)</param>
        /// <returns>账单报告信息</returns>
        [HttpGet]
        [Route("GetBillReportInfoByWhere")]
        public MResultModel<BillReportModel> GetBillReportInfoByWhere(Guid userID, string minDate, string maxDate)
        {
            if (minDate.MIsDate("/") && maxDate.MIsDate("/"))
            {
                string[] mindateS = minDate.Split('/');
                string[] maxdateS = maxDate.Split('/');
                DateTime minDt = new DateTime(int.Parse(mindateS[0]), int.Parse(mindateS[1]), int.Parse(mindateS[2]));
                DateTime maxDt = new DateTime(int.Parse(maxdateS[0]), int.Parse(maxdateS[1]), int.Parse(maxdateS[2]));
                BillReportModel resM = _bll.GetBillReportInfoByWhere(userID, minDt, maxDt);
                return MResultModel<BillReportModel>.GetSuccessResultM(resM, "查询结果");
            }
            else
            {
                return MResultModel<BillReportModel>.GetFailResultM(null, "不识别参数");
            }
        }
    }
}