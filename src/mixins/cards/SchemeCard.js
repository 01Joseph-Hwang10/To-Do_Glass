import React from 'react'
// import PropTypes from 'prop-types'

function SchemeCard(props) {

    const container = props.container

    return (
        <div>
            {props.permission ? (
            <>
                <button>{container.name}</button>
                <button>{container.description}</button>
            </>
            ) : (
            <>
                <div>{container.name}</div>
                <div>{container.description}</div>
            </>
            )}
        </div>
    )
}

// SchemeCard.propTypes = {

// }

export default SchemeCard

