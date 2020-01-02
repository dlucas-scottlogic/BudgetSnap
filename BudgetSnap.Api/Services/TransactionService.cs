using System;
using System.Collections.Generic;
using System.Linq;
using BudgetSnap.Api.Models;
using BudgetSnap.Api.Repositories;

namespace BudgetSnap.Api.Services
{
    public class TransactionService : ITransactionService
    {
        private readonly ITransactionRepository _transactionRepository;

        public TransactionService(ITransactionRepository transactionRepository)
        {
            _transactionRepository = transactionRepository;
        }

        public TransactionDto GetTransaction(long id)
        {
            var transaction = _transactionRepository.GetTransaction(id);

            return MapFromDataObjectToDto(transaction);
        }

        public IEnumerable<TransactionDto> GetTransactions()
        {
            var transactions = _transactionRepository.GetTransactions();

            var toReturn = transactions.Select(MapFromDataObjectToDto);

            return toReturn;
        }

        public TransactionDto SaveTransaction(TransactionDto transactionDto)
        {
            var objectToSave = MapFromDtoToDataObject(transactionDto);

            return MapFromDataObjectToDto(_transactionRepository.SaveTransaction(objectToSave));
        }

        public long DeleteTransaction (long transactionId)
        {
            return _transactionRepository.DeleteTransaction(transactionId);
        }

        private TransactionDto MapFromDataObjectToDto(TransactionDataObject item)
        {
            return new TransactionDto
            {
                Summary = item.Summary,
                TransactionDate = item.TransactionDate,
                TransactionId = item.TransactionId,
                Value = item.Value
            };
        }

        private TransactionDataObject MapFromDtoToDataObject(TransactionDto item)
        {
            return new TransactionDataObject
            {
                Summary = item.Summary,
                TransactionDate = item.TransactionDate,
                TransactionId = item.TransactionId,
                Value = item.Value
            };
        }
    }
}
