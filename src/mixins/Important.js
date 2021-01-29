import React from 'react'
// import PropTypes from 'prop-types'

function Important(props) {

    const isImportant = props.isImportant

    return (
        <>
        {
            isImportant ? (
                <div>
                    <i class="fas fa-star text-yellow-400 text-lg"></i>
                </div>
            ) : (
            <div>
                <i className="far fa-star"></i>
            </div>
            )
        }
        </>
    )
}

// Important.propTypes = {

// }

export default Important

