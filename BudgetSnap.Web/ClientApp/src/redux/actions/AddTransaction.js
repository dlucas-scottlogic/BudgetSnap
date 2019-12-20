export function AddTransaction(transactionData) {
    return function (dispatch) {
        console.log('adding transaction');

        fetch("http://localhost:32780/Transaction", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        })
            .then(response => response.json())
            .then(transaction => {
                dispatch({
                    type: 'ADD_TRANSACTION',
                    payload: transaction
                });
            });
    }
}