import { API_ROOT } from '../../api-config';

export function UpdateTransaction(transactionData) {
    //console.log('Update Transaction Action called');
    return function (dispatch) {
        fetch(`${API_ROOT}/Transaction`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        })
            .then(response => response.json())
            .then(transaction => {
                dispatch({
                    type: 'UPDATE_TRANSACTION',
                    payload: transaction
                });
            });
    }
}