import React from 'react'
// import PropTypes from 'prop-types'
// import Important from '../../mixins/Important';

function ContainerHeader(props) {

    const container = props.container
    const permission = props.permission

    const OnMouseOver = (e) => {
        const button = e.target
        button.style.backgroundColor = "gray"
        document.addEventListener('mouseout',(e)=>{
            button.style.backgroundColor = "transparent"
        })
    }
    
    return (
        <>
        {
            permission ? (
            <div className="w-full h-full flex justify-center items-center box-border px-3" onMouseOver={OnMouseOver}>
                <button className="w-full h-full font-semibold text-left text-lg">{container.order}</button>
            </div>
            ) : (
            <div className="w-full h-full flex justify-center items-center box-border px-3" onMouseOver={OnMouseOver}>
                <div className="w-full h-full font-semibold text-left text-lg">{container.order}</div>
            </div>
            )
        }
        </>
    )
}

// ContainerHeader.propTypes = {

// }

export default ContainerHeader

