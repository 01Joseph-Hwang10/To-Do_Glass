// Reack
import React, { useState } from 'react'
// Redux
import { connect } from 'react-redux';
import { getContainer, getPrivateContainer } from '../../../actions/todoactions/containerActions';
import { createTask, updateTask } from "../../../actions/todoactions/taskActions";
// modules
import { Draggable } from "react-beautiful-dnd";
// etc
import PropTypes from 'prop-types'
import {switchHidden} from '../../../functions/switchDisplay';
import { selectColor, selectColorScheme } from '../../../functions/tailwindColorScheme';
import { COLOR_FIRST } from '../../../store/variables';
import { sortByOrder } from '../../../functions/sortByOrder';
// Components
import TaskCard from './partials/TaskCard';
import HorizontalScroll from '../../../mixins/scroll/HorizontalScroll';
import ContainerHeader from './ContainerHeader';
import ContainerDetail from './ContainerDetail';
import useInterval from '../../../hooks/useInterval';


function Container(props) {

    const isPrivate = props.isPrivate
    const getContainer = (function(){return(isPrivate?props.getPrivateContainer:props.getContainer)})()

    let container=props.container;
    const [tasks,updateTasks] = useState((container&&container.get_tasks?container.get_tasks.sort(sortByOrder):[]))

    let shouldContinue = true
    useInterval(async() => {
        if(container&& container.get_tasks && shouldContinue) {
            updateTasks(container.get_tasks.sort(sortByOrder))
            shouldContinue = false
        }
        if(!container) {
            shouldContinue = true
            await getContainer(props.id)
            container = props.container
        }
    }, 100);
    
    const permission = props.permission

    if(container && !container.description) container.description =  "No Description"

    let userId;
    if(props.Profile.data) userId = props.Profile.data.id

    const colorScheme = selectColorScheme(props.id)
    const color=selectColor(colorScheme,props.id)

    const createTask = async (e) => {
        e.preventDefault()
        const form = e.target
        const div = e.target.parentNode
        const span = div.querySelector('span')
        form.style.display='none'
        span.style.display='block'

        const button = div.querySelector('section')
        const input = form.childNodes[0]
        const order = Number(container.count_tasks) + 1
        const postData = {
            name:input.value,
            user_id:userId,
            container_id:container.id,
            order:order
        }
        await props.createTask(postData)
        await getContainer(container.id)
        input.value=""
        span.style.display='none'
        button.style.display='block'
    }

    const handleOnDragEnd = async result => {
        if(!result.destination) return;
        let items = Array.from(tasks)
        let [reorderedItem] = items.splice(result.source.index,1);
        items.splice(result.destination.index,0,reorderedItem)
        updateTasks(items)
        let containerId;
        for (let i=0; i<items.length; i++) {
            if(Number(items[i].order) !== i+1) {
                items[i].order = i+1
                const id = items[i].id
                const postData = {
                    order:i+1,
                    user_id:localStorage.getItem('user_id')
                }
                containerId=items[i].container_id
                await props.updateTask(postData,id)
            }
        }
        await getContainer(containerId)
        updateTasks(items.sort(sortByOrder))
    }

    const onCreate = (e) => {
        const button = e.target.parentNode
        const form = button.parentNode.querySelector('form')

        const scrollerParentDiv = e.target.closest('.scrollerParentDiv')
        const rightButton = scrollerParentDiv.querySelector('.rightButton')
        rightButton.style.display = 'none'
        switchHidden(e)
        document.addEventListener('click',(e)=> {
            if (e.target !== form && !button.contains(e.target) && !form.contains(e.target)) {
                rightButton.style.display = 'block'
            }
        })
    }

    return (
        <div className="container w-full flex flex-col justify-center items-center bg-transparent h-full" style={{borderWidth:'0px',borderBottomWidth:'2px',borderColor:"#E5E7EB", transition:'all 0.1s ease-in-out',borderRadius:'0'}}>
            { container && tasks ? (
                <>
                <div className="containerDetail w-full flex flex-col" style={{opacity:0,height:'0',borderBottomWidth:'0',zIndex:0}}>
                    <ContainerDetail isPrivate={isPrivate} container={container} permission={permission} />
                </div>
                <div className="w-full flex justify-center items-center bg-transparent">
                    <section className="containerHeader flex justify-center items-center" style={{width:"8.4%",transition:"all 0.4s ease-in-out"}}>
                        <ContainerHeader container={container} permission={permission} />
                    </section>
                    <section className="containerBody flex flex-col justify-start items-center border-l-2" style={{width:"91.6%",transition:"all 0.4s ease-in-out"}}>
                        <div className="w-full mx-2 border-t-8 border-double border-gray-600">
                            <HorizontalScroll onDragEnd={handleOnDragEnd} card={
                                <>
                                {
                                tasks.map((task,index) => {
                                    return (
                                            permission ? (
                                            <Draggable key={['taskCard',task.id].join('')} draggableId={['taskCard',task.id].join('')} index={index}>
                                                {
                                                    (provided) => (
                                                    <div id={['taskCard',task.id].join('')} className="w-28 flex flex-col" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                        <TaskCard 
                                                        task={task}
                                                        permission={permission}
                                                        colorScheme={colorScheme}
                                                        />
                                                    </div>
                                                    )
                                                }
                                            </Draggable>
                                            ) : (
                                            <div id={['taskCard',task.id].join('')} className="w-28 flex flex-col">
                                                <TaskCard 
                                                task={task}
                                                permission={permission}
                                                colorScheme={colorScheme}
                                                />
                                            </div>
                                            )
                                        )
                                    })
                                }
                                {
                                    permission ? (
                                        <div className="createFormParentDiv w-28 flex justify-center items-center border-b-4" style={{backgroundColor:color,minHeight:'4.7rem'}}>
                                            <section className="w-28 flex justify-center items-center" style={{display:'block'}}><button className="w-28 fas fa-plus-circle text-2xl w-full h-full" style={{color:COLOR_FIRST}} onClick={onCreate}></button></section>
                                            <form className="w-28 text-gray-900 flex flex-col justify-around items-center p-1 space-y-2" style={{display:"none"}} onSubmit={createTask}>
                                                <input required className="w-11/12 text-sm text-gray-700 rounded px-1 bg-transparent border-2 focus:border-gray-400" placeholder="Name" style={{transition:"all 0.4s ease-in-out"}}></input>   
                                                <button className="p-1 px-2 text-xs bg-gray-200 text-gray-700 font-semibold rounded">Create</button>
                                            </form>
                                            <span className="font-semibold text-center" style={{display:'none'}}>Creating...</span>
                                        </div>
                                    ) : (
                                        <div className="w-1 h-20"></div>
                                    )
                                }
                                </>
                                }
                                />
                        </div>
                    </section>
                </div>
                </>
            ) : (
                <div className="relative container w-full flex flex-col justify-center items-center bg-transparent h-full p-2" style={{borderWidth:'0px',borderBottomWidth:'2px',borderColor:"#E5E7EB", transition:'all 0.1s ease-in-out',borderRadius:'0'}}>
                    <span className="absolute z-10 font-semibold text-2xl">Loading...</span>
                    <div className="w-full bg-gray-200 rounded-lg animate-pulse flex justify-center items-center py-12"></div>
                </div>
            )}
        </div>
    )
}


Container.propTypes = {
    getContainer:PropTypes.func.isRequired,
    getPrivateContainer:PropTypes.func.isRequired,
    createTask:PropTypes.func.isRequired,
    updateTask:PropTypes.func.isRequired,
}

const actions = {getContainer,getPrivateContainer,createTask,updateTask}

const mapStateToProps = state => {
    return {
        Profile:state.userInfo.Profile
    }
}


export default connect(mapStateToProps,actions)(Container);
