import React from 'react'
import { Link } from 'react-router-dom'
// import PropTypes from 'prop-types'

function Avatar(props) {

    const user = props.user

    return (
        <Link to={{pathname:`/${user.id}/home`}}>
            <div>
                <div className='w-8 h-8 rounded-2xl bg-cover bg-center' style={{backgroundImage:`url("${user.avatar}")`}}></div>
                <div><span>{user.first_name}</span></div>
            </div>
        </Link>
    )
}

// Avatar.propTypes = {

// }

export default Avatar

