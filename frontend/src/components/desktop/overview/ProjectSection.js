// React
import React from 'react'
// Redux
import { connect } from 'react-redux';
import {getProject,clearProject,createProject, getPrivateProject} from '../../../actions/todoactions/projectActions';
import {clearContainer} from  '../../../actions/todoactions/containerActions';
import { getProfile } from "../../../actions/useractions/userInfoActions";
import { focusPinboard } from "../../../actions/screenActions";
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
        myProjects = Profile.get_my_projects
    }
    if(Profile && Profile.get_public_projects) {
        projectsCount = Number(Profile.get_public_projects.length)
        myProjects = Profile.get_public_projects
    }
    const userId = localStorage.getItem('user_id')

    const getProject = async (e) => {
        e.preventDefault();
        props.clearContainer()
        props.clearProject()
        const project_id = e.target.querySelector('.projectId').value;
        const isPrivate = e.target.querySelector('.isPrivate').value;
        if(isPrivate==='true') {
            await props.getPrivateProject(project_id)
        } else {
            await props.getProject(project_id);
        }
        if(props.screenSize < 1024 ) {
            props.focusPinboard()
        }
    };

    const createProject = async (e) => {
        e.preventDefault();
        const form = e.target
        const div = e.target.parentNode
        const loading = div.querySelector('i')
        loading.style.display = 'block'
        form.style.display = "none"

        const button = div.childNodes[0]
        const input = form.querySelector('input')
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
        button.style.display ="block"
        loading.style.display = 'none'
    }

    return (
        <div className="w-full">
            <div className="w-full flex flex-col justify-start">
                {
                    Profile && (Profile.get_my_projects || Profile.get_public_projects) ? (
                        <>
                        {
                            myProjects.map(project => {
                                return (
                                <form key={project.id} className="w-full" onSubmit={getProject}>
                                    <input className="projectId hidden" name="id" value={project.id} readOnly></input>
                                    <input className="isPrivate hidden" name="isPrivate" value={project.isPrivate} readOnly></input>
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
                                    <input required placeholder="Project" className="w-7/12 bg-transparent rounded border-b-2 border-gray-400 focus:border-gray-600" style={{transition:"all 0.5s ease-in-out"}}></input>
                                    <button className="px-2 my-1 rounded bg-gray-300 font-semibold">Create</button>
                                </form>
                                <i style={{display:'none'}} className="font-semibold">Loading...</i>
                            </div>
                            ) : (
                                <></>
                            )
                        }
                        </>
                    ) : (
                        <></>
                    )
                }
            </div>
        </div>
    )
}


const actions = {getProject,getPrivateProject,clearProject,clearContainer,getProfile,createProject,focusPinboard}


ProjectSection.propTypes = {
    getProject:PropTypes.func.isRequired,
    getPrivateProject:PropTypes.func.isRequired,
    getProfile:PropTypes.func.isRequired,
    createProject:PropTypes.func.isRequired,
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired,
    focusPinboard:PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        screenSize:state.screen.screenSize
    }
}

export default connect(mapStateToProps,actions)(ProjectSection);
