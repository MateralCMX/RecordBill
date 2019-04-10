using AutoMapper;
using Materal.Common;
using Microsoft.AspNetCore.Mvc;
using Model;
using RecordBill.DataTransmitModel.BillCategory;
using RecordBill.PresentationModel.BillCategory.Request;
using RecordBill.Service;
using RecordBill.Service.Model.BillCategory;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RecordBill.WebAPI.Controllers
{
    /// <inheritdoc />
    /// <summary>
    /// 账单类型控制器
    /// </summary>
    [Route("api/[controller]/[action]"), ApiController]
    public class BillCategoryController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUserService _userService;
        private readonly IBillCategoryService _billCategoryService;
        /// <summary>
        /// 构造方法
        /// </summary>
        public BillCategoryController(IBillCategoryService billCategoryService, IMapper mapper, IUserService userService)
        {
            _billCategoryService = billCategoryService;
            _mapper = mapper;
            _userService = userService;
        }

        /// <summary>
        /// 添加账单类型
        /// </summary>
        /// <param name="requestModel"></param>
        [HttpPost]
        public async Task<ResultModel> AddBillCategory(AddBillCategoryRequestModel requestModel)
        {
            try
            {
                Guid userID = _userService.GetUserID(requestModel.Token);
                var model = _mapper.Map<AddBillCategoryModel>(requestModel);
                model.UserID = userID;
                await _billCategoryService.AddBillCategoryAsync(model);
                return ResultModel.Success("添加成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }

        /// <summary>
        /// 修改账单类型
        /// </summary>
        /// <param name="requestModel"></param>
        [HttpPost]
        public async Task<ResultModel> EditBillCategory(EditBillCategoryRequestModel requestModel)
        {
            try
            {
                Guid userID = _userService.GetUserID(requestModel.Token);
                var model = _mapper.Map<EditBillCategoryModel>(requestModel);
                model.UserID = userID;
                await _billCategoryService.EditBillCategoryAsync(model);
                return ResultModel.Success("修改成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }

        /// <summary>
        /// 删除账单类型
        /// </summary>
        /// <param name="id"></param>
        [HttpGet]
        public async Task<ResultModel> DeleteBillCategory(Guid id)
        {
            try
            {
                await _billCategoryService.DeleteBillCategoryAsync(id);
                return ResultModel.Success("删除成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }

        /// <summary>
        /// 获得账单类型列表
        /// </summary>
        /// <param name="requestModel"></param>
        [HttpPost]
        public async Task<ResultModel<List<BillCategoryDTO>>> GetBillCategories(QueryBillCategoryFilterRequestModel requestModel)
        {
            try
            {
                Guid userID = _userService.GetUserID(requestModel.Token);
                List<BillCategoryDTO> result = await _billCategoryService.GetBillCategoriesAsync(userID);
                return ResultModel<List<BillCategoryDTO>>.Success(result, "查询成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel<List<BillCategoryDTO>>.Fail(null, ex.Message);
            }
        }

        /// <summary>
        /// 获得账单类型信息
        /// </summary>
        /// <param name="id"></param>
        [HttpGet]
        public async Task<ResultModel<BillCategoryDTO>> GetBillCategoryInfo(Guid id)
        {
            try
            {
                BillCategoryDTO result = await _billCategoryService.GetBillCategoryInfoAsync(id);
                return ResultModel<BillCategoryDTO>.Success(result, "查询成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel<BillCategoryDTO>.Fail(null, ex.Message);
            }
        }
        /// <summary>
        /// 调换账单类型位序
        /// </summary>
        /// <param name="requestModel"></param>
        /// <returns></returns>
        [HttpPost]
        public async Task<ResultModel> ExchangeBillCategoryIndex(ExchangeIndexRequestModel<Guid> requestModel)
        {
            try
            {
                await _billCategoryService.ExchangeBillCategoryIndex(requestModel.ID1, requestModel.ID2);
                return ResultModel.Success("调换成功");
            }
            catch (InvalidOperationException ex)
            {
                return ResultModel.Fail(ex.Message);
            }
        }
    }
}
