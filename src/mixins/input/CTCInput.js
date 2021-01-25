import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class CTCInput extends Component {

    render() {
        return (
            <>
            {this.props.permission ? (
                <button>{this.props.name}</button>
            ) : (
                <span>{this.props.name}</span>
            )}
            </>
        )
    }
}

// CTCInput.propTypes = {

// }

export default CTCInput;