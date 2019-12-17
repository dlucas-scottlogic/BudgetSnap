using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BudgetSnap.Api.Models
{
    public class TransactionDataObject
    {
        public long TransactionId { get; set; }
        public double Value { get; set; }
        public DateTime TransactionDate { get; set; }
        public string Summary { get; set; }
    }
}
