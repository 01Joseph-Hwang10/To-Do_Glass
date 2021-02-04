import React from 'react'
import { Link } from 'react-router-dom';
import { COLOR_FIFTH, COLOR_THIRD } from '../../../store/variables';

function UserAction(props) {

    const profile = props.Profile
    const id = Number(profile.id)

    return (
        <div className='w-full flex justify-center items-center'>
            <Link to={{
                pathname:`/${id}/edit_profile`,
                state: {
                    profile:profile
                }
            }}>
                <span className="w-11/12 rounded py-1 px-3 font-semibold" style={{backgroundColor:COLOR_THIRD,color:COLOR_FIFTH}}>Edit Profile</span>
            </Link>
        </div>
    )
}

export default UserAction;
