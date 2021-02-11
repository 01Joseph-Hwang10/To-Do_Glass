import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import UserList from './partials/UserList'
import { getFollower, clearFollower } from "../../actions/socialactions/followManageActions";

class FollowerList extends Component {

    componentDidMount() {
        this.props.clearFollower()
    }

    render() {

        const followers = this.props.followers
        const followersId= this.props.followersId
        const permission = this.props.permission

        const update = () => {
            this.forceUpdate()
        }

        return (
            <div className="w-full">
                <UserList 
                items={followers}
                ids={followersId}
                permission={permission}
                action={this.props.getFollower}
                update={update}
                />
            </div>
        )
    }
}

FollowerList.propTypes = {
    getFollower:PropTypes.func.isRequired,
    clearFollower:PropTypes.func.isRequired
}


export default connect(null,{getFollower,clearFollower})(FollowerList)
