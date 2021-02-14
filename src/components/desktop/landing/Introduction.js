import React from 'react'
import { Link } from 'react-router-dom';
import { COLOR_FIRST } from "../../../store/variables";
// Images
import bg5 from '../../../static/images/bg5.jpg'
// import bg2 from '../../../static/images/bg2.jpg'

export default function Introduction() {
    return (
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
    )
}
