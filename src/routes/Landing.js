// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import useScroll from '../hooks/useScroll';
// etc
import { COLOR_FIFTH, COLOR_FIRST, COLOR_FOURTH } from "../store/variables";

function Landing(props) {

    const {y} = useScroll()

    if(props.isAuthenticated) {
        
        const user_id = window.localStorage.getItem('user_id');

        return (
            <Redirect to={{pathname:`/${user_id}/home`}} />
        )
    } else {
        return (
            <div id="landing" className="flex flex-col items-center justify-start">
                <div className="landingNav border-b-2 w-full p-3 px-6 flex justify-between items-center fixed top-0" style={{backgroundColor:(function(){return(y===0?COLOR_FIRST:COLOR_FIFTH)})(),transition:'all 0.4s ease-in-out',borderColor:(function(){return(y===0?"#374151":"#E5E7EB")})()}}>
                    <div className='flex justify-start'>
                    <Link to='/'><i className="text-2xl text-white font-bold" style={{fontFamily:"Brush Script MT, Brush Script Std, cursive",color:(function(){return(y===0?COLOR_FOURTH:COLOR_FIRST)})(),transition:'all 0.4s ease-in-out'}}>FLglance<sup className="text-green-400 text-xs align-top">βeta</sup></i></Link>
                    </div>
                    <div className="flex justify-end items-center space-x-2">
                        <div className="rounded px-2 py-1 ring-2 bg-gray-300 text-center font-semibold border"><Link to='/login'>Sign In</Link></div>
                        <div className="rounded px-2 py-1 ring-2 bg-green-400 text-center font-semibold border"><Link to='/signup'>Sign Up</Link></div>
                    </div>
                </div>
                <div className="w-full flex justify-around items-center" style={{backgroundColor:COLOR_FIRST}}>
                    <div className="flex flex-col justify-center items-start space-y-2 mt-32 mb-32">
                        <div className="flex flex-col justify-center items-start">
                            <span className="text-4xl text-white font-bold text-left">Start your project</span>
                            <span className="text-4xl text-white font-bold text-left">Share the workflow</span>
                        </div>
                        <div>
                            <span className="text-gray-300 font-semibold text-left">FLglance assists you to inspire, plan, and organize the project</span>
                        </div>
                        <div className="flex justify-start items-center pt-1">
                            <button className="py-1 px-8 bg-green-400 rounded text-white font-semibold ring-2">Sign Up</button>
                        </div>
                    </div>
                </div>
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
