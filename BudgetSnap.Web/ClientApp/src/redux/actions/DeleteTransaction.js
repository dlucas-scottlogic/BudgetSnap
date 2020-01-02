export function DeleteTransaction(transactionDataId) {
    return function (dispatch) {
        fetch("http://localhost:32780/Transaction/" + transactionDataId, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(transactionId => {
                dispatch({
                    type: 'DELETE_TRANSACTION',
                    payload: transactionId
                });
            });
    }
}