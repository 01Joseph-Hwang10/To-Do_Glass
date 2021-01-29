import React from 'react'
// import PropTypes from 'prop-types'

function TaskCard(props) {

    const task = props.task

    return (
        <div>
            {props.permission ? (
            <>
                <button>{task.name}</button>
                <button>{task.description}</button>
            </>
            ) : (
            <>
                <div>{task.name}</div>
                <div>{task.description}</div>
            </>
            )}
        </div>
    )
}

// TaskCard.propTypes = {

// }

export default TaskCard

