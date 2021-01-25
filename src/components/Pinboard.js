// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'
import Header from './pinboard/Header';

class Pinboard extends Component {

    render() {

        const project = this.props.Project;
        const userPermission = Boolean(this.props.isAuthenticated && this.props.isMyProfile)
        // eslint-disable-next-line
        const participantPermission = Boolean(userPermission || (this.props.isAuthenticated && this.props.isParticipant))

        return (
            <div>
                <span>Pinboard</span>
                {
                    project.url ? (
                        <div>
                            <Header project={project} permission={userPermission} />
                        </div>
                    ) : (
                        <div>
                            <span>Loading</span>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        Project:state.project.Project,
        isAuthenticated:state.login.isAuthenticated,
        isMyProfile:state.userInfo.isMyProfile,
        isParticipant:state.permission.isParticipant
    }
}


export default connect(mapStateToProps,null)(Pinboard);
