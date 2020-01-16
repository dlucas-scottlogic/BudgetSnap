import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './LoginNavControl.css';
import AuthService from './../auth-service'
import { Login } from '../redux/actions/Login';

const LoginNavControl = (props) => {

    const [loggedIn, setloggedIn] = useState(false);

    useEffect(
        () => {
            AuthService.getUser().then(user => {
                if (user) {                   
                    setloggedIn(true);
                    props.Login(true);
                }
                else {
                    setloggedIn(false);
                    props.Login(false);
                }
            });           
        });

    const logoutClick = (e) => {
        AuthService.logout(() => {
            
        });
    }

    const loginClick = (e) => {
        AuthService.login(() => {
            
        });
        
    }

    const loginbutton = () => {
        switch (loggedIn) {
            case true:
                return (<div onClick={logoutClick}>Log Out</div>);
            default:
                return (<div onClick={loginClick}>Login</div>);
        }
    }

    return loginbutton()
}

export default connect(
    (state) => state.auth,
    { Login }
    )(LoginNavControl);