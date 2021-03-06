﻿import { API_ROOT } from '../../api-config';

export function RequestTransactions(startIndex) {
    return function (dispatch, getState) {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.transactions && startIndex !== appState.transactions.startIndex) {
            fetch(`${API_ROOT}/Transaction`)
                .then(response => response.json())
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRANSACTIONS', startIndex: startIndex, transactions: data });
                });

            dispatch({ type: 'REQUEST_TRANSACTIONS', startIndex: startIndex });
        }
    }
}