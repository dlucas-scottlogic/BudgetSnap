import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as TransactionsStore from '../store/Transaction';
import TransactionRow from "./TransactionRow"

class Transaction extends React.Component {
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
        this.props.requestTransactions(startIndex);
    }

    renderTransactionsTable() {
        return (
            <table className='table table-striped' aria-labelledby="tabelLabel">
                <thead>
                    <tr>
                        <th>Transaction Id</th>
                        <th>Value</th>
                        <th>Transaction Date</th>
                        <th>Summary</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.props.transactions.map((transaction) =>
                        <TransactionRow key={transaction.transactionId} transaction={transaction} />
                    )}
                </tbody>
            </table>
        );
    }

    renderPagination() {
        const prevStartDateIndex = (this.props.startIndex || 0) - 5;
        const nextStartDateIndex = (this.props.startIndex || 0) + 5;

        return (
            <div className="d-flex justify-content-between">
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${prevStartDateIndex}`}>Previous</Link>
                {this.props.isLoading && <span>Loading...</span>}
                <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next</Link>
            </div>
        );
    }
}



export default connect(
    (state) => state.transactions, // Selects which state properties are merged into the component's props
    TransactionsStore.actionCreators // Selects which action creators are merged into the component's props
)(Transaction);
