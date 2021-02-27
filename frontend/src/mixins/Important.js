import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function Important(props) {

    const isImportant = props.isImportant
    const top = props.top || false
    const style=(function(){return(top?"flex":"block")})()
    const screenSize = props.screenSize
    
    let permission = false
    if(props.permission) permission = props.permission

    let hover;
    if(permission && screenSize > 768) hover="hover:bg-gray-300"

    return (
        <>
        {
            isImportant ? (
                <div className={['rounded-3xl px-1 ',hover].join('')} style={{display:style,flexDirection:'column',justifyContent:'flex-start',alignItems:'center',transition:'all 0.1s ease-in-out'}}>
                    <i className="fas fa-star text-yellow-400 pt-1"></i>
                </div>
            ) : (
            <div className={['rounded-3xl px-1 ',hover].join('')} style={{display:'block',flexDirection:'column',justifyContent:'flex-start',alignItems:'center',transition:'all 0.1s ease-in-out'}}>
                <i className="far fa-star"></i>
            </div>
            )
        }
        </>
    )
}

// Important.propTypes = {

// }

const mapStateToProps = state => {
    return {
        screenSize:state.screen.screenSize
    }
}

export default connect(mapStateToProps,null)(Important)

