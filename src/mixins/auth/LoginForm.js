// React
import React from 'react'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux';
import {postLogin} from '../../actions/useractions/authActions'
// etc
import PropTypes from 'prop-types';

function LoginForm(props) {

    const onSubmit = (e) => {
        e.preventDefault()
        const email = document.querySelector(".emailLogin__email");
        const password = document.querySelector(".emailLogin__password");
        const post_data = {
            username:email.value,
            password:password.value
        };
        props.postLogin(post_data);
        email.value="";
        password.value="";
    };

    return (
        <div>
            <div>
                <form className="emailLogin" onSubmit={onSubmit}>
                    <input className="emailLogin__email" required type="email" placeholder="email"></input>
                    <input className="emailLogin__password" required type="password" placeholder="password"></input>
                    <button className="emailLogin__login">Login</button>
                </form>
            </div>
            <div>
                <span>Have No Account? </span><Link to='/signup'><span>Sign Up</span></Link>
            </div>
        </div>
    )
}


LoginForm.propTypes = {
    postLogin:PropTypes.func.isRequired
}


export default connect(null,{postLogin})(LoginForm);
