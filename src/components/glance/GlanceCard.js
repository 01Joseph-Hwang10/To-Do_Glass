import React from 'react'
import { connect } from 'react-redux'
import {getProject,clearProject} from '../../actions/projectActions';
import {clearContainer} from '../../actions/containerActions';
import Avatar from '../../mixins/user/Avatar'
import { COLOR_SEVENTH } from '../../store/variables'
import PropTypes from 'prop-types'

function GlanceCard(props) {

    const glance = props.glance

    const OnSubmit = (e) => {
        e.preventDefault()
        const form = e.target
        const input = form.childNodes[0]
        const project_id=input.value
        this.props.clearProject()
        this.props.clearContainer()
        this.props.getProject(project_id)
    }

    return (
        <div className="w-full rounded shadow-md flex flex-col p-2 mt-3" style={{backgroundColor:COLOR_SEVENTH}}>
            <div className="w-full flex justify-between items-center">
                <div>
                    <form className="w-full" onSubmit={OnSubmit}>
                        <input className="hidden" value={glance.id} readOnly></input>
                        <button className="w-full"><span className="font-semibold underline text-blue-500">{glance.name}</span></button>
                    </form>    
                </div>
                <div>
                    <Avatar user={glance.created_user}/>
                </div>
            </div>
        </div>
    )
}

GlanceCard.propTypes = {
    getProject:PropTypes.func.isRequired,
    clearProject:PropTypes.func.isRequired,
    clearContainer:PropTypes.func.isRequired,
}

const actions = {
    getProject,
    clearProject,
    clearContainer
}

export default connect(null,actions)(GlanceCard)


