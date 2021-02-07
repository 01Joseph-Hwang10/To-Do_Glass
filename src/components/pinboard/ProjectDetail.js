// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
import {updateProject, getProject} from '../../actions/todoactions/projectActions';
// etc
import { COLOR_FIFTH, COLOR_SECOND, COLOR_SIXTH, COLOR_THIRD } from '../../store/variables'
import PropTypes from 'prop-types'

function ProjectDetail(props) {

    const projectId = props.project.id
    const description = props.project.description || "No Description"

    
    const showForm = () => {
        const descriptionBody = document.getElementsByClassName("readElement")[0]
        const editButton = document.getElementsByClassName("readElement")[1]
        const input = document.getElementsByClassName("formElement")[0]
        const submit = document.getElementsByClassName("formElement")[1]
        const cancel = document.getElementsByClassName("formElement")[2]
        const div = descriptionBody.parentNode
        descriptionBody.style.display = "none"
        editButton.style.display = "none"
        input.style.display = "block"
        submit.style.display = "block"
        cancel.style.display = "block"
        div.style.backgroundColor = COLOR_THIRD
        div.style.transition = "all 0.3s ease-in-out"
        input.focus()
        const currentState = descriptionBody.childNodes[0].innerText
        input.value = currentState
    }

    const closeForm = () => {
        const descriptionBody = document.getElementsByClassName("readElement")[0]
        const editButton = document.getElementsByClassName("readElement")[1]
        const input = document.getElementsByClassName("formElement")[0]
        const submit = document.getElementsByClassName("formElement")[1]
        const cancel = document.getElementsByClassName("formElement")[2]
        const div = descriptionBody.parentNode
        descriptionBody.style.display = "block"
        editButton.style.display = "block"
        input.style.display = "none"
        submit.style.display = "none"
        cancel.style.display = "none"
        div.style.backgroundColor = COLOR_SECOND
        input.blur()
    }

    const submitForm = () => {
        const descriptionBody = document.getElementsByClassName("readElement")[0]
        const editButton = document.getElementsByClassName("readElement")[1]
        const input = document.getElementsByClassName("formElement")[0]
        const submit = document.getElementsByClassName("formElement")[1]
        const cancel = document.getElementsByClassName("formElement")[2]
        const div = descriptionBody.parentNode
        const post_data = {
            description:input.value,
            user_id:localStorage.getItem('user_id')
        }
        props.updateProject(post_data,projectId)
        // Make updateDescription and updateProjectName soon!!!
        props.getProject(projectId)
        descriptionBody.style.display = "block"
        editButton.style.display = "block"
        input.style.display = "none"
        submit.style.display = "none"
        cancel.style.display = "none"
        div.style.backgroundColor = COLOR_SECOND
        input.blur()
    }


    return (
        <div className="w-full">
            {props.permission ? (
                <div className="w-full">
                    <div className="w-full opacity-90 p-2 py-4 mb-1 rounded text-white shadow-inner" style={{backgroundColor:COLOR_SECOND,transition:"all 0.5s ease-in-out"}}>
                        <div className="readElement" style={{display:'block'}}><span className="outline-none border-none bg-transparent w-full resize-none">{description}</span></div>
                        <textarea className="formElement bg-transparent outline-none border-none w-full resize-none" style={{display:"none"}} placeholder="Write down the description below"></textarea>
                    </div>
                    <div className="w-full flex justify-end">
                        <button onClick={showForm} className="readElement px-3 py-1 rounded font-semibold" style={{display:'block',backgroundColor:COLOR_THIRD,color:COLOR_FIFTH}}>Edit</button>
                        <button onClick={submitForm} className="formElement px-3 py-1 rounded font-semibold mx-1" style={{display:'none',backgroundColor:COLOR_SIXTH}}>Save</button>
                        <button onClick={closeForm} className="formElement bg-gray-200 px-3 py-1 rounded font-semibold" style={{display:'none'}}>Cancel</button>
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
    getProject:PropTypes.func.isRequired
}

export default connect(null,{updateProject, getProject})(ProjectDetail)

