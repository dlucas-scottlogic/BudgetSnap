using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BudgetSnap.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;

        public TransactionController(ILogger<TransactionController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<Transaction> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 10).Select(index => new Transaction
            {
                TransactionDate = DateTime.Now.AddDays(index*-1).ToUniversalTime(),
                TransactionId = rng.Next(0, 999999),
                Value = rng.Next(-20, 55),
                Summary = "Test summary!"
            })
            .ToArray();
        }
    }
}
