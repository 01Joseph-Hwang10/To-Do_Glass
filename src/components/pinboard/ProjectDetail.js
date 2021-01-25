import React from 'react'
// import PropTypes from 'prop-types'

function ProjectDetail(props) {

    const description = props.project.description || "Write the description here!"

    return (
        <div>
            {props.permission ? (
                <div>
                    <span>{description}</span>
                    <button>Edit</button>
                </div>
            ) : (
                <div>
                    <span>{description}</span>
                </div>
            )}
        </div>
    )
}

// ProjectDetail.propTypes = {

// }

export default ProjectDetail

