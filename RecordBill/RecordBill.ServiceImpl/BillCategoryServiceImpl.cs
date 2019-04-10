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
            billCategory.Index = _billCategoryRepository.GetMaxIndex() + 1;
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
            model.CopyProperties(billCategory);
            billCategory.UpdateTime = DateTime.Now;
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
            List<BillCategory> billCategories = await _billCategoryRepository.WhereAsync(m => m.UserID.Equals(userID)).OrderBy(m=>m.Index).ToList();
            if (billCategories.Count == 0) await AddDefaultBillCategory(billCategories, userID);
            billCategories = billCategories.OrderBy(m => m.Index).ToList();
            return _mapper.Map<List<BillCategoryDTO>>(billCategories);
        }

        public async Task<BillCategoryDTO> GetBillCategoryInfoAsync(Guid id)
        {
            BillCategory billCategory = await _billCategoryRepository.FirstOrDefaultAsync(id);
            if (billCategory == null) throw new InvalidOperationException("该类型不存在");
            return _mapper.Map<BillCategoryDTO>(billCategory);
        }

        public async Task ExchangeBillCategoryIndex(Guid id1, Guid id2)
        {
            List<BillCategory> billCategories = await _billCategoryRepository.WhereAsync(m => m.ID == id1 || m.ID == id2).ToList();
            if (billCategories.Count != 2) throw new InvalidOperationException("账单类型不存在");
            int index = billCategories[0].Index;
            billCategories[0].Index = billCategories[1].Index;
            billCategories[1].Index = index;
            _unitOfWork.RegisterEdit(billCategories[0]);
            _unitOfWork.RegisterEdit(billCategories[1]);
            await _unitOfWork.CommitAsync();
        }

        #region 私有方法
        /// <summary>
        /// 添加默认账单类型
        /// </summary>
        /// <param name="billCategories"></param>
        /// <param name="userID"></param>
        /// <returns></returns>
        private async Task AddDefaultBillCategory(ICollection<BillCategory> billCategories, Guid userID)
        {
            var defaultNames = new[]
            {
                "日常消费",
                "娱乐",
                "其他"
            };
            for (int i = 0; i < defaultNames.Length; i++)
            {
                var billCategory = new BillCategory
                {
                    ID = Guid.NewGuid(),
                    Name = defaultNames[i],
                    UserID = userID,
                    Index = i
                };
                _unitOfWork.RegisterAdd(billCategory);
                billCategories.Add(billCategory);
            }
            await _unitOfWork.CommitAsync();
        }

        #endregion
    }
}
