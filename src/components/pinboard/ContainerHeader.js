import React from 'react'
// import PropTypes from 'prop-types'
// import Important from '../../mixins/Important';

function ContainerHeader(props) {

    const container = props.container
    const permission = props.permission
    
    return (
        <>
        {
            permission ? (
            <div className="w-full h-full flex justify-center items-center px-3 pb-1 hover:bg-gray-400">
                <button className="h-full font-semibold flex-grow text-left text-lg">{container.order}</button>
            </div>
            ) : (
            <div className="w-full h-full flex justify-center items-center px-3 pb-1 hover:bg-gray-400">
                <div className="h-full font-semibold flex-grow text-left text-lg">{container.order}</div>
            </div>
            )
        }
        </>
    )
}

// ContainerHeader.propTypes = {

// }

export default ContainerHeader

