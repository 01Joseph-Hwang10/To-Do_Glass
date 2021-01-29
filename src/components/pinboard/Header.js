import React from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import CTCInput from '../../mixins/input/CTCInput';
import {updateProject} from '../../actions/projectActions';
import {getProfile} from '../../actions/userInfoActions';
import HeaderMenu from './partials/HeaderMenu';
import Avatar from '../../mixins/user/Avatar';

class Header extends React.Component {


    render() {
        const project = this.props.project
        const permission = this.props.permission

        return (
            <div className="w-full flex justify-between px-3">
                <div className="w-5/12 flex justify-start items-center ml-1">
                    <div className="text-xl">
                        <CTCInput 
                        id={project.id}
                        name={project.name}
                        permission={permission}
                        dataType={"name"}
                        action={this.props.updateProject}
                        afterAction={this.props.getProfile}
                        textAlign={"left"}
                        />
                    </div>
                </div>
                {permission ? (
                    <div className="w-5/12 flex justify-end items-center">
                        <div className="border p-2 border-blue-50 rounded bg-blue-100 mr-5"><Avatar user={project.created_user} /></div>
                        <HeaderMenu />
                    </div>
                ) : (
                    <div className="w-5/12 flex justify-end items-center">
                        <Avatar user={project.created_user} />
                    </div>
                )}
            </div>
        )
    }

}

Header.propTypes = {
    updateProject:PropTypes.func.isRequired,
    getProfile:PropTypes.func.isRequired
}

export default connect(null,{updateProject,getProfile})(Header);

