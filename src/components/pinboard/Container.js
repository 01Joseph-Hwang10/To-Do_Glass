import React, { Component } from 'react'
import { connect } from 'react-redux';
import { getContainer } from '../../actions/containerActions';
import PropTypes from 'prop-types'


class Container extends Component {

    componentDidMount() {
        this.props.getContainer(this.props.id);
    }
    
    render() {

        return (
            <div>
                {false ? (
                    <div>
                        <span></span>
                    </div>
                ) : (
                    <div>
                        <span>Loading</span>
                    </div>
                )}
            </div>
        )
    }
}


Container.propTypes = {
    getContainer:PropTypes.func.isRequired
}


export default connect(null,{getContainer})(Container);
