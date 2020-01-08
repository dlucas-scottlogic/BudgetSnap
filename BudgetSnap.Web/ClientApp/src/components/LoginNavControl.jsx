import React, { useState } from 'react';
import { connect } from 'react-redux';
import './LoginNavControl.css';
import defaultPerson from '../images/user-icon.png';
import { makeAuthenticator, makeUserManager, Callback } from 'react-oidc'
import { LOGIN_URL } from '../login-config';

const LoginNavControl = () => {

    // used to toggle between display or edit mode
    const [expandedState, setExpandedState] = useState(false);
    const [loggedInState, setLoggedInState] = useState(false);

    const toggleExpand = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setExpandedState(!expandedState);
    }

    var settings = {
        authority: "http://localhost:32782",
        client_id: "budgetsnap-frontend",
        response_type: "code",
        scope: "openid profile",

        redirect_uri: "http://localhost:2908/login-landing",     
    };

    const loginbutton = () => {

        var mgr = makeUserManager(settings);

        mgr.getUser()
            .then(function (user) {
            if (user) {
                //console.log(user);
                return (<div>logged in</div>);
            }
            else {
                //console.log("user not logged in");
                return (<div onClick={mgr.signinRedirect()}>Login</div>);
            }
        });

        //if (!loggedInState) {
        //    let returnUrl = encodeURIComponent(window.location.href);
        //    let fullLoginUrl = LOGIN_URL + "?ReturnUrl=" + returnUrl;

        //    return (<a href={fullLoginUrl}>Login</a>);
        //}
        //else {
        //    return (
        //        <div onClick={toggleExpand}> Login <img src={defaultPerson} alt="unknown user image" width="30" height="30" /></div>
        //    );
        //}

    }

    if (expandedState === true) {
        return (
            <div>
                {loginbutton()}
                <div className="drop-down-float">
                    <form>
                        <div>
                            <div><img src={defaultPerson} alt="unknown user image" width="75" height="75" /></div>
                            <div><input type="text" placeholder="Email" /></div>
                            <div><input type="password" placeholder="Password" /></div>
                            <div><button type="submit">Submit</button></div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
    else {
        return loginbutton()
    }

}

export default connect()(LoginNavControl);