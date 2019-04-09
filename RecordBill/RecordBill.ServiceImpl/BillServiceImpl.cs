using AutoMapper;
using Materal.Common;
using Materal.ConvertHelper;
using Materal.LinqHelper;
using Microsoft.EntityFrameworkCore;
using RecordBill.DataTransmitModel.Bill;
using RecordBill.Domain;
using RecordBill.Domain.Repositorys;
using RecordBill.EFRepository;
using RecordBill.Service;
using RecordBill.Service.Model.Bill;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace RecordBill.ServiceImpl
{
    public class BillServiceImpl : IBillService
    {
        private readonly IBillRepository _billRepository;
        private readonly IRecordBillUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public BillServiceImpl(IBillRepository billRepository, IRecordBillUnitOfWork unitOfWork, IMapper mapper)
        {
            _billRepository = billRepository;
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        public async Task AddBillAsync(AddBillModel model)
        {
            var bill = model.CopyProperties<Bill>();
            _unitOfWork.RegisterAdd(bill);
            await _unitOfWork.CommitAsync();
        }

        public async Task EditBillAsync(EditBillModel model)
        {
            Bill bill = await _billRepository.FirstOrDefaultAsync(model.ID);
            if (bill == null) throw new InvalidOperationException("该类型不存在");
            bill = model.CopyProperties<Bill>();
            _unitOfWork.RegisterEdit(bill);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteBillAsync(Guid id)
        {
            Bill bill = await _billRepository.FirstOrDefaultAsync(id);
            if (bill == null) throw new InvalidOperationException("该类型不存在");
            _unitOfWork.RegisterDelete(bill);
            await _unitOfWork.CommitAsync();
        }

        public async Task<(List<BillDTO> result, PageModel pageModel)> GetBillsAsync(QueryBillFilterModel model)
        {
            Expression<Func<Bill, bool>> expression = m => m.UserID.Equals(model.UserID);
            if (model.StartDate.HasValue)
            {
                expression = expression.And(m => EF.Functions.DateDiffDay(m.RecordDate, model.StartDate.Value) <= 0);
            }
            if (model.EndDate.HasValue)
            {
                expression = expression.And(m => EF.Functions.DateDiffDay(m.RecordDate, model.EndDate.Value) >= 0);
            }
            (List<Bill> billsFromDb, PageModel pageModel) = await _billRepository.PagingAsync(expression, model);
            var result = _mapper.Map<List<BillDTO>>(billsFromDb);
            return (result, pageModel);
        }

        public async Task<BillDTO> GetBillInfoAsync(Guid id)
        {
            Bill bill = await _billRepository.FirstOrDefaultAsync(id);
            if (bill == null) throw new InvalidOperationException("该类型不存在");
            return _mapper.Map<BillDTO>(bill);
        }

        public async Task<BillReportDTO> GetBillReportAsync(QueryBillReportFilterModel model)
        {
            List<Bill> billsFromDb = await _billRepository.WhereAsync(m =>
                m.UserID.Equals(model.UserID) 
                && EF.Functions.DateDiffDay(m.RecordDate, model.StartDate) <= 0 
                && EF.Functions.DateDiffDay(m.RecordDate, model.EndDate) >= 0).ToList();
            return new BillReportDTO
            {
                Bills = _mapper.Map<List<BillDTO>>(billsFromDb)
            };
        }
    }
}
