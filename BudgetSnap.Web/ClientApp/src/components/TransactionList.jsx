import * as React from 'react';
import { connect } from 'react-redux';
import { RequestTransactions } from '../redux/actions/RequestTransactions';
import Transaction from "./Transaction"
import TransactionForm from "./TransactionForm"

class TransactionList extends React.Component {
    // This method is called when the component is first added to the document
    componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    componentDidUpdate() {
        this.ensureDataFetched();
    }

    render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Transactions</h1>
                {this.renderTransactionsTable()}
            </React.Fragment>
        );
    }

    ensureDataFetched() {
        const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
        this.props.RequestTransactions(startIndex);
    }

    renderTransactionsTable() {
        return (
            <div>
                <TransactionForm />
                <hr />
                <table className='table table-striped' aria-labelledby="tabelLabel">
                    <thead>
                        <tr>
                            <th>Transaction Date</th>
                            <th>Value</th>                            
                            <th>Summary</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.props.transactions.map((transaction) =>
                            <Transaction key={transaction.transactionId} transaction={transaction} />
                        )}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default connect(
    (state) => state.transactions, // Selects which state properties are merged into the component's props
    { RequestTransactions } // Selects which action creators are merged into the component's props
)(TransactionList);
