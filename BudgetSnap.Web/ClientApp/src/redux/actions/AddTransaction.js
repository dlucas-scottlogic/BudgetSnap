import { API_ROOT } from '../../api-config';

export function AddTransaction(transactionData) {
    return function (dispatch) {
        fetch(`${API_ROOT}/Transaction`, {
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