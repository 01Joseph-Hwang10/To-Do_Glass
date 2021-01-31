import React from 'react'
// import PropTypes from 'prop-types'
import Important from '../../mixins/Important';

function ContainerHeader(props) {

    const name = props.name
    const importance = props.importance
    const permission = props.permission
    
    return (
        <>
        {
            permission ? (
            <div className="w-full flex justify-between items-center px-3 pb-1">
                <button className="font-semibold flex-grow text-left text-lg">{name}</button>
                <div className="flex justify-end items-center">
                    <button className="fas fa-cog px-1"></button>
                    <button className="px-1"><Important isImportant={importance} /></button>
                </div>
            </div>
            ) : (
            <div className="w-full flex justify-between items-center px-3 pb-1">
                <div className="font-semibold flex-grow text-left text-lg">{name}</div>
                <div className="flex justify-end items-center">
                    <div className="px-1"><Important isImportant={importance} /></div>
                </div>
            </div>
            )
        }
        </>
    )
}

// ContainerHeader.propTypes = {

// }

export default ContainerHeader

