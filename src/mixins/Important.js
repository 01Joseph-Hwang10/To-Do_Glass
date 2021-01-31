import React from 'react'
// import PropTypes from 'prop-types'

function Important(props) {

    const isImportant = props.isImportant
    const top = props.top || false
    const style=(function(){return(top?"flex":"block")})()
    console.log(style)

    return (
        <>
        {
            isImportant ? (
                <div style={{display:style,flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
                    <i class="fas fa-star text-yellow-400"></i>
                </div>
            ) : (
            <div style={{display:'block',flexDirection:'column',justifyContent:'flex-start',alignItems:'center'}}>
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

