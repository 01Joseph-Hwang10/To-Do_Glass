import React from 'react'
import Important from '../../mixins/Important'
// import PropTypes from 'prop-types'

function ContainerDetail(props) {

    const container = props.container
    const permission = props.permission

    const hideDetail = (e) => {
        const containerDetail = e.target.closest('.containerDetail')
        containerDetail.style.maxHeight = '0'
        containerDetail.style.borderBottomWidth = '0'
        containerDetail.style.opacity = 0
    }

    return (
        <div className="w-full flex flex-col justify-start items-center space-y-2">
            <div className='w-full flex justify-between items-center px-2 py-1 text-xl'>
                <div className="flex justify-start items-center space-x-1">
                    {
                        permission ? (
                            <button>
                                <Important isImportant={container.importance} />
                            </button>
                        ) : (
                            <div>
                                <Important isImportant={container.importance} />
                            </div>
                        )
                    }
                    <div>{container.name}</div>
                </div>
                <div className="flex justify-end items-center space-x-1" style={{minWidth:'100px'}}>
                    <button className="fas fa-cog"></button>
                    <button onClick={hideDetail} className="fas fa-times"></button>
                </div>
            </div>
            <div className="w-full">
                <textarea className="resize-none bg-transparent p-2 w-full" style={{transition:'all 0.5s ease-in-out'}}>{container.description}</textarea>
            </div>
        </div>
    )
}

// ContainerDetail.propTypes = {

// }

export default ContainerDetail

