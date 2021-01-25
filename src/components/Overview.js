// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
import {getProfile} from '../actions/userInfoActions';
import {checkAuth} from '../actions/authActions';
// etc
import PropTypes from 'prop-types';
// Components
import ProfileCard from './overview/ProfileCard';
import ProjectSection from './overview/ProjectSection';

class Overview extends Component {

    componentWillMount() {
        this.props.getProfile()
    }

    render() {
        return (
            <section>
                {
                    this.props.Profile ? (
                        <div>
                            <span>Overview</span>
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
        isMyProfile: state.userInfo.isMyProfile,
        isAuthenticated: state.login.isAuthenticated
    }
}

Overview.propTypes = {
    getProfile:PropTypes.func.isRequired
}

export default connect(mapStateToProps,{getProfile,checkAuth})(Overview);
