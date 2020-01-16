import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './LoginNavControl.css';
import AuthService from './../auth-service'

const LoginNavControl = () => {

    const [loggedIn, setloggedIn] = useState(false);

    useEffect(
        () => {
            AuthService.getUser().then(user => {
                if (user) {
                    console.log("profile: " + user.profile.given_name);
                    console.log("id_token: " + user.id_token);

                    setloggedIn(true);
                }
                else {
                    console.log("user not logged in");
                    setloggedIn(false);
                }
            });           
        }, []);

    const logoutClick = (e) => {
        AuthService.logout(() => {
            console.log("Logged out");
        });
    }

    const loginClick = (e) => {
        AuthService.login(() => {
            console.log("logged in");
        });
    }

    const loginbutton = () => {
        switch (loggedIn) {
            case true:
                return (<div onClick={logoutClick}>Log Out</div>);
                break;
            case false:
                return (<div onClick={loginClick}>Login</div>);
                break;
        }
    }

    return loginbutton()
}

export default connect()(LoginNavControl);