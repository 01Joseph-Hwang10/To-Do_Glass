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
                            name={project.name}
                            order={project.order}
                            importance={project.importance}
                            description={project.description}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProjectSection;
