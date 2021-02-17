import React from 'react'
import { Link } from 'react-router-dom';
import { COLOR_FIRST } from "../../../store/variables";
// Images
import bg5 from '../../../static/images/bg5.jpg'
// import bg2 from '../../../static/images/bg2.jpg'

export default function Introduction(props) {

    const screenSize = props.screenSize

    return (
    <div className="introduction w-full flex justify-around items-center bg-center bg-cover flex-wrap border-b-2 pt-0 mt-0" style={{backgroundColor:COLOR_FIRST,backgroundImage:`url(${bg5})`}}>
        <div className="welcomeCopy flex flex-col justify-center items-center sm:items-start space-y-2 mt-32 mb-32">
            <div className="w-full sm:w-auto flex flex-col justify-center items-start">
                <h1 className="text-4xl 2xl:text-6xl text-white font-bold text-left">Start the project</h1>
                <h1 className="text-4xl 2xl:text-6xl text-white font-bold text-left">Share the workflow</h1>
            </div>
            <div className="w-full sm:w-auto flex flex-col">
                <h2 className="text-gray-800 2xl:text-2xl font-semibold text-left">Plan, Organize, Manage the project</h2>
                <h2 className="text-gray-800 2xl:text-2xl font-semibold text-left">Share your workflow, and inspired by the other's</h2>
            </div>
            <div className="w-full sm:w-auto flex justify-start items-center pt-1">
                <div className="py-1 px-8 bg-green-400 rounded text-white 2xl:text-xl font-bold ring-2"><Link to='/signup'>Start Project</Link></div>
            </div>
            {
                screenSize <= 640 ? (
                    <div className="w-full flex flex-col rounded py-1" style={{backgroundColor:'rgba(156,163,175,0.8)'}}>
                        <h3 className="text-red-600 font-semibold text-center text-sm">Currntly, only desktop and tablet-pc are supported</h3>
                        <h3 className="text-red-600 font-semibold text-center text-sm">Sorry for the inconvenience</h3>
                    </div>
                ) : (
                    <></>
                )
            }
        </div>
        {
            screenSize>=640 ? (
                <div className="mt-32 mb-32"></div>
            ) : (
                <></>
            )
        }
    </div>
    )
}