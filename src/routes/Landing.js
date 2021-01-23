// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

function Landing(props) {

    if(props.isAuthenticated) {
        
        const user_id = window.localStorage.getItem('user_id');

        return (
            <Redirect to={{pathname:`/${user_id}/home`}} />
        )
    } else {
        return (
            <div id="landing">
                <h1>Landing Page</h1>
                <Link to='/signup'><span>Sign Up</span></Link>
                <div>Or</div>
                <Link to='/login'><span>Login</span></Link>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated
    }
}


export default connect(mapStateToProps, null)(Landing);
