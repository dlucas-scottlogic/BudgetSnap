const unloadedState = { isLoggedIn: false };

const reducer = (state, incomingAction) => {
    console.log('auth reducer called: ' + incomingAction.type + ' : ' + incomingAction.payload);

    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction;
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                isLoggedIn: action.payload
            };       
        default:
            return state;
    }
};

export default reducer;