// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'
// Components
import ContainerBox from './pinboard/ContainerBox';
import Header from './pinboard/Header';
import ProjectDetail from './pinboard/ProjectDetail';
import Scheme from './pinboard/Scheme';

class Pinboard extends Component {

    render() {

        const project = this.props.Project;
        const userPermission = Boolean(this.props.isAuthenticated && this.props.isMyProfile)
        const participantPermission = Boolean(userPermission || (this.props.isAuthenticated && this.props.isParticipant))

        return (
            <div>
                <span>Pinboard</span>
                {
                    project.url ? (
                        <div>
                            <div>
                                <Header project={project} permission={userPermission} />
                            </div>
                            <div>
                                <Scheme project={project} permission={participantPermission}/>
                            </div>
                            <div>
                                <ProjectDetail project={project} permission={participantPermission} />
                            </div>
                            <div>
                                <ContainerBox project={project} permission={participantPermission}/>
                            </div>
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
