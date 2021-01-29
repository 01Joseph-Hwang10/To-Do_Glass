import React from 'react'

function UserInfo(props) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-10 h-10 bg-center bg-cover rounded-3xl" style={{backgroundImage:`url("${props.Profile.avatar}")`}}></div>
            <div><span className="text-lg">{props.Profile.first_name}</span></div>
            <div><span className="text-xs">{props.Profile.bio}</span></div>
            <div><span className="text-sm">{props.Profile.email}</span></div>
            <div><span className="text-sm">Followers : {props.Profile.followers_count}</span></div>
        </div>
    )
}

export default UserInfo;