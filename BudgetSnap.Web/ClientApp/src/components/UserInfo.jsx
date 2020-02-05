import * as React from 'react';
import { connect } from 'react-redux';

const UserInfo = (props) => {
    return (<div>
        <h1>User info</h1>

        <div>Name: {props.user.profile.given_name}</div>

        <p>Claims:</p>
        <ul>
            <li><strong>Client-side navigation</strong></li>
        </ul>
        <p>The <code>ClientApp</code> subdirectory is a standard React application based on the <code>create-react-app</code> template. If you open a command prompt in that directory, you can run <code>npm</code> commands such as <code>npm test</code> or <code>npm install</code>.</p>
    </div>)
};

// map the redux state to the props of this component to access the data.
function mapStateToProps(state) {
    return { user: state.auth.user }
}

export default connect(mapStateToProps)(UserInfo);