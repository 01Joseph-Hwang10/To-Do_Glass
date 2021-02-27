import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { clearProject } from "../../actions/todoactions/projectActions";
import { clearContainer } from "../../actions/todoactions/containerActions";
import { connect } from 'react-redux';
import { openOverview } from '../../actions/screenActions';
import { loading, getProfile, getUserInfo, myProfile, notMyProfile } from '../../actions/useractions/userInfoActions';

function Avatar(props) {

    const user = props.user

    const id = (function(){return(props.id?props.id:user.id)})()

    // const OnClick = () => {
    //     props.clearProject()
    //     props.clearContainer()
    //     window.location.href = `/#/${id}/home`
    //     window.location.reload()
    // }

    return (
        <Link to={{pathname:`/${id}/home`}} 
        onClick={ async () => {
            if(props.screenSize < 640 ) props.openOverview()
            props.loading()
            if(Number(id)===Number(localStorage.getItem('user_id'))) {
                await props.getProfile(id)
                props.myProfile()
            } else {
                await props.getUserInfo(id)
                props.notMyProfile()
            }
        }}
        >
            <div className="w-full flex justify-center items-center">
                <div className='w-8 h-8 rounded-2xl bg-cover bg-center' style={{backgroundImage:`url("${user.avatar}")`}}></div>
                <div className="mx-2 text-sm"><span>{user.first_name}</span></div>
            </div>
        </Link>
    )
}

const actions = {clearProject,clearContainer,openOverview,loading,getProfile, getUserInfo, myProfile, notMyProfile}

Avatar.propTypes = {
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired,
    openOverview:PropTypes.func.isRequired,
    loading:PropTypes.func.isRequired,
    getProfile:PropTypes.func.isRequired,
    getUserInfo:PropTypes.func.isRequired,
    myProfile:PropTypes.func.isRequired,
    notMyProfile:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        screenSize: state.screen.screenSize
    }
}

export default connect(mapStateToProps,actions)(Avatar)

