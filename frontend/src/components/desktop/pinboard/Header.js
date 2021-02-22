// React
import React from 'react'
// Redux
import { connect } from 'react-redux';
import {updateProject} from '../../../actions/todoactions/projectActions';
import {getProfile} from '../../../actions/useractions/userInfoActions';
// etc
import PropTypes from 'prop-types'
import SwitchFullScreen from './partials/SwitchFullScreen';
// Components
import HeaderMenu from './partials/HeaderMenu';
import Avatar from '../../../mixins/user/Avatar';
import Important from "../../../mixins/Important";
import CTCInputShort from '../../../mixins/input/CTCInputShort';

function Header(props) {

    const project = props.project
    const permission = props.permission
    const isPrivate = project.isPrivate

    const updateImportance = async () => {
        const userId = localStorage.getItem('user_id')
        const currentState = project.importance
        const postData = {
            importance:!currentState,
            user_id:userId
        }
        await props.updateProject(postData,project.id)
        await props.getProfile(userId)
    }

    return (
        <div className="w-full flex justify-between px-3">
            <div className="flex-grow flex justify-start items-center ml-1">
                {
                    isPrivate ? (
                        <div className="mr-1"><i className="fas fa-lock"></i></div>
                    ) : (
                        <></>
                    )
                }
                {
                    permission ? (
                    <button className="mr-1 py-1 pr-1" onClick={updateImportance}>
                        <Important isImportant={project.importance} permission={permission} />
                    </button>
                    ) : (
                    <div className="mr-1 py-1 pr-1">
                        <Important isImportant={project.importance} />
                    </div>
                    )
                }
                <div className="text-xl">
                    <CTCInputShort 
                    id={project.id}
                    name={project.name}
                    permission={permission}
                    dataType={"name"}
                    action={props.updateProject}
                    afterAction={props.getProfile}
                    afterActionInput={localStorage.getItem('user_id')}
                    textAlign={"left"}
                    />
                </div>
            </div>
            {permission ? (
                <div className="w-5/12 flex justify-end items-center">
                    <div className="border p-2 border-blue-50 rounded bg-blue-100 mr-3"><Avatar user={project.created_user} /></div>
                    <SwitchFullScreen />
                    <HeaderMenu
                    isPrivate={isPrivate} 
                    projectId={project.id} 
                    />
                </div>
            ) : (
                <div className="w-5/12 flex justify-end items-center">
                    <div className="border p-2 border-blue-50 rounded bg-blue-100 mr-3"><Avatar user={project.created_user} /></div>
                    <SwitchFullScreen />
                </div>
            )}
        </div>
    )

}

Header.propTypes = {
    updateProject:PropTypes.func.isRequired,
    getProfile:PropTypes.func.isRequired
}

export default connect(null,{updateProject,getProfile})(Header);

