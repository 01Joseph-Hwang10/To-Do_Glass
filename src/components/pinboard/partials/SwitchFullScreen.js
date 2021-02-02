import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {enableFullScreen,disableFullScreen} from '../../../actions/screenActions';

function SwitchFullScreen(props) {

    const isFullScreen = props.isFullScreen

    const enableFullScreen = () => {
        props.enableFullScreen()
    }

    const disableFullScreen = () => {
        props.disableFullScreen()
    }

    return (
        <>
            {
                isFullScreen ? (
                    <button className="fas fa-compress-alt text-lg p-1 py-2" onClick={disableFullScreen}></button>
                ) : (
                    <button className="fas fa-expand-alt text-lg p-1 py-2" onClick={enableFullScreen}></button>
                )
            }
        </>
    )
}

SwitchFullScreen.propTypes = {
    enableFullScreen:PropTypes.func.isRequired,
    disableFullScreen:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        isFullScreen:state.screen.isFullScreen
    }
}

export default connect(mapStateToProps,{enableFullScreen,disableFullScreen})(SwitchFullScreen)

