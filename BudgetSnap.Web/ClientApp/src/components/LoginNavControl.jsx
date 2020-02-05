import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './LoginNavControl.css';
import AuthService from './../auth-service'

const LoginNavControl = (props) => {

    const logoutClick = (e) => {
        AuthService.logout(() => {
            
        });
    }

    const loginClick = (e) => {
        AuthService.login(() => {
            
        });
        
    }

    const loginbutton = () => {
        switch (props.user != null) {
            case true:
                return (<div style={{ display: "block", padding: "0.5rem 1rem"}} className="text-dark" onClick={logoutClick}>Welcome {props.user.profile.given_name} - Log Out</div>);
            default:
                return (<div style={{ display: "block", padding: "0.5rem 1rem"}} className="text-dark" onClick={loginClick}>Login</div>);
        }
    }

    return loginbutton()
}

// map the redux state to the props of this component to access the data.
function mapStateToProps(state) {
    return { user: state.auth.user }
}

export default connect(mapStateToProps)(LoginNavControl);