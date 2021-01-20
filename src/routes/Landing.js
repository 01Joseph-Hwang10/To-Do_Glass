import React from 'react';
import {Link, Redirect} from 'react-router-dom';

function Landing(props) {

    if(props.isAuthenticated) {
        <Redirect to={{pathname:'/home'}} />
    } else {
        return (
            <div id="landing">
                <h1>Landing Page</h1>
                <Link to='/signup'><span>Sign Up</span></Link>
                <div>Or</div>
                <Link to='/login'><spna>Login</spna></Link>
            </div>
        )
    }

}


export default Landing;
