import React from 'react'
// import PropTypes from 'prop-types'

function TaskCard(props) {

    const task = props.task

    return (
        <div className="w-28 h-20 text-white flex flex-col">
            {props.permission ? (
            <>
            <div className="w-full bg-green-100 flex justify-center items-center">
                <button className="fas fa-grip-lines-vertical text-md w-full rounded text-gray-700"></button>
            </div>
            <div className="w-full flex flex-col justify-start items-center">
                <button>{task.name}</button>
            </div>
            </>
            ) : (
            <>
            <div className="w-full bg-green-100 flex justify-center items-center">
                <i className="fas fa-grip-lines-vertical text-md w-full text-center rounded text-gray-700"></i>
            </div>
            <div className="w-full flex flex-col justify-start items-center">
                <span>{task.name}</span>
            </div>
            </>
            )}
        </div>
    )
}

// TaskCard.propTypes = {

// }

export default TaskCard

