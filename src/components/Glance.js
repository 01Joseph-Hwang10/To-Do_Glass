// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
import {getGlance} from '../actions/glanceActions';
// etc
import PropTypes from 'prop-types'
// components
import Search from './glance/Search';
import GlanceBox from './glance/GlanceBox';

class Glance extends Component {

    componentDidMount() {
        this.props.getGlance()
    }
    
    render() {

        return (
            <div className="w-full">
                <div className="w-full">
                    <Search />
                </div>
                <div className="w-full">
                    <GlanceBox />
                </div>
            </div>
        )
    }
}


Glance.propTypes = {
    getGlance:PropTypes.func.isRequired
}

export default connect(null,{getGlance})(Glance);
