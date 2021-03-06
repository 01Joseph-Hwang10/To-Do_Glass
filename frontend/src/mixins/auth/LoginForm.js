// React
import React from 'react'
import { Link } from 'react-router-dom'
// Redux
import { connect } from 'react-redux';
import {postLogin} from '../../actions/useractions/authActions'
import { setScreenSize } from "../../actions/screenActions";
// etc
import PropTypes from 'prop-types';
import { COLOR_FOURTH, COLOR_SECOND, COLOR_THIRD } from '../../store/variables';
import { scrollToTop } from "../../functions/scrollFunctions";

class LoginForm extends React.Component {

    componentDidMount() {
        scrollToTop()
        const setScreenSize = this.props.setScreenSize
        setScreenSize(window.innerWidth)
        window.onresize = function() {
            setScreenSize(window.innerWidth)
        }
    }

    render() {

        const screenSize = this.props.screenSize
        const minHeight = (function(){return(screenSize>=640?'85vh':'75vh')})()
        const loginSuccessful = this.props.loginSuccessful

        const onSubmit = async (e) => {
            e.preventDefault()
            const loading = document.querySelector('.emailLogin__loading')
            loading.style.display ='block'

            const email = document.querySelector(".emailLogin__email");
            const password = document.querySelector(".emailLogin__password");
            const post_data = {
                username:email.value,
                password:password.value
            };
            await this.props.postLogin(post_data);
            email.value="";
            password.value="";

            loading.style.display = 'none'
        };
    
        return (
            <div className="flex flex-col" style={{minHeight:minHeight}}>
                <div className="my-5 mb-12 mx-auto w-11/12 sm:w-1/2 text-center"><Link to='/'><i className="text-6xl text-center font-bold" style={{fontFamily:"Brush Script MT, Brush Script Std, cursive",color:COLOR_SECOND}}>FLglance<sup className="text-green-400 text-sm align-top">βeta</sup></i></Link></div>
                <div className="mx-auto w-11/12 sm:w-1/2 2xl:w-1/3 rounded-lg p-2 flex flex-col items-center justify-center shadow-md" style={{backgroundColor:COLOR_FOURTH}}>
                    <div className="flex flex-col w-11/12 items-center justify-center">
                        <form className="emailLogin w-full mx-auto space-y-2 py-5 flex flex-col justify-center items-center" onSubmit={onSubmit}>
                            <input className="emailLogin__email w-full border-2 rounded-lg p-2 h-10 focus:border-gray-400" style={{transition:'all 0.2s ease-in-out'}} required type="email" placeholder="email"></input>
                            <input className="emailLogin__password w-full border-2 rounded-lg p-2 h-10 focus:border-gray-400" style={{transition:'all 0.2s ease-in-out'}} required type="password" placeholder="password"></input>
                            {
                                loginSuccessful ? (<></>) : (
                                    <span className="emailLogin__failed text-red-500 font-semibold">Login Failed! Check if your email and password typed correctly! If the error continues, please contact with the email at bottom</span>
                                )
                            }
                            <span className="emailLogin__loading font-semibold text-center" style={{display:'none'}}>Logging In...</span>
                            <button className="emailLogin__login w-full rounded-lg p-2 text-white font-semibold" style={{backgroundColor:COLOR_THIRD}}>Login</button>
                        </form>
                    </div>
                    <div className="w-full text-center pb-2">
                        <span>Have No Account? </span><Link to='/signup'><span className="font-bold text-lg text-green-500">Sign Up</span></Link>
                    </div>
                    <div className="w-full text-center pb-2">
                        <span>Forgot a password? </span><Link to='/reset_password'><span className="font-bold text-lg text-gray-600">Reset Password</span></Link>
                    </div>
                </div>
            </div>
        )
    }

}


LoginForm.propTypes = {
    postLogin:PropTypes.func.isRequired,
    setScreenSize:PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        screenSize:state.screen.screenSize,
        loginSuccessful:state.login.loginSuccessful
    }
}


export default connect(mapStateToProps,{postLogin,setScreenSize})(LoginForm);
