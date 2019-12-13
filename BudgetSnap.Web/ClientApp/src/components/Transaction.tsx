import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as TransactionsStore from '../store/Transaction';

// At runtime, Redux will merge together...
type TransactionProps =
    TransactionsStore.TransactionState // ... state we've requested from the Redux store
    & typeof TransactionsStore.actionCreators // ... plus action creators we've requested
    & RouteComponentProps<{ startIndex: string }>; // ... plus incoming routing parameters


class Transaction extends React.PureComponent<TransactionProps> {
    // This method is called when the component is first added to the document
    public componentDidMount() {
        this.ensureDataFetched();
    }

    // This method is called when the route parameters change
    public componentDidUpdate() {
        this.ensureDataFetched();
    }

    public render() {
        return (
            <React.Fragment>
                <h1 id="tabelLabel">Transactions</h1>

                {this.renderTransactionsTable()}
                
            </React.Fragment>
        );
    }

    private ensureDataFetched() {
        const startIndex = parseInt(this.props.match.params.startIndex, 10) || 0;
        this.props.requestTransactions(startIndex);
    }

    private renderTransactionsTable() {
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
                    {this.props.transactions.map((transaction: TransactionsStore.Transaction) =>
                        <tr key={transaction.transactionId}>
                            <td>{transaction.transactionId}</td>
                            <td>&#163;{transaction.value}</td>
                            <td>{transaction.transactionDate}</td>
                            <td>{transaction.summary}</td>
                            <td>Modify</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    private renderPagination() {
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
    (state: ApplicationState) => state.transactions, // Selects which state properties are merged into the component's props
    TransactionsStore.actionCreators // Selects which action creators are merged into the component's props
)(Transaction as any);
