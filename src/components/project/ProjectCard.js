import React from 'react'

export default function ProjectCard(props) {
    return (
        <div>
            <span>{props.name}</span>
            <span>{props.order}</span>
            <span>{props.importance.toString()}</span>
            <span>{props.description}</span>
        </div>
    )
}
