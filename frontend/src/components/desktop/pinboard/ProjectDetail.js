// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
import {updateProject, getProject,updateDescription} from '../../../actions/todoactions/projectActions';
// etc
import { COLOR_FIFTH, COLOR_SECOND, COLOR_SIXTH, COLOR_THIRD } from '../../../store/variables'
import PropTypes from 'prop-types'

function ProjectDetail(props) {

    const projectId = props.project.id
    const description = props.project.description || "No Description"
    const projectDetailClassName = ['projectDetail',String(projectId)].join('')
    
    const showForm = (e) => {
        const editButton = e.target
        const buttonDiv = editButton.parentNode
        const saveButton = buttonDiv.querySelector('.submitForm')
        const cancelButton = buttonDiv.querySelector('.closeForm')
        const parentDiv = buttonDiv.closest('.projectDetail')
        const textArea = parentDiv.querySelector('textarea')
        const textAreaDiv = textArea.parentNode
        textArea.removeAttribute('readonly')
        saveButton.style.display = "block"
        cancelButton.style.display = "block"
        editButton.style.display = "none"
        textAreaDiv.style.backgroundColor = COLOR_THIRD
        textArea.focus()
    }

    const closeForm = (e) => {
        const cancelButton = e.target
        const buttonDiv = cancelButton.parentNode
        const saveButton = buttonDiv.querySelector('.submitForm')
        const editButton = buttonDiv.querySelector('.showForm')
        const parentDiv = buttonDiv.closest('.projectDetail')
        const textArea = parentDiv.querySelector('textarea')
        const textAreaDiv = textArea.parentNode
        textArea.readOnly = "true"
        saveButton.style.display = "none"
        cancelButton.style.display = "none"
        editButton.style.display = "block"
        textAreaDiv.style.backgroundColor = COLOR_SECOND
        textArea.blur()
    }

    const submitForm = async (e) => {
        const saveButton = e.target
        const buttonDiv = saveButton.parentNode
        const editButton = buttonDiv.querySelector('.showForm')
        const cancelButton = buttonDiv.querySelector('.closeForm')
        const parentDiv = buttonDiv.closest('.projectDetail')
        const textArea = parentDiv.querySelector('textarea')
        const textAreaDiv = textArea.parentNode
        const postData = {
            description:textArea.value,
            user_id:localStorage.getItem('user_id')
        }
        await props.updateDescription(postData,projectId)
        textArea.readOnly = "true"
        saveButton.style.display = "none"
        cancelButton.style.display = "none"
        editButton.style.display = "block"
        textAreaDiv.style.backgroundColor = COLOR_SECOND
        textArea.blur()
    }

    const resize = (e) => {
        const textarea = e.target
        textarea.style.height = '1px'
        textarea.style.height = (12+textarea.scrollHeight) +'px'
    }

    let initialResize = setInterval(() => {
        if(document.querySelector(`.${projectDetailClassName}`)) {
            const textarea = document.querySelector(`.${projectDetailClassName}`)
            textarea.style.height = '1px'
            textarea.style.height = (12+textarea.scrollHeight) +'px'
            clearInterval(initialResize)
        }
    }, 100);

    return (
        <div className="projectDetail w-full pb-2">
            {props.permission ? (
                <div className="w-full">
                    <div className="w-full opacity-90 p-2 py-4 mb-1 rounded text-white shadow-inner" style={{backgroundColor:COLOR_SECOND,transition:"all 0.5s ease-in-out"}}>
                        <textarea onKeyUp={resize} onKeyDown={resize} defaultValue={description} className={["textArea bg-transparent outline-none border-none w-full resize-none whitespace-pre-line",projectDetailClassName].join(' ')} readOnly placeholder="Project Description"></textarea>
                    </div>
                    <div className="w-full flex justify-end">
                        <button onClick={showForm} className="showForm px-3 py-1 rounded font-semibold" style={{display:'block',backgroundColor:COLOR_THIRD,color:COLOR_FIFTH}}>Edit</button>
                        <button onClick={submitForm} className="submitForm px-3 py-1 rounded font-semibold mx-1" style={{display:'none',backgroundColor:COLOR_SIXTH}}>Save</button>
                        <button onClick={closeForm} className="closeForm bg-gray-200 px-3 py-1 rounded font-semibold" style={{display:'none'}}>Cancel</button>
                    </div>
                </div>
            ) : (
                <div className="w-full">
                    <div className="w-full opacity-90 p-2 rounded text-white shadow-inner" style={{backgroundColor:COLOR_SECOND}}>
                        <span>{description}</span>
                    </div>
                </div>
            )}
        </div>
    )
}

ProjectDetail.propTypes = {
    updateProject:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
    updateDescription:PropTypes.func.isRequired
}

export default connect(null,{updateProject, getProject,updateDescription})(ProjectDetail)

