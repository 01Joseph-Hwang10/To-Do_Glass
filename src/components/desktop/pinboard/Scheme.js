// React
import React, {useEffect, useState} from 'react'
// Redux
import { connect } from 'react-redux'
import {createContainer,getContainer,updateContainer} from '../../../actions/todoactions/containerActions';
import {getProject} from '../../../actions/todoactions/projectActions'
// modules
import { Draggable } from "react-beautiful-dnd";
// etc
import { COLOR_FIFTH, COLOR_FIRST, COLOR_SIXTH } from '../../../store/variables';
import PropTypes from 'prop-types'
import {switchHidden} from '../../../functions/switchDisplay'
import { sortByOrder } from '../../../functions/sortByOrder';
// Components
import SchemeCard from './partials/SchemeCard';
import HorizontalScroll from '../../../mixins/scroll/HorizontalScroll';

function Scheme(props) {

    const project = props.project
    let initialContainers
    try {
        initialContainers = props.container
        delete initialContainers.created
        initialContainers = Object.values(initialContainers).sort(sortByOrder)
    } catch (error) {
        initialContainers = project.get_containers.sort(sortByOrder)
    }
    const projectId = project.id
    const permission = props.permission
    const countContainers = Number(project.count_containers)

    const [containers, updateContainers] = useState(initialContainers)
    useEffect(()=>{
        updateContainers(initialContainers)
    // eslint-disable-next-line
    },[props.container])
    
    const handleOnDragEnd = async result => {
        if(!result.destination) return;
        let items = Array.from(containers)
        let [reorderedItem] = items.splice(result.source.index,1);
        items.splice(result.destination.index,0,reorderedItem)
        updateContainers(items)
        for (let i=0; i<items.length; i++) {
            if(items[i].order !== i+1) {
                items[i].order = i+1
                const id = items[i].id
                const postData = {
                    order:i+1,
                    user_id:localStorage.getItem('user_id')
                }
                await props.updateContainer(postData,id)
                await props.getContainer(id)
            }
        }
        updateContainers(items)
    }

    const OnSubmit = async (e) => {
        e.preventDefault()
        const form = e.target
        const formDiv = form.closest('.formDiv')
        const innerDiv = formDiv.querySelector('.formDiv__innerDiv')
        const creating = formDiv.querySelector('.formDiv__creating')
        innerDiv.style.display = 'none'
        creating.style.display = 'block'

        const button = innerDiv.childNodes[0]
        const input = form.childNodes[0]
        const post_data = {
            name:input.value,
            project_id:projectId,
            user_id:localStorage.getItem('user_id'),
            order:(countContainers+1),
        }
        await props.createContainer(post_data)
        await props.getProject(projectId)
        input.value=""
        input.blur()
        innerDiv.style.display = 'flex'
        creating.style.display = 'none'
        form.style.display = "none"
        button.style.display = "block"
    };


    return (
        <div className="w-full rounded shadow-inner py-3 bg-indigo-50" style={{minHeight:"120px"}}>
            <HorizontalScroll single={true} onDragEnd={handleOnDragEnd} card={
                <>
                <div className="w-1 h-1"><div className="w-1 h-1"></div></div>
                {
                    containers.map((container,index) => {
                        return (
                            permission ? (
                            <Draggable key={['schemeCard',container.id].join('')} draggableId={['schemeCard',container.id].join('')} index={index}>
                                {
                                    (provided) => (
                                    <div id={['schemeCard',container.id].join('')} className="w-40 h-32 mx-1 mr-3" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                        <SchemeCard 
                                        container={container}
                                        permission={permission}
                                        />
                                    </div>
                                    )
                                }
                            </Draggable>
                            ) : (
                            <div id={['schemeCard',container.id].join('')} className="w-40 h-32 mx-1 mr-3">
                                <SchemeCard 
                                container={container}
                                permission={permission}
                                />
                            </div>
                            )
                        )
                    })
                }
                {
                    permission ? (
                    <div className="w-40 h-32 mx-1">
                        <div className="formDiv flex flex-col justify-start items-center rounded shadow-lg w-40 h-32 mx-2 py-1" style={{backgroundColor:COLOR_SIXTH}}>
                            <div className="formDiv__innerDiv w-full h-full flex flex-col justify-center items-center" style={{display:'flex'}}>
                                <button className="fas fa-plus-circle text-3xl w-full h-full" style={{display:'block',color:COLOR_FIRST}} onClick={switchHidden}></button>
                                <form className="w-full h-full flex flex-col justify-around items-center" style={{display:'none'}} onSubmit={OnSubmit}>
                                    <input required placeholder="Name" className="w-11/12 rounded border-2 mb-1 text-sm focus:border-gray-600" style={{
                                        backgroundColor:COLOR_FIFTH,
                                        transition:"all 0.5s ease-in-out"
                                    }}></input>
                                    <button className="text-xs bg-pink-100 p-1 px-2 font-semibold rounded">Create</button>
                                </form>
                            </div>
                            <span className="formDiv__creating font-semibold text-center" style={{display:'none'}}>Creating...</span>
                        </div>
                    </div>
                    ) : (
                        <></>
                    )
                }
                <div className="w-5 h-1"><div className="w-5 h-1"></div></div>
                </>
            }/>
        </div>
    )
    
}

Scheme.propTypes = {
    createContainer:PropTypes.func.isRequired,
    updateContainer:PropTypes.func.isRequired,
    getContainer:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
}


const actions = {createContainer,updateContainer,getContainer,getProject}

const mapStateToProps = state => {
    return {
        createdId: state.container.created,
        container: state.container
    }
}


export default connect(mapStateToProps,actions)(Scheme);
