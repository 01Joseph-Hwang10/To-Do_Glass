import React from 'react'
import { COLOR_FIFTH, COLOR_THIRD } from '../../../store/variables';

function UserInteraction() {
    return (
        <div className="w-full flex justify-center items-center">
            <button className="w-8/12 px-2 rounded text-white font-semibold" style={{backgroundColor:COLOR_THIRD,height:"30px"}}>Follow</button>
            <button className="fas fa-ellipsis-h rounded p-1 ml-1" style={{backgroundColor:COLOR_FIFTH,height:"30px"}}></button>
        </div>
    )
}

export default UserInteraction;