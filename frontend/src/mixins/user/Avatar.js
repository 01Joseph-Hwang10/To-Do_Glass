import React from 'react'
import { Link } from "react-router-dom";
import PropTypes from 'prop-types'
import { clearProject } from "../../actions/todoactions/projectActions";
import { clearContainer } from "../../actions/todoactions/containerActions";
import { connect } from 'react-redux';

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
        <Link to={{pathname:`/${id}/home`}} onClick={() => setTimeout(()=>window.location.reload(),50)}>
            <div className="w-full flex justify-center items-center">
                <div className='w-8 h-8 rounded-2xl bg-cover bg-center' style={{backgroundImage:`url("${user.avatar}")`}}></div>
                <div className="mx-2 text-sm"><span>{user.first_name}</span></div>
            </div>
        </Link>
    )
}

Avatar.propTypes = {
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired
}

export default connect(null,{clearProject,clearContainer})(Avatar)

