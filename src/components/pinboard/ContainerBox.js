// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
import { createContainer } from "../../actions/todoactions/containerActions";
import { getProject } from "../../actions/todoactions/projectActions";
// etc
import { switchHidden } from '../../functions/switchDisplay';
import { dictSortByOrder } from '../../functions/sortByOrder';
import PropTypes from 'prop-types'
// Components
import Container from './Container';

class ContainerBox extends Component {
    
    render() {

        const project = this.props.project
        const containers = this.props.container
        delete containers.created
        console.log(Object.keys(dictSortByOrder(containers)))
        const container_ids = (function(){return(Object.keys(dictSortByOrder(containers)).length>0?Object.keys(containers):project.get_container_ids)})()
        const projectId = project.id
        const countContainers = Number(project.count_containers)
        const permission = this.props.permission

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
            await this.props.createContainer(postData)
            await this.props.getProject(projectId)
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
                            id={container_id} 
                            permission={permission}
                            container={container}
                             />
                        )
                    })
                }
                {
                    permission ? (
                    <div className="w-full border-b-2 flex justify-center items-center py-1">
                        <button className="w-full fas fa-plus-circle text-xl" onClick={switchHidden} style={{display:'block'}}></button>
                        <form className="w-full px-2 flex justify-center items-center" onSubmit={OnSubmit} style={{display:'none'}}>
                            <input required className="w-3/12 mx-1 bg-transparent border-2 rounded focus:border-gray-600" style={{transition:"all 0.3s ease-in-out"}} placeholder="Name"></input>
                            <input className="w-6/12 mx-1 bg-transparent border-2 rounded focus:border-gray-600" style={{transition:"all 0.3s ease-in-out"}} placeholder="Description"></input>
                            <button className="w-2/12 mx-1 bg-gray-300 rounded py-px px-2">Create</button>
                        </form>
                    </div>
                    ) : (
                        <></>
                    )
                }
            </div>
        )
    }
}

ContainerBox.propTypes = {
    createContainer:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        container:state.container
    }
}


export default connect(mapStateToProps,{createContainer,getProject})(ContainerBox);
