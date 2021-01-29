import React from 'react'
// import PropTypes from 'prop-types'

function GlanceCard(props) {

    const glance = props.glance

    return (
        <div>
            <span>{glance.name}</span>
        </div>
    )
}

// GlanceCard.propTypes = {

// }

export default GlanceCard


