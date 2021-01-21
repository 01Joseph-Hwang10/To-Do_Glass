import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getProfile} from '../actions/getUserInfos';

class Overview extends Component {

    componentDidMount() {
        this.props.getProfile()
    }

    render() {
        return (
            <div>
                <h2>{this.props.Profile}</h2>
                <h1>{this.props.isMyProfile}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    Profile: state.userInfo.Profile.data,
    isMyProfile: state.userInfo.isMyProfile
})

export default connect(mapStateToProps,{getProfile})(Overview);
