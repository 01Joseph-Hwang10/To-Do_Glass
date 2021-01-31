import React from 'react'
import Avatar from '../../mixins/user/Avatar'
import { COLOR_SEVENTH } from '../../store/variables'
// import PropTypes from 'prop-types'

function GlanceCard(props) {

    const glance = props.glance

    return (
        <div className="w-full rounded shadow-md flex flex-col p-2 mt-3" style={{backgroundColor:COLOR_SEVENTH}}>
            <div className="w-full flex justify-between items-center">
                <div><span className="text-blue-600 font-semibold text-lg underline">{glance.name}</span></div>
                <div>
                    <Avatar user={glance.created_user}/>
                </div>
            </div>
        </div>
    )
}

// GlanceCard.propTypes = {

// }

export default GlanceCard


