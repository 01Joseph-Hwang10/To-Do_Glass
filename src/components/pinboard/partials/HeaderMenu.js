// React
import React from 'react'
// Redux
import { connect } from 'react-redux';
import { deleteProject } from "../../../actions/todoactions/projectActions";
import { getProfile } from "../../../actions/useractions/userInfoActions";
// etc
import PropTypes from 'prop-types'
// Components
import { switchDisplay } from '../../../functions/switchDisplay';

function headerMenu(props) {

    const projectId = props.projectId
    const userId = localStorage.getItem('user_id')

    const deleteProject = async e => {
        e.preventDefault()
        const isConfirmed = window.confirm("Continue to delete the project?\nThis action is not retreatable")
        if(isConfirmed) {
            await props.deleteProject(projectId)
            props.getProfile(userId)
        }
    }

    return (
        <div className="relative">
            <button className="fas fa-ellipsis-v text-2xl text-gray-600 p-2 ml-2" onClick={switchDisplay}></button>
            <div style={{display:'none'}} className='bg-white absolute rounded p-1 right-1 z-30'>
                <div className="w-full"><button onClick={deleteProject} className="w-full p-1">Delete</button></div>
                <div className="w-full border-t-2"><button className="w-full p-1">Private</button></div>
                <div className="w-full border-t-2"><button className="w-full p-1">Settings</button></div>
            </div>
        </div>
    )
}

headerMenu.propTypes = {
    deleteProject:PropTypes.func.isRequired,
    getProfile:PropTypes.func.isRequired
}

export default connect(null,{deleteProject,getProfile})(headerMenu);

