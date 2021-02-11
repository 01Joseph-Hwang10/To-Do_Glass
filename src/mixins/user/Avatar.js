import React from 'react'
import PropTypes from 'prop-types'
import { clearProject } from "../../actions/todoactions/projectActions";
import { clearContainer } from "../../actions/todoactions/containerActions";
import { connect } from 'react-redux';

function Avatar(props) {

    const user = props.user

    const OnClick = () => {
        props.clearProject()
        props.clearContainer()
        window.location.href = `/#/${user.id}/home`
        window.location.reload()
    }

    return (
        <button className="w-full" onClick={OnClick}>
            <div className="flex justify-center items-center">
                <div className='w-8 h-8 rounded-2xl bg-cover bg-center' style={{backgroundImage:`url("${user.avatar}")`}}></div>
                <div className="mx-2 text-sm"><span>{user.first_name}</span></div>
            </div>
        </button>
    )
}

Avatar.propTypes = {
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired
}

export default connect(null,{clearProject,clearContainer})(Avatar)

