const unloadedState = { transactions: [], isLoading: false };

const reducer = (state, incomingAction) => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction;
    switch (action.type) {
        case 'REQUEST_TRANSACTIONS':
            return {
                startIndex: action.startIndex,
                transactions: state.transactions,
                isLoading: true
            };
        case 'RECEIVE_TRANSACTIONS':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startIndex === state.startIndex) {
                return {
                    startIndex: action.startIndex,
                    transactions: action.transactions,
                    isLoading: false
                };
            }
            break;
        case 'ADD_TRANSACTION':
            console.log('Add transaction reducer called.');
            return {
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
            break;
    }

    return state;
};

export default reducer;