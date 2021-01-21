import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getProfile} from '../actions/getUserInfos';

class ProfileCard extends Component {

    componentDidMount() {
        this.props.getProfile()
    }

    render() {
        return (
            <div>
                <h2>{this.props.Profile.first_name}</h2>
                <div className="w-10 h-10 bg-center bg-cover" style={{backgroundImage:`url("${this.props.Profile.avatar}")`}}></div>
                <h1>{this.props.isMyProfile.toString()}</h1>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        Profile: state.userInfo.Profile.data,
        isMyProfile: state.userInfo.isMyProfile
    }
}

export default connect(mapStateToProps,{getProfile})(ProfileCard);
