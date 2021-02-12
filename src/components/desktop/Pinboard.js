// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'
// Components
import ContainerBox from './pinboard/ContainerBox';
import Header from './pinboard/Header';
import ProjectDetail from './pinboard/ProjectDetail';
import ProjectTags from './pinboard/ProjectTags';
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
                                <Scheme project={project} permission={participantPermission} />
                            </div>
                            <div className="px-5 pt-3 rounded">
                                <ProjectDetail project={project} permission={participantPermission} />
                            </div>
                            <div className="px-5 pb-3 rounded">
                                <ProjectTags project={project} permission={participantPermission} />
                            </div>
                            <div className="px-5 rounded">
                                <ContainerBox project={project} permission={participantPermission} />
                            </div>
                            <div className="w-1 h-10"></div>
                        </div>
                    ) : (
                        <div className="w-full bg-blue-50 rounded shadow-inner">
                            <div className="flex flex-col justify-start w-full animate-pulse p-5">
                                <div className="w-full flex justify-between items-center mt-2">
                                    <div className="w-5/12 h-10 rounded"></div>
                                    <div className="w-1/3 h-10 rounded"></div>
                                </div>
                                <div className="mt-10 w-full rounded-lg h-22"></div>
                                <div className="mt-5 w-full rounded-lg h-12"></div>
                                <div className="mt-3 w-7/12 rounded h-8"></div>
                                <div className="mt-5 w-full rounded h-20"></div>
                                <div className="mt-2 w-full rounded h-20"></div>
                                <div className="mt-2 w-full rounded h-20"></div>
                            </div>
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
