// React
import React from 'react'
// Redux
import { connect } from 'react-redux';
import {getProject,clearProject} from '../../actions/projectActions';
import {clearContainer} from  '../../actions/containerActions';
// etc
import PropTypes from 'prop-types';
// Component
import ProjectCard from './partials/ProjectCard';

function ProjectSection(props) {

    const myProjects = props.projects;

    const onSubmit = (e) => {
        e.preventDefault();
        const project_id = e.target.childNodes[0].value;
        props.clearProject();
        props.clearContainer();
        props.getProject(project_id);
    };

    return (
        <div className="w-full">
            <div className="w-full flex flex-col justify-start">
                {
                    myProjects.map(project => {
                        return (
                        <form className="w-full" onSubmit={onSubmit}>
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
            </div>
        </div>
    )
}

ProjectSection.propTypes = {
    getProject:PropTypes.func.isRequired,
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired
}

export default connect(null,{getProject,clearProject,clearContainer})(ProjectSection);
