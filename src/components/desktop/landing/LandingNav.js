import React from 'react'
import {Link} from 'react-router-dom'
import { COLOR_FOURTH,COLOR_FIRST } from "../../../store/variables";
import useScroll from '../../../hooks/useScroll';

export default function LandingNav(props) {

    const {y} = useScroll()
    const screenSize = props.screenSize

    return (
    <div className="landingNav border-b-2 w-full p-3 px-6 flex justify-between items-center fixed top-0" style={{backgroundColor:(function(){return(y===0?"transparent":COLOR_FIRST)})(),transition:'all 0.4s ease-in-out',borderColor:(function(){return(y===0?"#374151":"#E5E7EB")})()}}>
        <div className='flex justify-start'>
        <Link to='/'><i className="text-2xl text-white font-bold" style={{fontFamily:"Brush Script MT, Brush Script Std, cursive",color:(function(){return(screenSize>=800||y!==0?COLOR_FOURTH:COLOR_FIRST)})(),transition:'all 0.4s ease-in-out'}}>FLglance<sup className="text-green-400 text-xs align-top">βeta</sup></i></Link>
        </div>
        <div className="flex justify-end items-center space-x-2">
            <div className="rounded px-2 py-1 ring-2 bg-gray-300 text-center font-semibold border"><Link to='/login'>Sign In</Link></div>
            <div className="rounded px-2 py-1 ring-2 bg-green-400 text-center font-semibold border"><Link to='/signup'>Sign Up</Link></div>
        </div>
    </div>
    )
}
