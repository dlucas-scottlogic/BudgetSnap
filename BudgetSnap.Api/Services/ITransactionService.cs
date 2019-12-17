using System.Collections.Generic;

namespace BudgetSnap.Api.Services
{
    public interface ITransactionService
    {
        TransactionDto GetTransaction(long id);
        IEnumerable<TransactionDto> GetTransactions();
        TransactionDto SaveTransaction(TransactionDto transactionDto);
    }
}