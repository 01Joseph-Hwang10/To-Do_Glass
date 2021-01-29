import React from 'react'
import Important from '../../../mixins/Important'
import { COLOR_FOURTH } from '../../../store/variables'

export default function ProjectCard(props) {

    return (
        <div className="w-full p-1 px-2 mt-2 rounded flex justify-between" style={{backgroundColor:COLOR_FOURTH}}>
            <div><span className="xl:text-lg font-semibold underline text-blue-600">{props.name}</span></div>
            <div><Important isImportant={props.importance} /></div>
        </div>
    )
}
