// React
import React from 'react'
// Components
import UserAction from './partials/UserAction';
import UserInfo from './UserInfo';
import UserInteraction from './partials/UserInteraction';
import { COLOR_FOURTH } from '../../store/variables';

function ProfileCard(props)  {

    return (
        <section className="rounded w-full p-2 py-5 flex flex-col justify-center items-center" style={{backgroundColor:COLOR_FOURTH}}>
            <div>
                <UserInfo Profile={props.Profile} />
            </div>
            <div className="mt-3">
                {props.isMyProfile ? (
                    <UserAction />
                ) : (
                    <UserInteraction />
                )}
            </div>
        </section>
    )

}

export default ProfileCard;
