// React
import React from 'react'
// Redux
import { connect } from 'react-redux';
import {getProject,clearProject} from '../../actions/getProject';
// Component
import ProjectCard from './ProjectCard';

function ProjectSection(props) {

    const myProjects = props.projects;

    const onSubmit = (e) => {
        e.preventDefault();
        const project_id = e.target.childNodes[0].value;
        props.clearProject();
        props.getProject(project_id);
    };

    return (
        <div>
            <div>
                <span>Projects</span>
            </div>
            <div>
                {
                    myProjects.map(project => {
                        return (
                        <form onSubmit={onSubmit}>
                            <input className="hidden" value={project.id} readOnly></input>
                            <button>
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

export default connect(null,{getProject,clearProject})(ProjectSection);
