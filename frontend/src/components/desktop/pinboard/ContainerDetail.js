// React
import React from 'react'
// import {useState, useEffect} from 'react'
// Redux
import { connect } from 'react-redux'
import { updateContainer,getContainer, getPrivateContainer } from "../../../actions/todoactions/containerActions";
// etc
import { COLOR_THIRD } from '../../../store/variables'
import PropTypes from 'prop-types'
// Components
import Important from '../../../mixins/Important'
import CTCInputShort from '../../../mixins/input/CTCInputShort';

function ContainerDetail(props) {

    const container = props.container
    const permission = props.permission
    const isPrivate = props.isPrivate
    const containerDescriptionClassName = ['containerDescription',String(container.id)].join('')
    const containerNameClassName = ['containerName',String(container.id)].join('')
    const screenSize = props.screenSize

    const getContainer = (function(){return(isPrivate?props.getPrivateContainer:props.getContainer)})()

    let description = container.description || "No Description"

    // const [description, setDescription] = useState(container.description)
    // useEffect(() => {
    //     setDescription(container.description)
    //     console.log("repeat?")
    // }, [description, container.description])

    const hideDetail = (e) => {
        const containerDetail = e.target.closest('.containerDetail')
        const div = containerDetail.parentNode
        div.style.borderWidth = '0px'
        div.style.borderColor = "#E5E7EB"
        div.style.borderRadius = '0'
        containerDetail.style.height = '0'
        containerDetail.style.borderBottomWidth = '0'
        containerDetail.style.opacity = 0
        containerDetail.style.zIndex = 0
        setTimeout(()=>{containerDetail.style.transition = 'height 0.5s ease-in-out, border-bottom-width 0.1s ease-in-out'},510)

        if(screenSize < 640) {
            const buttonClassNameMobile = ['.containerDetailOpenerMobile',String(container.id)].join('')

            const containerHeader = div.querySelector('.containerHeaderMobile')
            const containerDetailOpener = containerHeader.querySelector(buttonClassNameMobile)
            const containerDetailHeader = containerHeader.querySelector('.containerDetailHeader')

            containerDetailOpener.style.opacity = 1
            containerDetailHeader.style.opacity = 1
        }
    }

    const showForm = (e) => {
        const editButton = e.target
        const div = editButton.closest('.descriptionParentDiv')
        const saveButton = div.querySelector('.saveButton')
        const cancelButton = div.querySelector('.cancelButton')
        const textarea = div.querySelector('textarea')
        editButton.style.display = 'none'
        saveButton.style.display = 'block'
        cancelButton.style.display = 'block'
        textarea.removeAttribute('readonly')
        div.style.backgroundColor = '#DBEAFE'
        textarea.focus()
        description = textarea.value
    }

    const hideForm = (e) => {
        const button = e.target
        const div = button.closest('.descriptionParentDiv')
        const editButton = div.querySelector('.editButton')
        const saveButton = div.querySelector('.saveButton')
        const cancelButton = div.querySelector('.cancelButton')
        const textarea = div.querySelector('textarea')
        editButton.style.display = 'block'
        saveButton.style.display = 'none'
        cancelButton.style.display = 'none'
        textarea.readOnly = 'true'
        div.style.backgroundColor = '#EFF6FF'
        textarea.value = description
        textarea.style.height = '1px'
        textarea.style.height = (12+textarea.scrollHeight) +'px'
        const containerDetail = textarea.closest('.containerDetail')
        const namearea = containerDetail.querySelector(`.${containerNameClassName}`)
        containerDetail.style.height = '1px'
        containerDetail.style.height = (60+textarea.scrollHeight+namearea.offsetHeight) +'px'
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
        await getContainer(container.id)
    }

    const updateDescription = async (e) => {
        const button = e.target
        const div = button.closest('.descriptionParentDiv')
        const textarea = div.querySelector('textarea')
        const postData = {
            description:textarea.value,
            user_id:localStorage.getItem('user_id')
        }
        // setDescription(textarea.value)
        await props.updateContainer(postData,container.id)
        // await getContainer(container.id)
        description = textarea.value
        const containerDetail = textarea.closest('.containerDetail')
        const namearea = containerDetail.querySelector(`.${containerNameClassName}`)
        containerDetail.style.height = '1px'
        containerDetail.style.height = (60+textarea.scrollHeight+namearea.offsetHeight) +'px'
        hideForm(e)
    }

    const resize = (e) => {
        const textarea = e.target
        textarea.style.height = '1px'
        textarea.style.height = (12+textarea.scrollHeight) +'px'

        const containerDetail = textarea.closest('.containerDetail')
        const namearea = containerDetail.querySelector(`.${containerNameClassName}`)
        containerDetail.style.height = '1px'
        containerDetail.style.height = (60+textarea.scrollHeight+namearea.offsetHeight) +'px'
    }

    return (
        <div className="w-full flex flex-col justify-start items-center p-1">
            <div className='w-full flex justify-between items-center px-2 pt-1 text-xl'>
                <div className="flex justify-start items-center space-x-1">
                    {
                        permission ? (
                            <>
                            <button onClick={updateImportance}>
                                <Important isImportant={container.importance} permission={permission} />
                            </button>
                            <div className={containerNameClassName}>
                                <CTCInputShort 
                                id={container.id}
                                name={container.name}
                                permission={permission}
                                dataType={'name'}
                                action={props.updateContainer}
                                // afterAction={getContainer}
                                // afterActionInput={container.id}
                                placeholder={'Scheme Name'}
                                />
                            </div>
                            </>
                        ) : (
                            <>
                            <div>
                                <Important isImportant={container.importance} />
                            </div>
                            <div className={containerNameClassName}>
                                <span className="font-semibold">{container.name}</span>
                            </div>
                            </>
                        )
                    }
                </div>
                <div className="flex justify-end items-center space-x-1" style={{minWidth:'100px'}}>
                    {/* <button className="fas fa-cog"></button> */}
                    <button onClick={hideDetail} className="fas fa-times"></button>
                </div>
            </div>
            <div className="descriptionParentDiv w-full px-2 pb-2 flex flex-col rounded" style={{transition:'all 0.2s ease-in-out',backgroundColor:'#EFF6FF'}}>
                <textarea readOnly placeholder="Scheme Description" defaultValue={description} onKeyDownCapture={resize} onKeyUp={resize} className={["resize-none bg-transparent p-2 w-full outline-none",containerDescriptionClassName].join(' ')}></textarea>
                {
                    permission ? (
                    <div className="w-full flex justify-start items-center px-2 mt-1 space-x-1">
                        <button onClick={showForm} className="editButton px-4 py-px text-white font-semibold rounded" style={{backgroundColor:COLOR_THIRD,display:'block'}}>Edit</button>
                        <button onClick={updateDescription} className="saveButton px-4 py-px text-white font-semibold rounded bg-pink-300" style={{display:'none'}}>Save</button>
                        <button onClick={hideForm} className="cancelButton px-4 py-px text-white font-semibold rounded bg-gray-300" style={{display:'none'}}>Cancel</button>
                    </div>
                    ) : (<></>)
                }
            </div>
        </div>
    )
}

ContainerDetail.propTypes = {
    updateContainer:PropTypes.func.isRequired,
    getContainer:PropTypes.func.isRequired,
    getPrivateContainer:PropTypes.func.isRequired,
}

export default connect(null,{updateContainer,getContainer,getPrivateContainer})(ContainerDetail)

