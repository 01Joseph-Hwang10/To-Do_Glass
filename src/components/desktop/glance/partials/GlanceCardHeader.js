import React from 'react'
import { connect } from 'react-redux'
import {getProject,clearProject} from '../../../../actions/todoactions/projectActions';
import {clearContainer} from '../../../../actions/todoactions/containerActions';
import Avatar from '../../../../mixins/user/Avatar'
import PropTypes from 'prop-types'
import { COLOR_FOURTH } from '../../../../store/variables';

function GlanceCardHeader(props) {

    const glance = props.glance

    const OnSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const input = form.childNodes[0]
        const project_id=input.value
        props.clearProject()
        props.clearContainer()
        props.getProject(project_id)
    }

    return (
        <div className="w-full flex justify-between items-center">
            <div>
                <form className="w-full" onSubmit={OnSubmit}>
                    <input className="hidden" value={glance.id} readOnly></input>
                    <button className="w-full"><span className="font-semibold underline text-blue-500 text-lg">{glance.name}</span></button>
                </form>    
            </div>
            <div className="rounded p-1 px-2" style={{backgroundColor:COLOR_FOURTH}}>
                <Avatar user={glance.created_user}/>
            </div>
        </div>
    )
}

GlanceCardHeader.propTypes = {
    getProject:PropTypes.func.isRequired,
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired,
}

const actions = {
    getProject,
    clearProject,
    clearContainer
}

export default connect(null,actions)(GlanceCardHeader)