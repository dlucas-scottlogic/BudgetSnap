import React from 'react';
import { makeAuthenticator, makeUserManager, Callback } from 'react-oidc'
import { AuthSettings } from './../login-config';

class LoginCallback extends React.Component {

    componentWillMount() {

        var mgr = makeUserManager(AuthSettings);
        mgr.signinRedirectCallback();        
    }

    render() {
        return (
            <span>You are now logged in </span>
        );
    }
}

export default LoginCallback;