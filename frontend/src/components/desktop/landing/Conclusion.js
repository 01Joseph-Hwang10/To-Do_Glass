import React from 'react'
import { Link } from "react-router-dom";
import bg6 from '../../../static/images/bg6.jpg'

export default function Conclusion() {
    return (
        <div className="w-full bg-cover bg-top flex justify-center items-center" style={{backgroundImage:`url(${bg6})`,minHeight:'300px',width:'100vw'}}>
            <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-4xl font-bold text-white text-center">Sign up now</h1>
                <h1 className="text-4xl font-bold text-white text-center">And start out your project</h1>
                <div className="py-1 px-8 bg-green-400 ring-2 font-bold mt-4 rounded text-white"><Link to='/signup'>Start Project</Link></div>
            </div>
        </div>
    )
}
