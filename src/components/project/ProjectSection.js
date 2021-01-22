import React from 'react'
import ProjectCard from './ProjectCard';

function ProjectSection(props) {

    const myProjects = props.projects;

    return (
        <div>
            <div>
                <span>Projects</span>
            </div>
            <div>
                {
                    myProjects.map(project => {
                        return (
                            <ProjectCard 
                            {...project}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProjectSection;
