export function Login(user) {
    console.log('login action called');
    return function (dispatch) {
        dispatch({
            type: 'LOGIN',
            payload: user
        });
    }
}