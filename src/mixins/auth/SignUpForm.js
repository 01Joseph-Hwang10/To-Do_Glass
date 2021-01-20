// React
import React from 'react'
// Redux
import { connect } from 'react-redux';
import { postSignUp } from '../../actions/authActions';
// etc
import PropTypes from 'prop-types';
import { spaceNotAllowed } from '../../functions/spaceNotAllowed';

function SignUpForm(props) {

    const onSubmit = (e) => {
        e.preventDefault()
        const name = document.querySelector(".emailSignUp__name");
        const email = document.querySelector(".emailSignUp__email");
        const password = document.querySelector(".emailSignUp__password");
        const confirmPassword = document.querySelector(".emailSignUp__confirmPassword");
        if(password.value!==confirmPassword.value) return alert("Your password confirmation is not valid!");
        const post_data = {
            first_name:name.value,
            email:email.value,
            password:password.value
        };
        props.postSignUp(post_data);
        name.value="";
        email.value="";
        password.value="";
        confirmPassword.value="";
    };

    return (
        <div>
            <div>
                <form className="emailSignUp" onSubmit={onSubmit}>
                    <input onKeyDown={spaceNotAllowed} className="emailSignUp__name" required type="text" placeholder="Name"></input>
                    <input onKeyDown={spaceNotAllowed} className="emailSignUp__email" required type="email" placeholder="Email"></input>
                    <input onKeyDown={spaceNotAllowed} className="emailSignUp__password" required type="password" placeholder="Password"></input>
                    <input onKeyDown={spaceNotAllowed} className="emailSignUp__confirmPassword" required type="password" placeholder="Confirm Password"></input>
                    <button className="emailSignUp__button">Sign Up</button>
                </form>
            </div>
        </div>
    )
}

SignUpForm.propTypes = {
    postSignUp: PropTypes.func.isRequired
}

export default connect(null,{postSignUp})(SignUpForm);
