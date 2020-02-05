import React from 'react';
import { connect } from 'react-redux';
import { makeUserManager } from 'react-oidc'
import { AuthSettings } from './../login-config';
import { Login } from '../redux/actions/Login';
import { Redirect } from 'react-router';
import AuthService from './../auth-service'

class LoginCallback extends React.Component {

    componentWillMount() {

        var mgr = makeUserManager(AuthSettings);
        mgr.signinRedirectCallback()
            .then(() => {
                AuthService.getUser().then(user => {
                    if (user) {
                        console.log(user);

                        // send user to redux store.
                        this.props.Login(user);
                    }                    
                });
            });
    }

    render() {
        return (
            <Redirect to="/" />            
        );
    }
}

export default connect(
    (state) => state.auth,
    {Login}
)(LoginCallback);