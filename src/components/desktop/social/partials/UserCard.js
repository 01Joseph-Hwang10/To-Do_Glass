import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateFollow } from "../../../../actions/useractions/followAction";
import Avatar from '../../../../mixins/user/Avatar'
import { COLOR_FIFTH, COLOR_FIRST, COLOR_THIRD } from '../../../../store/variables'
import { updateFollowing } from '../../../../actions/socialactions/followManageActions';

class UserCard extends Component {

    state = {
        following:false
    }

    componentDidMount() {
        const id = this.props.id
        const followings = this.props.following
        if(followings.includes(id)) this.setState({following:true})
        this.props.action(id)
    }


    render() {

        const item = this.props.item
        const permission = this.props.permission

        const update = setInterval(()=>{
            if(!item) {
                this.props.update()
            } else {
                clearInterval(update)
            }
        },100)

        const isFollowing = this.state.following

        let bgColor = (function(){return(isFollowing?COLOR_FIFTH:COLOR_THIRD)})()
        let color = (function(){return(isFollowing?COLOR_FIRST:COLOR_FIFTH)})()
        let innerText = (function(){return(isFollowing?"Following":"Follow")})()

        const switchFollow = async () => {
            const userId = localStorage.getItem('user_id')
            const postData = {
                id:userId,
                following:this.props.id,
                data:!isFollowing,
                user_id:userId
            }
            await this.props.updateFollow(postData,userId)
            this.props.updateFollowing(this.props.id,!isFollowing)
            this.setState({following:!isFollowing})
            if(this.state.following) {
                bgColor = COLOR_FIFTH
                color = COLOR_FIRST
                innerText = "Following"
            } else {
                bgColor = COLOR_THIRD
                color = COLOR_FIFTH
                innerText = "Follow"
            }
        }

        return (
            <div className="w-full p-2">
                {
                    item ? (
                        <>
                        {
                            permission ? (
                                <div className="w-full flex justify-between items-center p-2 border-2 rounded border-gray-400">
                                    <div><Avatar user={item} /></div>
                                    <div><button onClick={switchFollow} className="py-1 px-2 font-semibold rounded" style={{backgroundColor:bgColor,color:color}}>{innerText}</button></div>
                                </div>
                            ) : (
                                <div className="w-full flex justify-start items-center">
                                    <Avatar user={item} />
                                </div>
                            )
                        }
                        </>
                    ) : (
                        <div>Loading</div>
                    )
                }
            </div>
        )
    }
}

UserCard.propTypes = {
    updateFollow:PropTypes.func.isRequired,
    updateFollowing:PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        following:state.userInfo.Profile.data.following
    }
}



export default connect(mapStateToProps,{updateFollow,updateFollowing})(UserCard)
