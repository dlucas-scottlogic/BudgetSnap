using System;
using System.Collections.Generic;
using BudgetSnap.Api.Models;

namespace BudgetSnap.Api.Repositories
{
    public interface ITransactionRepository
    {
        TransactionDataObject GetTransaction(long id);
        IEnumerable<TransactionDataObject> GetTransactions();        
        TransactionDataObject CreateTransaction(TransactionDataObject item);
        TransactionDataObject UpdateTransaction(TransactionDataObject item);
        long DeleteTransaction(long transactionId);
    }
}
