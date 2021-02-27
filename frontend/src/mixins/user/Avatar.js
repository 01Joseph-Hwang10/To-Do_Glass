import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { clearProject } from "../../actions/todoactions/projectActions";
import { clearContainer } from "../../actions/todoactions/containerActions";
import { connect } from 'react-redux';
import { openOverview } from '../../actions/screenActions';
import { loading } from '../../actions/useractions/userInfoActions';

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
        // onClick={() => {
        //     props.loading()
        //     setTimeout(() => {
        //         window.location.reload()
        //     }, 50);
        // }}
        >
            <div className="w-full flex justify-center items-center">
                <div className='w-8 h-8 rounded-2xl bg-cover bg-center' style={{backgroundImage:`url("${user.avatar}")`}}></div>
                <div className="mx-2 text-sm"><span>{user.first_name}</span></div>
            </div>
        </Link>
    )
}

Avatar.propTypes = {
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired,
    openOverview:PropTypes.func.isRequired,
    loading:PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        screenSize: state.screen.screenSize
    }
}

export default connect(mapStateToProps,{clearProject,clearContainer,openOverview,loading})(Avatar)

