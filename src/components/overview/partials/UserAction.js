import React from 'react'
import { COLOR_FIFTH, COLOR_THIRD } from '../../../store/variables';

function UserAction() {
    return (
        <div className='w-full flex justify-center items-center'>
            <button className="w-11/12 rounded py-1 px-3 font-semibold" style={{backgroundColor:COLOR_THIRD,color:COLOR_FIFTH}}>Edit Profile</button>
        </div>
    )
}

export default UserAction;
