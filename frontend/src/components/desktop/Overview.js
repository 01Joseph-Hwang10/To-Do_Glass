// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
import {getProfile, getUserInfo} from '../../actions/useractions/userInfoActions';
// etc
import PropTypes from 'prop-types';
// Components
import ProfileCard from './overview/ProfileCard';
import ProjectSection from './overview/ProjectSection';
import { COLOR_FIFTH, COLOR_FOURTH } from '../../store/variables';

class Overview extends Component {

    componentDidMount() {
        const user_id = Number(window.location.hash.replace(/\D/g,''))
        const my_id = Number(window.localStorage.getItem('user_id'))
        if(user_id===my_id){
            this.props.getProfile(user_id)
        } else {
            this.props.getUserInfo(user_id)
        }
    }

    render() {

        let isMyProfile = false;
        let Profile = this.props.Profile
        const user_id = Number(window.location.hash.replace(/\D/g,''))
        const my_id = Number(window.localStorage.getItem('user_id'))
        if(user_id===my_id) isMyProfile = true
        if(!isMyProfile && this.props.Storage) Profile = this.props.Storage.data

        return (
            <section className="w-full">
                {
                    Profile && Profile.get_my_projects ? (
                        <div className="w-full">
                            <div className="w-full flex justify-center items-center">
                                <ProfileCard 
                                Profile={Profile}
                                isMyProfile={isMyProfile}
                                />
                            </div>
                            <div className="w-full mt-2">
                                <ProjectSection Profile={Profile} isMyProfile={isMyProfile} />
                            </div>
                        </div>
                    ) : (
                        <div className="w-full">
                            <div className="w-full rounded" style={{backgroundColor:COLOR_FOURTH}}>
                                <div className="animate-pulse w-full flex flex-col justify-center items-center p-3" style={{height:"200px"}}>
                                    <div className="w-10 h-10 rounded-3xl m-3" style={{backgroundColor:COLOR_FIFTH}}></div>
                                    <div className="h-2 w-11/12 rounded m-1" style={{backgroundColor:COLOR_FIFTH}}></div>
                                    <div className="h-2 w-11/12 rounded m-1" style={{backgroundColor:COLOR_FIFTH}}></div>
                                    <div className="h-2 w-11/12 rounded m-1" style={{backgroundColor:COLOR_FIFTH}}></div>   
                                    <div className="h-7 w-10/12 rounded m-5" style={{backgroundColor:COLOR_FIFTH}}></div>
                                </div>
                            </div>
                            <div className="w-full">
                                <div className="w-full flex flex-col justify-between items-center mt-3">
                                        <div className="w-full rounded flex justify-start items-center mt-2 p-2" style={{backgroundColor:COLOR_FOURTH}}>
                                            <div className="animate-pulse h-3 w-9/12 rounded m-1" style={{backgroundColor:COLOR_FIFTH}}></div>
                                        </div>
                                        <div className="w-full rounded flex justify-start items-center mt-2 p-2" style={{backgroundColor:COLOR_FOURTH}}>
                                            <div className="animate-pulse h-3 w-9/12 rounded m-1" style={{backgroundColor:COLOR_FIFTH}}></div>
                                        </div>
                                        <div className="w-full rounded flex justify-start items-center mt-2 p-2" style={{backgroundColor:COLOR_FOURTH}}>
                                            <div className="animate-pulse h-3 w-9/12 rounded m-1" style={{backgroundColor:COLOR_FIFTH}}></div>
                                        </div>
                                        <div className="w-full rounded flex justify-start items-center mt-2 p-2" style={{backgroundColor:COLOR_FOURTH}}>
                                            <div className="animate-pulse h-3 w-9/12 rounded m-1" style={{backgroundColor:COLOR_FIFTH}}></div>
                                        </div>
                                    </div>
                                </div>
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
        Storage: state.userInfo.Storage,
        isMyProfile: state.userInfo.isMyProfile,
        isAuthenticated: state.login.isAuthenticated
    }
}

Overview.propTypes = {
    getProfile:PropTypes.func.isRequired,
    getUserInfo:PropTypes.func.isRequired,
}

export default connect(mapStateToProps,{getProfile,getUserInfo})(Overview);
