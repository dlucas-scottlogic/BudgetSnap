using System.Collections.Generic;
using System.Data.SqlClient;
using BudgetSnap.Api.Models;
using System.Linq;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace BudgetSnap.Api.Repositories
{
    public class TransactionRepository : ITransactionRepository
    {
        private readonly string _connectionString;

        public TransactionRepository(IConfiguration config)
        {
            _connectionString = config.GetConnectionString("TransactionDatabase");
        }

        public long DeleteTransaction(long transactionId)
        {
            var sql = "DELETE FROM dbo.Transactions WHERE TransactionId = @Id";
            using (var conn = new SqlConnection(_connectionString))
            {                
                conn.Execute(sql, new { Id = transactionId });
            }

            return transactionId;
        }

        public TransactionDataObject GetTransaction(long id)
        {
            string sql = "SELECT TransactionId, [Value], TransactionDate, Summary FROM dbo.Transactions WHERE TransactionId = @Id";

            TransactionDataObject transaction;

            using (var conn = new SqlConnection(_connectionString))
            {
                transaction = conn.Query<TransactionDataObject>(sql, new { Id = id }).SingleOrDefault();
            }

            return transaction;
        }

        public IEnumerable<TransactionDataObject> GetTransactions()
        {
            string sql = "SELECT TransactionId, [Value], TransactionDate, Summary FROM dbo.Transactions";

            IEnumerable<TransactionDataObject> transactions;

            using (var conn = new SqlConnection(_connectionString))
            {
                transactions = conn.Query<TransactionDataObject>(sql);
            }

            return transactions;
        }

        public TransactionDataObject SaveTransaction(TransactionDataObject item)
        {
            string sql = "INSERT INTO dbo.Transactions ([Value], TransactionDate, Summary) Values (@Value, @TransactionDate, @Summary); " +
                "SELECT CAST(SCOPE_IDENTITY() as BIGINT)";

            long rowId;
            using (var connection = new SqlConnection(_connectionString))
            {
                rowId = connection.Query<long>(sql,
                    new
                    {
                        item.Value,
                        item.TransactionDate,
                        item.Summary
                    }).Single();
            }

            return GetTransaction(rowId);
        }
    }
}
