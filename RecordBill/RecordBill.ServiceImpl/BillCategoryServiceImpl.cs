using AutoMapper;
using Materal.ConvertHelper;
using RecordBill.DataTransmitModel.BillCategory;
using RecordBill.Domain;
using RecordBill.Domain.Repositorys;
using RecordBill.EFRepository;
using RecordBill.Service;
using RecordBill.Service.Model.BillCategory;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RecordBill.ServiceImpl
{
    public class BillCategoryServiceImpl : IBillCategoryService
    {
        private readonly IBillCategoryRepository _billCategoryRepository;
        private readonly IRecordBillUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BillCategoryServiceImpl(IBillCategoryRepository billCategoryRepository, IRecordBillUnitOfWork unitOfWork, IMapper mapper)
        {
            _billCategoryRepository = billCategoryRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task AddBillCategoryAsync(AddBillCategoryModel model)
        {
            if(string.IsNullOrWhiteSpace(model.Name)) throw new InvalidOperationException("类型名称不能为空");
            BillCategory billCategory = await _billCategoryRepository.FirstOrDefaultAsync(m => m.UserID.Equals(model.UserID) && m.Name.Equals(model.Name));
            if (billCategory != null) throw new InvalidOperationException("该类型名称已存在");
            billCategory = model.CopyProperties<BillCategory>();
            _unitOfWork.RegisterAdd(billCategory);
            await _unitOfWork.CommitAsync();
        }

        public async Task EditBillCategoryAsync(EditBillCategoryModel model)
        {
            if (string.IsNullOrWhiteSpace(model.Name)) throw new InvalidOperationException("类型名称不能为空");
            BillCategory billCategory = await _billCategoryRepository.FirstOrDefaultAsync(m => !m.ID.Equals(model.ID) && m.UserID.Equals(model.UserID) && m.Name.Equals(model.Name));
            if (billCategory != null) throw new InvalidOperationException("该类型名称已存在");
            billCategory = await _billCategoryRepository.FirstOrDefaultAsync(model.ID);
            if (billCategory == null) throw new InvalidOperationException("该类型不存在");
            billCategory = model.CopyProperties<BillCategory>();
            _unitOfWork.RegisterEdit(billCategory);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteBillCategoryAsync(Guid id)
        {
            BillCategory billCategory = await _billCategoryRepository.FirstOrDefaultAsync(id);
            if (billCategory == null) throw new InvalidOperationException("该类型不存在");
            _unitOfWork.RegisterDelete(billCategory);
            await _unitOfWork.CommitAsync();
        }

        public async Task<List<BillCategoryDTO>> GetBillCategoriesAsync(Guid userID)
        {
            List<BillCategory> billCategories = await _billCategoryRepository.WhereAsync(m => m.UserID.Equals(userID)).ToList();
            return _mapper.Map<List<BillCategoryDTO>>(billCategories);
        }

        public async Task<BillCategoryDTO> GetBillCategoryInfoAsync(Guid id)
        {
            BillCategory billCategory = await _billCategoryRepository.FirstOrDefaultAsync(id);
            if (billCategory == null) throw new InvalidOperationException("该类型不存在");
            return _mapper.Map<BillCategoryDTO>(billCategory);
        }
    }
}
