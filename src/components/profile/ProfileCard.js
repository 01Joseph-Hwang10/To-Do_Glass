// React
import React from 'react'
// Components
import UserAction from './UserAction';
import UserInfo from './UserInfo';
import UserInteraction from './UserInteraction';

function ProfileCard(props)  {

    return (
        <section>
            <div>
                <UserInfo Profile={props.Profile} />
            </div>
            <div>
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
