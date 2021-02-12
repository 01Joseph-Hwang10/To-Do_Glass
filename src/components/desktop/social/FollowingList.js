import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserList from './partials/UserList'
import { getFollowing, clearFollowing } from "../../../actions/socialactions/followManageActions";

class FollowingList extends Component {

    componentDidMount() {
        this.props.clearFollowing()
    }

    render() {

        const followings = this.props.followings
        const followingId= this.props.followingId
        const permission = this.props.permission

        const update = () => {
            this.forceUpdate()
        }

        return (
            <div className="w-full">
                <UserList 
                items={followings}
                ids={followingId}
                permission={permission}
                action={this.props.getFollowing}
                update={update}
                />
            </div>
        )
    }
}

FollowingList.propTypes = {
    getFollowing:PropTypes.func.isRequired,
    clearFollowing:PropTypes.func.isRequired
}



export default connect(null,{getFollowing,clearFollowing})(FollowingList)
