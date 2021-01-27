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

        const project = this.props.Project
        const createdBy=this.props.createdBy
        const myId = localStorage.getItem('user_id')
        const isMyProject = Boolean(createdBy===myId)
        const userPermission = Boolean(this.props.isAuthenticated && isMyProject)
        const participantList = this.props.participant_ids
        // Need to work on Backend!!!
        const isParticipant = (function(){return( participantList ? Boolean(participantList.includes(myId)) : false )})()
        const participantPermission = Boolean(userPermission || (this.props.isAuthenticated && isParticipant))

        return (
            <div>
                <span>Pinboard</span>
                {
                    Boolean(project) ? (
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
        createdBy:state.project.Project.created_user.id,
        participantList:state.project.Project.participant_ids
    }
}


export default connect(mapStateToProps,null)(Pinboard);
