using System.Collections.Generic;

namespace BudgetSnap.Api.Services
{
    public interface ITransactionService
    {
        TransactionDto GetTransaction(long id);
        IEnumerable<TransactionDto> GetTransactions();
        TransactionDto CreateTransaction(TransactionDto transactionDto);
        TransactionDto UpdateTransaction(TransactionDto transactionDto);
        public long DeleteTransaction(long transactionId);
    }
}