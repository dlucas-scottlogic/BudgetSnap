import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface TransactionState {
    isLoading: boolean;
    startIndex?: number;
    transactions: Transaction[];
}

export interface Transaction {
    transactionId: string;
    value: number;
    transactionDate: number;
    summary: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestTransactionsAction {
    type: 'REQUEST_TRANSACTIONS';
    startIndex: number;
}

interface ReceiveTransactionsAction {
    type: 'RECEIVE_TRANSACTIONS';
    startIndex: number;
    transactions: Transaction[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestTransactionsAction | ReceiveTransactionsAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestTransactions: (startIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.transactions && startIndex !== appState.transactions.startIndex) {
            fetch("http://localhost:32780/Transaction")
                .then(response => response.json() as Promise<Transaction[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_TRANSACTIONS', startIndex: startIndex, transactions: data });
                });

            dispatch({ type: 'REQUEST_TRANSACTIONS', startIndex: startIndex });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: TransactionState = { transactions: [], isLoading: false };

export const reducer: Reducer<TransactionState> = (state: TransactionState | undefined, incomingAction: Action): TransactionState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
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
    }

    return state;
};
