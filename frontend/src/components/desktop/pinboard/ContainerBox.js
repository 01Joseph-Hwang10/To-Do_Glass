// React
import React from 'react'
// Redux
import { connect } from 'react-redux';
import { createContainer } from "../../../actions/todoactions/containerActions";
import { getProject, getPrivateProject } from "../../../actions/todoactions/projectActions";
// modules
// import { DragDropContext } from "react-beautiful-dnd";
// etc
import { switchHidden } from '../../../functions/switchDisplay';
import { dictSortId } from '../../../functions/sortByOrder';
import PropTypes from 'prop-types'
// Components
import Container from './Container';

function ContainerBox(props) {

    const project = props.project
    const containers = props.container
    delete containers.created
    const container_ids = (function(){return(dictSortId(containers).length>0?dictSortId(containers).filter(Boolean):project.get_container_ids)})()
    const projectId = project.id
    const countContainers = Number(project.count_containers)
    const permission = props.permission

    const getProject = (function(){return(project.isPrivate?props.getPrivateProject:props.getProject)})()

    const OnSubmit = async (e) => {
        e.preventDefault()
        const div = e.target.parentNode
        const button = div.childNodes[0]
        const form = e.target
        const name = form.childNodes[0]
        const description = form.childNodes[1]
        const postData = {
            name:name.value,
            description:description.value || "",
            user_id:localStorage.getItem('user_id'),
            project_id:projectId,
            order:(countContainers+1)
        }
        await props.createContainer(postData)
        await getProject(projectId)
        name.value=""
        description.value=""
        button.style.display ="block"
        form.style.display ="none"
    }

    return (
        <div className="w-full">
            <div className="w-full border-b-2" style={{borderColor:"#E5E7EB"}}></div>
            {
                container_ids.map(container_id => {
                    let container;
                    if(containers[container_id]) {
                        container=containers[container_id]
                    }
                    return (
                        <Container 
                        key={container_id}
                        id={container_id} 
                        permission={permission}
                        container={container}
                        isPrivate={project.isPrivate}
                         />
                    )
                })
            }
            {
                permission ? (
                <div className="w-full border-b-2 flex justify-center items-center py-1">
                    <button className="w-full fas fa-plus-circle text-xl z-30" onClick={switchHidden} style={{display:'block'}}></button>
                    <form className="w-full px-2 flex justify-center items-center" onSubmit={OnSubmit} style={{display:'none'}}>
                        <input required className="w-3/12 mx-1 bg-transparent border-2 rounded focus:border-gray-600 z-30" style={{transition:"all 0.3s ease-in-out"}} placeholder="Scheme"></input>
                        <input className="w-6/12 mx-1 bg-transparent border-2 rounded focus:border-gray-600 z-30" style={{transition:"all 0.3s ease-in-out"}} placeholder="Scheme Description"></input>
                        <button className="w-2/12 mx-1 bg-gray-300 rounded py-px px-2 z-30">Create</button>
                    </form>
                </div>
                ) : (
                    <></>
                )
            }
        </div>
    )

}

ContainerBox.propTypes = {
    createContainer:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
    getPrivateProject:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        container:state.container
    }
}


export default connect(mapStateToProps,{createContainer,getProject,getPrivateProject})(ContainerBox);
