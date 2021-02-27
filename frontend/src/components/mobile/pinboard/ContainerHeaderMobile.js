// React
import React from 'react'
import PropTypes from 'prop-types'
// Redux
import { connect } from 'react-redux';
import { getContainer, getPrivateContainer, updateContainer } from "../../../actions/todoactions/containerActions";
// etc
import { COLOR_FIRST, COLOR_THIRD } from "../../../store/variables";
// Components
import Important from "../../../mixins/Important";
import CTCInputShort from "../../../mixins/input/CTCInputShort";

function ContainerHeaderMobile(props) {

    const container = props.container
    const permission = props.permission
    const isPrivate = props.isPrivate
    const getContainer = (function(){return(isPrivate?props.getPrivateContainer:props.getContainer)})()
    const buttonClassName = ['containerDetailOpener',String(container.id)].join('')
    const buttonClassNameMobile = ['containerDetailOpenerMobile',String(container.id)].join('')

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

    const openDetail = (e) => {
        const button = e.target
        button.style.opacity = 0

        const div = e.target.closest('.container')
        div.style.borderWidth = '4px'
        div.style.borderColor = COLOR_THIRD
        div.style.borderRadius = '0.375rem'

        const containerDetail = div.querySelector('.containerDetail')
        containerDetail.style.transition = 'height 0.5s ease-in-out, opacity 0.4s ease-in-out, border-bottom-width 0.1s ease-in-out'
        // if(name.length + description.length < 33) containerDetail.style.maxHeight = '200px'
        // if(name.length + description.length >= 33 && name.length + description.length <66) containerDetail.style.maxHeight = '300px'
        // if(name.length + description.length >= 66 && name.length + description.length <100) containerDetail.style.maxHeight = '400px'
        // if(name.length + description.length >= 100) containerDetail.style.maxHeight = '500px'
        containerDetail.style.borderBottomWidth = '2px'
        containerDetail.style.opacity = 1
        containerDetail.style.zIndex = 20

        const textarea = containerDetail.querySelector('textarea')
        const namearea = containerDetail.querySelector(`.${['containerName',String(container.id)].join('')}`)
        textarea.style.height = '1px'
        textarea.style.height = (12+textarea.scrollHeight) +'px'

        // containerDetail.style.maxHeight = '1px'
        // containerDetail.style.maxHeight = (textarea.scrollHeight + 90) +'px'
        containerDetail.style.height = '1px'
        containerDetail.style.height = (60+textarea.scrollHeight+namearea.offsetHeight) +'px'

        const containerDetailHeader = div.querySelector('.containerDetailHeader')
        containerDetailHeader.style.opacity = 0

        document.addEventListener('click', (e) => {
            if(!containerDetail.contains(e.target) && !(e.target.classList.contains(buttonClassName) || e.target.classList.contains(buttonClassNameMobile))) {
                button.style.opacity = 1
                div.style.borderWidth = '0px'
                div.style.borderBottomWidth = '2px'
                div.style.borderColor = "#E5E7EB"
                div.style.borderRadius = '0'
                containerDetail.style.height = '0'
                containerDetail.style.borderBottomWidth = '0'
                containerDetail.style.opacity = 0
                containerDetail.style.zIndex = 0
                containerDetailHeader.style.opacity = 1
                setTimeout(()=>{containerDetail.style.transition = 'height 0.5s ease-in-out, border-bottom-width 0.1s ease-in-out'},510)
            }
        })
    }

    return (
    <div className="flex justify-between items-center px-1 pr-3 w-full rounded-t" style={{backgroundColor:props.color}}>
        <div className="containerDetailHeader flex justify-start items-center rounded" style={{opacity:1,transition:'opacity 0.25s ease-in-out'}}>
            {
                permission ? (
                <button className="mr-1 z-30" onClick={updateImportance}>
                    <Important isImportant={container.importance} permission={permission} />
                </button>
                ) : (
                <div className="mr-1">
                    <Important isImportant={container.importance} />
                </div>
                )
            }
            <div className="font-semibold z-30">
                <CTCInputShort 
                id={container.id}
                name={container.name}
                permission={permission}
                dataType={'name'}
                action={props.updateContainer}
                afterAction={getContainer}
                afterActionInput={container.id}
                />
            </div>
        </div>
        <button onClick={openDetail} className={['text-center text-2xl fas fa-chevron-down z-30',buttonClassNameMobile].join(' ')} style={{color:COLOR_FIRST, opacity:1, transition:'all 0.25s ease-in-out'}}></button>
    </div>
    )
}

const actions = {getContainer, getPrivateContainer, updateContainer}

ContainerHeaderMobile.propTypes = {
    getContainer:PropTypes.func.isRequired,
    getPrivateContainer:PropTypes.func.isRequired,
    updateContainer:PropTypes.func.isRequired,
}

export default connect(null,actions)(ContainerHeaderMobile)

