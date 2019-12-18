const TransactionListActionCreators = {
    requestTransactions: (startIndex) => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.transactions && startIndex !== appState.transactions.startIndex) {
            fetch("http://localhost:32780/Transaction")
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRANSACTIONS', startIndex: startIndex, transactions: data });
                });

            dispatch({ type: 'REQUEST_TRANSACTIONS', startIndex: startIndex });
        }
    }
};

export default TransactionListActionCreators;