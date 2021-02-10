// React
import React, {useState,useEffect} from 'react'
// Redux
import { connect } from 'react-redux';
import { updateFollow } from "../../../actions/useractions/followAction";
// etc
import { COLOR_FIFTH, COLOR_FIRST, COLOR_THIRD } from '../../../store/variables';
import PropTypes from "prop-types";

function UserInteraction(props) {

    const profile = props.Profile
    const following = profile.following
    const id = Number(window.location.hash.replace(/\D/g,""))

    const [isFollowing, setIsFollowing] = useState(false)
    useEffect(()=>{
        if(following.includes(id)) {
            setIsFollowing(true)
        }
    // eslint-disable-next-line
    },[isFollowing])
    
    const innerText = (function(){return(isFollowing?"Following":"Follow")})()
    const bgColor = (function(){return(isFollowing?COLOR_FIFTH:COLOR_THIRD)})()
    const color = (function(){return(isFollowing?COLOR_FIRST:"white")})()

    const switchFollow = async () => {
        const userId = profile.id || localStorage.getItem('user_id')
        const postData = {
            id:userId,
            following:id,
            data:!isFollowing,
            user_id:userId
        }
        await props.updateFollow(postData,userId)
        setIsFollowing(!isFollowing)
    }

    return (
        <div className="w-full flex justify-center items-center">
            <button onClick={switchFollow} className="w-8/12 px-2 rounded font-semibold" style={{backgroundColor:bgColor,height:"30px",color:color}}>{innerText}</button>
            <button className="fas fa-ellipsis-h rounded p-1 ml-1" style={{backgroundColor:COLOR_FIFTH,height:"30px"}}></button>
        </div>
    )
}


UserInteraction.propTypes = {
    updateFollow: PropTypes.func.isRequired
}


const mapStateToProps = state => {
    return {
        Profile:state.userInfo.Profile.data,
        Storage:state.userInfo.Storage.data
    }
}

export default connect(mapStateToProps,{updateFollow})(UserInteraction);