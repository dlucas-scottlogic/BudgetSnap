export function Login(loggedIn) {
    console.log('login action called');
    return function (dispatch) {
        dispatch({
            type: 'LOGIN',
            payload: loggedIn
        });
    }
}