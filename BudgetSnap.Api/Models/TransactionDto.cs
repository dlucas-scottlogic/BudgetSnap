using System;

namespace BudgetSnap.Api
{
    public class TransactionDto
    {
        public long TransactionId { get; set; }
        public double Value { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Summary { get; set; }        
    }   
}
