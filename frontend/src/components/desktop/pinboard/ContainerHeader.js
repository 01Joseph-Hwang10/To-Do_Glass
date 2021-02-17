// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
import {updateContainer} from '../../../actions/todoactions/containerActions';
import {getProject} from '../../../actions/todoactions/projectActions';
// etc
import { COLOR_FIRST, COLOR_THIRD } from '../../../store/variables'
import PropTypes from 'prop-types'
// Components
import Important from '../../../mixins/Important'

function ContainerHeader(props) {

    const container = props.container
    const projectId = container.project
    const name = container.name
    const description = container.description
    const permission = props.permission
    const isFullScreen = props.isFullScreen

    const OnMouseOver = (e) => {
        const button = e.target
        const containerHeader = button.closest('.containerHeader')
        const div = containerHeader.parentNode
        const containerBody = div.querySelector('.containerBody')
        const chevron = containerHeader.querySelector('i')
        const detail = containerHeader.querySelector('section')
        detail.style.transition = 'all 0.1s ease-in-out 0.4s'
        containerHeader.style.transition = 'all 0.4s ease-in-out'
        containerBody.style.transition = 'all 0.4s ease-in-out'
        containerHeader.style.width = "30%"
        containerBody.style.width = "70%"
        chevron.style.opacity = '0'
        if(name.length < 33) {
            detail.style.fontSize = (isFullScreen ? "x-large" : "large")
            containerHeader.style.width = (isFullScreen ? "20%" : "30%")
            containerBody.style.width = (isFullScreen ? "80%" : "70%")
        }
        if(name.length >= 33 && name.length <66) detail.style.fontSize = (isFullScreen ? "large" : "small")
        if(name.length >= 66 && name.length <100) detail.style.fontSize = (isFullScreen ? "small" : "x-small")
        if(name.length >= 100) detail.style.fontSize = (isFullScreen ? "x-small" : "xx-small")
        detail.style.opacity = '1'
        document.addEventListener('mouseout',(e)=>{
            detail.style.transition = 'all 0.1s ease-in-out'
            containerHeader.style.transition = 'all 0.4s ease-in-out 0.1s'
            containerBody.style.transition = 'all 0.4s ease-in-out 0.1s'
            containerHeader.style.width = "8.4%"
            containerBody.style.width = "91.6%"
            chevron.style.opacity = '1'
            detail.style.fontSize = '0'
            detail.style.opacity = '0'
        })
    }

    const updateImportance = async () => {
        const currentState = container.importance
        const postData = {
            importance:!currentState,
            user_id:localStorage.getItem('user_id')
        }
        await props.updateContainer(postData,container.id)
        await props.getProject(projectId)
    }

    const openDetail = (e) => {
        const button = e.target
        const div = e.target.closest('.containerHeader').parentNode.parentNode
        div.style.borderWidth = '4px'
        div.style.borderColor = COLOR_THIRD
        div.style.borderRadius = '0.375rem'
        const containerDetail = div.querySelector('.containerDetail')
        containerDetail.style.transition = 'max-height 0.5s ease-in, opacity 0.4s ease-in-out, border-bottom-width 0.1s ease-in-out'
        if(name.length + description.length < 33) containerDetail.style.maxHeight = '200px'
        if(name.length + description.length >= 33 && name.length + description.length <66) containerDetail.style.maxHeight = '300px'
        if(name.length + description.length >= 66 && name.length + description.length <100) containerDetail.style.maxHeight = '400px'
        if(name.length + description.length >= 100) containerDetail.style.maxHeight = '500px'
        containerDetail.style.borderBottomWidth = '2px'
        containerDetail.style.opacity = 1
        containerDetail.style.zIndex = 20
        document.addEventListener('click', (e) => {
            if(!containerDetail.contains(e.target) && e.target !== button) {
                div.style.borderWidth = '0px'
                div.style.borderBottomWidth = '2px'
                div.style.borderColor = "#E5E7EB"
                div.style.borderRadius = '0'
                containerDetail.style.maxHeight = '0'
                containerDetail.style.borderBottomWidth = '0'
                containerDetail.style.opacity = 0
                containerDetail.style.zIndex = 0
                setTimeout(()=>{containerDetail.style.transition = 'max-height 0.5s linear, border-bottom-width 0.1s ease-in-out'},510)
            }
        })
    }
    
    return (
    <div className="w-full h-full flex justify-start items-center box-border relative" onMouseOver={OnMouseOver}>
        <div className="mx-2 h-full font-semibold text-center text-lg">{container.order}<i className="ml-1 fas fa-chevron-right" style={{opacity:'1',transition:'all 0.25s ease-in-out',color:COLOR_FIRST}}></i></div>
        <section className="flex flex-col w-9/12 justify-between items-center absolute left-8 space-y-1" style={{opacity:'0',transition:'all 0.1s ease-in-out 0.4s',fontSize:'0'}}>
            <div className="h-full w-full flex justify-start items-center">
                {
                    permission ? (
                    <button className="mr-1" onClick={updateImportance}>
                        <Important isImportant={container.importance} permission={permission} />
                    </button>
                    ) : (
                    <div className="mr-1">
                        <Important isImportant={container.importance} />
                    </div>
                    )
                }
                <div className="overflow-ellipsis font-semibold">{container.name}</div>
            </div>
            <div className="w-full flex justify-end"><button onClick={openDetail} className="text-lg text-white rounded px-3 z-10" style={{backgroundColor:COLOR_THIRD}}>Detail</button></div>
        </section>
    </div>
    )
}

ContainerHeader.propTypes = {
    updateContainer:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
}

const mapStateToProps = state => {
    return {
        isFullScreen:state.screen.isFullScreen
    }
}

export default connect(mapStateToProps,{updateContainer,getProject})(ContainerHeader)

