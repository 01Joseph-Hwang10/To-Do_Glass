import React from 'react'
import { COLOR_FIRST } from '../../store/variables';

function Footer() {
    return (
        <div className="flex justify-center items-center border-t py-10 mt-10" style={{backgroundColor:COLOR_FIRST}}>
            <div className="flex flex-col justify-center items-center space-y-1">
                <span className="font-semibold text-lg text-gray-400">2021 FLGlance, © All Right Reserved</span>
                <span className="text-gray-400 text-sm">Contact: joseph95501@gmail.com</span>
            </div>
        </div>
    )
}

export default Footer;
