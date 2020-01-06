import React, { useState } from 'react';
import { connect } from 'react-redux';
import './LoginNavControl.css';
import defaultPerson from '../images/user-icon.png';

const LoginNavControl = () => {

    // used to toggle between display or edit mode
    const [expandedState, setExpandedState] = useState(false);
    const [loggedInState, setLoggedInState] = useState(false);

    const toggleExpand = (e) => {
        e.preventDefault();
        e.stopPropagation();

        setExpandedState(!expandedState);
    }

    const loginbutton = () => {
        return (
            <div onClick={toggleExpand}> Login <img src={defaultPerson} alt="unknown user image" width="30" height="30" /></div>
        );
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