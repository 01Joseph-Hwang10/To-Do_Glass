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
            <div>
                <div>
                    <CTCInput 
                    id={project.id}
                    name={project.name}
                    permission={permission}
                    dataType={"name"}
                    action={this.props.updateProject}
                    afterAction={this.props.getProfile}
                    />
                </div>
                {permission ? (
                    <>
                        <Avatar user={project.created_user} />
                        <HeaderMenu />
                    </>
                ) : (
                    <Avatar user={project.created_user} />
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

