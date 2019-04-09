using AutoMapper;
using Materal.Common;
using Microsoft.AspNetCore.Mvc;
using RecordBill.DataTransmitModel.Bill;
using RecordBill.PresentationModel.Bill.Request;
using RecordBill.Service;
using RecordBill.Service.Model.Bill;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecordBill.WebAPI.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// 账单控制器
    /// </summary>
    [Route("api/[controller]/[action]"), ApiController]
    public class BillController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IBillService _billService;
        /// <summary>
        /// 构造方法
        /// </summary>
        public BillController(IBillService billService, IMapper mapper, IUserService userService)
        {
            _billService = billService;
            _mapper = mapper;
            _userService = userService;
        }

        /// <summary>
        /// 添加账单
        /// </summary>
        /// <param name="requestModel"></param>
        [HttpPost]
        public async Task<ResultModel> AddBill(AddBillRequestModel requestModel)
        {
            try
            {
                Guid userID = _userService.GetUserID(requestModel.Token);
                var model = _mapper.Map<AddBillModel>(requestModel);
                model.UserID = userID;
                await _billService.AddBillAsync(model);
                return ResultModel.Success("添加成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }

        /// <summary>
        /// 修改账单
        /// </summary>
        /// <param name="requestModel"></param>
        [HttpPost]
        public async Task<ResultModel> EditBill(EditBillRequestModel requestModel)
        {
            try
            {
                Guid userID = _userService.GetUserID(requestModel.Token);
                var model = _mapper.Map<EditBillModel>(requestModel);
                model.UserID = userID;
                await _billService.EditBillAsync(model);
                return ResultModel.Success("修改成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }

        /// <summary>
        /// 删除账单
        /// </summary>
        /// <param name="id"></param>
        [HttpGet]
        public async Task<ResultModel> DeleteBill(Guid id)
        {
            try
            {
                await _billService.DeleteBillAsync(id);
                return ResultModel.Success("删除成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }

        /// <summary>
        /// 获得账单列表
        /// </summary>
        /// <param name="requestModel"></param>
        [HttpPost]
        public async Task<PageResultModel<BillDTO>> GetBillCategories(QueryBillFilterRequestModel requestModel)
        {
            try
            {
                Guid userID = _userService.GetUserID(requestModel.Token);
                var model = _mapper.Map<QueryBillFilterModel>(requestModel);
                model.UserID = userID;
                (List<BillDTO> result, PageModel pageModel) = await _billService.GetBillsAsync(model);
                return PageResultModel<BillDTO>.Success(result, pageModel, "查询成功");
            }
            catch (InvalidOperationException ex)
            {
                return PageResultModel<BillDTO>.Fail(null, null, ex.Message);
            }
        }

        /// <summary>
        /// 获得账单信息
        /// </summary>
        /// <param name="id"></param>
        [HttpGet]
        public async Task<ResultModel<BillDTO>> GetBillInfo(Guid id)
        {
            try
            {
                BillDTO result = await _billService.GetBillInfoAsync(id);
                return ResultModel<BillDTO>.Success(result, "修改成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel<BillDTO>.Fail(null, ex.Message);
            }
        }

        /// <summary>
        /// 获得账单报表
        /// </summary>
        /// <param name="requestModel"></param>
        [HttpPost]
        public async Task<ResultModel<BillReportDTO>> GetBillReport(QueryBillReportFilterRequestModel requestModel)
        {
            try
            {
                Guid userID = _userService.GetUserID(requestModel.Token);
                var model = _mapper.Map<QueryBillReportFilterModel>(requestModel);
                model.UserID = userID;
                BillReportDTO result = await _billService.GetBillReportAsync(model);
                return ResultModel<BillReportDTO>.Success(result, "查询成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel<BillReportDTO>.Fail(null, ex.Message);
            }
        }
    }
}
