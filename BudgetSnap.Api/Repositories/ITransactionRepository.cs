using System;
using System.Collections.Generic;
using BudgetSnap.Api.Models;

namespace BudgetSnap.Api.Repositories
{
    public interface ITransactionRepository
    {
        TransactionDataObject GetTransaction(long id);
        IEnumerable<TransactionDataObject> GetTransactions();        
        TransactionDataObject SaveTransaction(TransactionDataObject item);
        long DeleteTransaction(long transactionId);
    }
}
