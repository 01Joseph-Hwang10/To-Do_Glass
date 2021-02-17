// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
import { updateContainer,getContainer } from "../../../actions/todoactions/containerActions";
// etc
import { COLOR_THIRD } from '../../../store/variables'
import PropTypes from 'prop-types'
// Components
import Important from '../../../mixins/Important'
import CTCInputShort from '../../../mixins/input/CTCInputShort';

function ContainerDetail(props) {

    const container = props.container
    const permission = props.permission

    const hideDetail = (e) => {
        const containerDetail = e.target.closest('.containerDetail')
        const div = containerDetail.parentNode
        div.style.borderWidth = '0px'
        div.style.borderColor = "#E5E7EB"
        div.style.borderRadius = '0'
        containerDetail.style.maxHeight = '0'
        containerDetail.style.borderBottomWidth = '0'
        containerDetail.style.opacity = 0
        containerDetail.style.zIndex = 0
        setTimeout(()=>{containerDetail.style.transition = 'max-height 0.5s ease, border-bottom-width 0.1s ease-in-out'},510)
    }

    const showForm = (e) => {
        const editButton = e.target
        const div = editButton.parentNode.parentNode
        const saveButton = div.getElementsByClassName('formElement')[1]
        const cancelButton = div.getElementsByClassName('formElement')[2]
        const span = div.getElementsByClassName('readElement')[0]
        const textarea = div.getElementsByClassName('formElement')[0]
        editButton.style.display = 'none'
        saveButton.style.display = 'block'
        cancelButton.style.display = 'block'
        span.style.display = 'none'
        textarea.style.display = 'block'
        div.style.backgroundColor = '#DBEAFE'
        textarea.focus()
    }

    const hideForm = (e) => {
        const button = e.target
        const div = button.parentNode.parentNode
        const editButton = div.getElementsByClassName('readElement')[1]
        const saveButton = div.getElementsByClassName('formElement')[1]
        const cancelButton = div.getElementsByClassName('formElement')[2]
        const span = div.getElementsByClassName('readElement')[0]
        const textarea = div.getElementsByClassName('formElement')[0]
        editButton.style.display = 'block'
        saveButton.style.display = 'none'
        cancelButton.style.display = 'none'
        span.style.display = 'block'
        textarea.style.display = 'none'
        div.style.backgroundColor = '#EFF6FF'
        textarea.blur()
    }

    const updateImportance = async () => {
        const currentState = container.importance
        const id = localStorage.getItem('user_id')
        const postData = {
            importance:!currentState,
            user_id:id
        }
        await props.updateContainer(postData,container.id)
        await props.getContainer(container.id)
    }

    const updateDescription = async (e) => {
        const button = e.target
        const div = button.parentNode.parentNode
        const textarea = div.getElementsByClassName('formElement')[0]
        const postData = {
            description:textarea.value,
            user_id:localStorage.getItem('user_id')
        }
        await props.updateContainer(postData,container.id)
        await props.getContainer(container.id)
        hideForm(e)
    }

    return (
        <div className="w-full flex flex-col justify-start items-center p-1">
            <div className='w-full flex justify-between items-center px-2 pt-1 text-xl'>
                <div className="flex justify-start items-center space-x-1">
                    {
                        permission ? (
                            <button onClick={updateImportance}>
                                <Important isImportant={container.importance} permission={permission} />
                            </button>
                        ) : (
                            <div>
                                <Important isImportant={container.importance} />
                            </div>
                        )
                    }
                    <div>
                        <CTCInputShort 
                        id={container.id}
                        name={container.name}
                        permission={permission}
                        dataType={'name'}
                        action={props.updateContainer}
                        afterAction={props.getContainer}
                        afterActionInput={container.id}
                        />
                    </div>
                </div>
                <div className="flex justify-end items-center space-x-1" style={{minWidth:'100px'}}>
                    {/* <button className="fas fa-cog"></button> */}
                    <button onClick={hideDetail} className="fas fa-times"></button>
                </div>
            </div>
            <div className="w-full px-2 pb-2 flex flex-col rounded" style={{transition:'all 0.2s ease-in-out',backgroundColor:'#EFF6FF'}}>
                <span className="readElement p-2 w-full" style={{display:'block'}}>{container.description}</span>
                <textarea defaultValue={container.description} className="formElement resize-none bg-transparent p-2 w-full outline-none" style={{display:'none'}}></textarea>
                <div className="w-full flex justify-start items-center px-2 mt-1 space-x-1">
                    <button onClick={showForm} className="readElement px-4 py-px text-white font-semibold rounded" style={{backgroundColor:COLOR_THIRD,display:'block'}}>Edit</button>
                    <button onClick={updateDescription} className="formElement px-4 py-px text-white font-semibold rounded bg-pink-300" style={{display:'none'}}>Save</button>
                    <button onClick={hideForm} className="formElement px-4 py-px text-white font-semibold rounded bg-gray-300" style={{display:'none'}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

ContainerDetail.propTypes = {
    updateContainer:PropTypes.func.isRequired,
    getContainer:PropTypes.func.isRequired,
}

export default connect(null,{updateContainer,getContainer})(ContainerDetail)

