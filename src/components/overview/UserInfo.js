import React from 'react'

function UserInfo(props) {
    return (
        <div>
            <h2>{props.Profile.first_name}</h2>
            <h4>{props.Profile.bio}</h4>
            <h5>Followers : {props.Profile.followers_count}</h5>
            <div className="w-10 h-10 bg-center bg-cover" style={{backgroundImage:`url("${props.Profile.avatar}")`}}></div>
            <h2>{props.Profile.email}</h2>
        </div>
    )
}

export default UserInfo;