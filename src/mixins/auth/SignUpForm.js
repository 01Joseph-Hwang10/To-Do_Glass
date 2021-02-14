// React
import React from 'react'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux';
import { postSignUp } from '../../actions/useractions/authActions';
// etc
import PropTypes from 'prop-types';
import { spaceNotAllowed } from '../../functions/spaceNotAllowed';
import { COLOR_FOURTH, COLOR_SECOND, COLOR_THIRD } from '../../store/variables';

class SignUpForm extends React.Component {

    componentDidMount() {
        window.scrollTo(0,0)
    }

    render() {

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
            this.props.postSignUp(post_data);
            name.value="";
            email.value="";
            password.value="";
            confirmPassword.value="";
        };
    
        return (
            <div className="flex flex-col">
                <div className="my-5 mb-12 mx-auto w-1/2 2xl:w-1/3 text-center"><Link to='/'><i className="text-6xl text-center font-bold" style={{fontFamily:"Brush Script MT, Brush Script Std, cursive",color:COLOR_SECOND}}>FLglance<sup className="text-green-400 text-sm align-top">βeta</sup></i></Link></div>
                <div className="mx-auto w-1/2 rounded-lg p-2 flex flex-col items-center justify-center" style={{backgroundColor:COLOR_FOURTH}}>
                    <form className="emailSignUp w-11/12 mx-auto space-y-2 py-5 flex flex-col justify-center items-center" onSubmit={onSubmit}>
                        <input onKeyDown={spaceNotAllowed} className="emailSignUp__name w-full border-2 rounded-lg p-2 h-10 focus:border-gray-400" style={{transition:'all 0.2s ease-in-out'}} required type="text" placeholder="Name"></input>
                        <input onKeyDown={spaceNotAllowed} className="emailSignUp__email w-full border-2 rounded-lg p-2 h-10 focus:border-gray-400" style={{transition:'all 0.2s ease-in-out'}} required type="email" placeholder="Email"></input>
                        <input onKeyDown={spaceNotAllowed} className="emailSignUp__password w-full border-2 rounded-lg p-2 h-10 focus:border-gray-400" style={{transition:'all 0.2s ease-in-out'}} required type="password" placeholder="Password"></input>
                        <input onKeyDown={spaceNotAllowed} className="emailSignUp__confirmPassword w-full border-2 rounded-lg p-2 h-10 focus:border-gray-400" style={{transition:'all 0.2s ease-in-out'}} required type="password" placeholder="Confirm Password"></input>
                        <button className="emailSignUp__button w-full rounded-lg p-2 text-white font-semibold" style={{backgroundColor:COLOR_THIRD}}>Sign Up</button>
                    </form>
                </div>
            </div>
        )
    }
}

SignUpForm.propTypes = {
    postSignUp: PropTypes.func.isRequired
}

export default connect(null,{postSignUp})(SignUpForm);
