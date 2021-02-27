// React
import React, { Component } from 'react'
import {Link} from 'react-router-dom'
// Redux
import { connect } from 'react-redux'
import { getFollower } from "../../actions/socialactions/followManageActions";
// etc
import PropTypes from 'prop-types'
import { COLOR_FIFTH, COLOR_FIRST, COLOR_FOURTH, COLOR_SECOND } from '../../store/variables';
import { scrollToTop } from "../../functions/scrollFunctions";
// Components
import FollowingList from './social/FollowingList';
import FollowerList from './social/FollowerList';

class Social extends Component {

    state = {
        following:true
    }

    componentDidMount() {
        scrollToTop()
    }

    
    render() {

        const profile = this.props.Profile
        const permission = Boolean(this.props.isAuthenticated && this.props.isMyProfile)
        const {following} = this.state

        let followersId, followingId, followers, followings;
        if(profile && profile.data) {
            followingId=profile.data.following
            followersId=profile.data.followers
        }

        if(this.props.followers && this.props.followings) {
            followers = this.props.followers
            followings = this.props.followings
        }

        const switchFollowing = (e) => {
            const button = e.target
            const currentState = button.innerText
            switch (currentState) {
                case "Following":
                    if(!following) {
                        this.setState({following:true})
                    }
                    break
                case "Followers":
                    if(following) {
                        this.setState({following:false})
                    }
                    break
                default:
                    // pass
            }
        }

        return (
            <div className="flex flex-col rounded-lg p-3 w-full sm:w-1/2 2xl:w-1/3 mx-auto space-y-2 sm:mt-28" style={{backgroundColor:COLOR_FOURTH}}>
                <div className="flex justify-center items-center rounded-lg rounded-b-none border-2" style={{backgroundColor:COLOR_FIFTH}}>
                    <button onClick={switchFollowing} className="w-1/2 border-r py-2 rounded-lg rounded-b-none rounded-r-none font-semibold" style={{backgroundColor:(function(){return(following?COLOR_SECOND:"transparent")})(),color:(function(){return(following?"white":"black")})()}}>Following</button>
                    <button onClick={switchFollowing} className="w-1/2 border-l py-2 rounded-lg rounded-b-none rounded-l-none font-semibold" style={{backgroundColor:(function(){return(following?"transparent":COLOR_SECOND)})(),color:(function(){return(following?"black":"white")})()}}>Followers</button>
                </div>
                {
                    this.state.following ? (
                        <FollowingList followings={followings} followingId={followingId} permission={permission} />
                    ) : (
                        <FollowerList followers={followers} followersId={followersId} permission={permission} />
                    )
                }
                <Link to={{pathname:`/${profile.data.id || localStorage.getItem('user_id')}/home`}}>
                    <div className="w-11/12 text-center py-1 font-semibold rounded bg-gray-300 mx-auto mt-2" style={{color:COLOR_FIRST}}>Back to Home</div>
                </Link>
            </div>
        )
    }
}

Social.propTypes = {
    getFollower:PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        Profile:state.userInfo.Profile,
        isMyProfile:state.userInfo.isMyProfile,
        isAuthenticated:state.login.isAuthenticated,
        followers:state.follow.followers,
        followings:state.follow.followings
    }
}

export default connect(mapStateToProps,{getFollower})(Social)
