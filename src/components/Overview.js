// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
import {getProfile} from '../actions/getUserInfos';
import {checkAuth} from '../actions/authActions';
// Components
import ProfileCard from './profile/ProfileCard';
import ProjectSection from './project/ProjectSection';

class Overview extends Component {

    componentWillMount() {
        this.props.getProfile()
        this.props.checkAuth()
    }

    render() {
        return (
            <section>
                {
                    this.props.Profile ? (
                        <div>
                            <div>
                                <ProfileCard 
                                Profile={this.props.Profile}
                                isMyProfile={this.props.isMyProfile}
                                />
                            </div>
                            <div>
                                <ProjectSection projects={this.props.Profile.get_my_projects} />
                            </div>
                        </div>
                    ) : (
                        <div>
                            <span>Loading</span>
                        </div>
                    )
                }
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        Profile: state.userInfo.Profile.data,
        isMyProfile: state.userInfo.isMyProfile
    }
}

export default connect(mapStateToProps,{getProfile,checkAuth})(Overview);
