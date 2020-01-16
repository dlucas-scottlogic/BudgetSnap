import React from 'react';
import { connect } from 'react-redux';
import { makeUserManager } from 'react-oidc'
import { AuthSettings } from './../login-config';
import { Login } from '../redux/actions/Login';

class LoginCallback extends React.Component {

    componentWillMount() {

        var mgr = makeUserManager(AuthSettings);
        mgr.signinRedirectCallback()
            .then(() => {
                this.props.Login(true);
            });
    }

    render() {
        return (
            <span>You are now logged in </span>
        );
    }
}

export default connect(
    (state) => state.auth,
    { Login }
)(LoginCallback);