// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import useScroll from '../hooks/useScroll';
// CSS
import "../static/css/Landing.css";
// etc
import { COLOR_FIRST, COLOR_FOURTH } from "../store/variables";
import bg5 from '../static/images/bg5.jpg'
// import bg2 from '../static/images/bg2.jpg'
// Components
import Important from "../mixins/Important";

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

                <div className="landingNav border-b-2 w-full p-3 px-6 flex justify-between items-center fixed top-0" style={{backgroundColor:(function(){return(y===0?"transparent":COLOR_FIRST)})(),transition:'all 0.4s ease-in-out',borderColor:(function(){return(y===0?"#374151":"#E5E7EB")})()}}>
                    <div className='flex justify-start'>
                    <Link to='/'><i className="text-2xl text-white font-bold" style={{fontFamily:"Brush Script MT, Brush Script Std, cursive",color:(function(){return(y===0?COLOR_FOURTH:COLOR_FOURTH)})(),transition:'all 0.4s ease-in-out'}}>FLglance<sup className="text-green-400 text-xs align-top">βeta</sup></i></Link>
                    </div>
                    <div className="flex justify-end items-center space-x-2">
                        <div className="rounded px-2 py-1 ring-2 bg-gray-300 text-center font-semibold border"><Link to='/login'>Sign In</Link></div>
                        <div className="rounded px-2 py-1 ring-2 bg-green-400 text-center font-semibold border"><Link to='/signup'>Sign Up</Link></div>
                    </div>
                </div>

                <div className="introduction w-full flex justify-around items-center bg-center bg-cover flex-wrap border-b-2 pt-0 mt-0" style={{backgroundColor:COLOR_FIRST,backgroundImage:`url(${bg5})`}}>
                    <div className="welcomeCopy flex flex-col justify-center items-start space-y-2 mt-32 mb-32">
                        <div className="flex flex-col justify-center items-start">
                            <h1 className="text-4xl 2xl:text-6xl text-white font-bold text-left">Start the project</h1>
                            <h1 className="text-4xl 2xl:text-6xl text-white font-bold text-left">Share the workflow</h1>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-gray-800 2xl:text-2xl font-semibold text-left">Plan, Organize, Manage the project</h2>
                            <h2 className="text-gray-800 2xl:text-2xl font-semibold text-left">Share your workflow, and inspired by the other's</h2>
                        </div>
                        <div className="flex justify-start items-center pt-1">
                            <div className="py-1 px-8 bg-green-400 rounded text-white 2xl:text-xl font-semibold ring-2"><Link to='/signup'>Start Project</Link></div>
                        </div>
                    </div>
                    <div className="mt-32 mb-32"></div>
                </div>
                
                <div className="my-20 w-full"></div>

                <div className='description w-10/12 2xl:w-8/12'>
                    <div className="containerFirst w-full flex justify-around items-center">
                        <div className="descriptionFirst flex flex-col justify-center items-start space-y-2">
                            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">Start the project</span></div>
                            <div className="flex flex-col justify-center items-start">
                                <span className="text-gray-700">Flglance provides the powerful tools</span>
                                <span className="text-gray-700">For your project planning and workflow managing</span>
                                <span className="text-gray-700">Just name and create, and begin the journey</span>
                            </div>
                        </div>
                        <div className="figureFirst flex justify-center items-start space-x-2">
                            <div className="flex flex-col justify-start items-center">
                                <div className="w-full p-1 px-2 mt-2 rounded flex justify-between" style={{backgroundColor:COLOR_FOURTH}}>
                                    <div><span className="xl:text-lg font-semibold underline text-blue-600">My First Project!!</span></div>
                                    <div><Important isImportant={false} /></div>
                                </div>
                            </div>
                            <div className="h-64 w-48 flex justify-center items-center rounded p-2" style={{backgroundColor:COLOR_FOURTH}}>
                                <span>No Projects Are Opened</span>
                            </div>
                        </div>
                    </div>

                    <div className="my-16 w-full"></div>

                    <div className="containerSecond w-full flex justify-around items-center">
                        <div className="figureSecond"></div>
                        <div className="descriptionSecond flex flex-col justify-center items-start space-y-2">
                            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">Construct the Scheme</span></div>
                            <div className="flex flex-col justify-center items-start">
                                <span className="text-gray-700">Set up the frame of the project</span>
                                <span className="text-gray-700">Inspired by PERT chart, it gives you the big picture of project</span>
                                <span className="text-gray-700">Again, Just name and create, and you're right to go</span>
                            </div>
                        </div>
                    </div>

                    <div className="my-16 w-full"></div>

                    <div className="containerThird w-full flex justify-around items-center">
                        <div className="descriptionThird flex flex-col justify-center items-start space-y-2">
                            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">Add the Task</span></div>
                            <div className="flex flex-col justify-center items-start">
                                <span className="text-gray-700">Make it more concrete, more vivid</span>
                                <span className="text-gray-700">Inspired by GANTT chart, it ables you to manage tasksefficiently</span>
                                <span className="text-gray-700">You can also move your tasks like a Post-it,</span>
                                <span className="text-gray-700">Makes the management more efficiently</span>
                            </div>
                        </div>
                        <div className="figureThird"></div>
                    </div>

                    <div className="my-16 w-full"></div>

                    <div className="containerFourth w-full flex justify-around items-center">
                        <div className="figureFourth"></div>
                        <div className="descriptionFourth flex flex-col justify-center items-start space-y-2">
                            <div className="flex flex-col justify-center items-start"><span className="text-3xl font-semibold">You're not Alone</span></div>
                            <div className="flex flex-col justify-center items-start">
                                <span className="text-gray-700">Glance over the other's workflow</span>
                                <span className="text-gray-700">And give your project another rize</span>
                                <span className="text-gray-700">Follow who you're interested in</span>
                                <span className="text-gray-700">And get his/her workflow firstly</span>
                            </div>
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
