// React
import React from 'react'
// Redux
import { connect } from 'react-redux';
import {getProject,clearProject,createProject} from '../../../actions/todoactions/projectActions';
import {clearContainer} from  '../../../actions/todoactions/containerActions';
import { getProfile } from "../../../actions/useractions/userInfoActions";
// etc
import PropTypes from 'prop-types';
import { switchHidden } from "../../../functions/switchDisplay";
// Component
import ProjectCard from './partials/ProjectCard';
import { COLOR_FIRST, COLOR_FOURTH } from '../../../store/variables';

function ProjectSection(props) {

    const Profile = props.Profile
    const isMyProfile = props.isMyProfile
    let projectsCount = 0, myProjects=[];
    if(Profile && Profile.get_my_projects) {
        projectsCount = Number(Profile.get_my_projects.length)
        myProjects = props.projects
    }
    const userId = localStorage.getItem('user_id')

    const getProject = async (e) => {
        e.preventDefault();
        props.clearContainer()
        props.clearProject()
        const project_id = e.target.childNodes[0].value;
        await props.getProject(project_id);
    };

    const createProject = async (e) => {
        e.preventDefault();
        const form = e.target
        const div = e.target.parentNode
        const button = div.childNodes[0]
        const input = form.childNodes[0]
        const postData = {
            name:input.value,
            user_id:userId,
            order:projectsCount+1
        }
        const id = await props.createProject(postData)
        props.clearProject();
        props.clearContainer();
        await props.getProject(id)
        await props.getProfile(userId)
        input.value = ""
        form.style.display = "none"
        button.style.display ="block"
    }

    return (
        <div className="w-full">
            <div className="w-full flex flex-col justify-start">
                {
                    myProjects.map(project => {
                        return (
                        <form key={project.id} className="w-full" onSubmit={getProject}>
                            <input className="hidden" value={project.id} readOnly></input>
                            <button className="w-full">
                                <ProjectCard 
                                {...project}
                                />
                            </button>
                        </form>
                        )
                    })
                }
                {
                    isMyProfile ? (
                    <div className="w-full flex justify-center items-center py-px rounded my-2" style={{backgroundColor:COLOR_FOURTH}}>
                        <button onClick={switchHidden} className="w-full fas fa-plus-circle text-lg" style={{color:COLOR_FIRST,display:'block'}}></button>
                        <form className="flex justify-around items-center" style={{display:'none'}} onSubmit={createProject}>
                            <input required placeholder="Name" className="w-7/12 bg-transparent rounded border-b-2 border-gray-400 focus:border-gray-600" style={{transition:"all 0.5s ease-in-out"}}></input>
                            <button className="px-2 my-1 rounded bg-gray-300 font-semibold">Create</button>
                        </form>
                    </div>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}


const actions = {getProject,clearProject,clearContainer,getProfile,createProject}


ProjectSection.propTypes = {
    getProject:PropTypes.func.isRequired,
    getProfile:PropTypes.func.isRequired,
    createProject:PropTypes.func.isRequired,
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired
}

export default connect(null,actions)(ProjectSection);
