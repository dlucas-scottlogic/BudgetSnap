import { API_ROOT } from '../../api-config';

export function DeleteTransaction(transactionDataId) {
    return function (dispatch) {
        fetch(`${API_ROOT}/Transaction/` + transactionDataId, {
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