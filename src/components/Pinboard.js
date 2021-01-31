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
        const createdBy= (function(){return(project.created_user ? project.created_user.id : null)})()
        const myId = localStorage.getItem('user_id')
        const isMyProject = Boolean(Number(createdBy)===Number(myId))
        const userPermission = Boolean(this.props.isAuthenticated && isMyProject)
        const participantList = this.props.participant_ids
        // Need to work on Backend!!!
        const isParticipant = (function(){return( participantList ? Boolean(participantList.includes(myId)) : false )})()
        const participantPermission = Boolean(userPermission || (this.props.isAuthenticated && isParticipant))

        return (
            <div className="w-full">
                {
                    Boolean(project.url) ? (
                        <div className="w-full bg-blue-50 rounded shadow-inner">
                            <div className="p-3 rounded-t bg-gradient-to-b from-blue-100 to-blue-50">
                                <Header project={project} permission={userPermission} />
                            </div>
                            <div className="px-5 pt-5 rounded">
                                <Scheme project={project} permission={participantPermission}/>
                            </div>
                            <div className="px-5 py-3 rounded">
                                <ProjectDetail project={project} permission={participantPermission} />
                            </div>
                            <div className="px-5 rounded">
                                <ContainerBox project={project} permission={participantPermission}/>
                            </div>
                            <div className="w-1 h-10"></div>
                        </div>
                    ) : (
                        <div className="flex justify-center items-center w-full bg-gray-100 rounded shadow-inner" style={{height:"500px"}}>
                            <span>No Projects are opened</span>
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
        participantList:state.project.Project.participant_ids
    }
}


export default connect(mapStateToProps,null)(Pinboard);
