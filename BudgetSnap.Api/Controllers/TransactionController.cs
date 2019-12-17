using System;
using System.Collections.Generic;
using System.Linq;
using BudgetSnap.Api.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace BudgetSnap.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TransactionController : ControllerBase
    {
        private readonly ILogger<TransactionController> _logger;
        private readonly ITransactionService _transactionService;

        public TransactionController(ILogger<TransactionController> logger, ITransactionService transactionService)
        {
            _logger = logger;
            _transactionService = transactionService;
        }

        [HttpGet]
        public IEnumerable<TransactionDto> Get()
        {
            return _transactionService.GetTransactions();
        }

        [HttpGet]
        [Route("{id}")]
        public TransactionDto Get(long id)
        {
            return _transactionService.GetTransaction(id);
        }

        [HttpPost]
        public ActionResult<TransactionDto> Post(TransactionDto transaction)
        {
            var transactionToReturn = _transactionService.SaveTransaction(transaction);

            return CreatedAtAction("Get", transactionToReturn);
        }

        [HttpPut]
        public ActionResult Put(TransactionDto transaction)
        {
            var transactionToReturn = _transactionService.SaveTransaction(transaction);

            return Ok();
        }
    }
}
