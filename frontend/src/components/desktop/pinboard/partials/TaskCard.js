// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
import { updateTask, deleteTask } from "../../../../actions/todoactions/taskActions";
import { getContainer, getPrivateContainer } from "../../../../actions/todoactions/containerActions";
// etc
import PropTypes from 'prop-types'
// Components
import CTCInput from '../../../../mixins/input/CTCInput'
import { selectColor } from '../../../../functions/tailwindColorScheme';

function TaskCard(props) {

    const task = props.task
    const permission = props.permission
    const color = (function(){return(task.completed?"#9CA3AF":selectColor(props.colorScheme,task.id))})()
    const getContainer = (function(){return(props.isPrivate ? props.getPrivateContainer : props.getContainer)})()

    const deleteTask = async (e) => {
        const div = e.target.closest('.taskCard')
        const deleting = div.querySelector('.deleting')
        const contentBody = div.querySelector('.contentBody')
        deleting.style.display='flex'
        contentBody.style.display='none'
        await props.deleteTask(task.id)
        await getContainer(task.container_id)
    }

    const updateCompleted = async () => {
        const userId = localStorage.getItem('user_id')
        const currentState = task.completed
        const postData = {
            completed:!currentState,
            user_id:userId
        }
        await props.updateTask(postData,task.id)
        await getContainer(task.container_id)
    }

    const displayDescription = (e) => {
        const button = e.target
        const parentDiv = button.closest('.taskCard')
        const handle = parentDiv.querySelector('.handle')
        const name = parentDiv.querySelector('.contentBody')
        const buttons = parentDiv.querySelector('.buttons')
        const description = parentDiv.querySelector('.description')
        const backButton = description.querySelector('.description__backButton')
        handle.style.display = "none";
        name.style.display = "none";
        buttons.style.display = "none";
        description.style.display = "flex";
        document.addEventListener("click",(e)=>{
            if((e.target === backButton || backButton.contains(e.target)) && e.target !== button) {
                handle.style.display = "flex";
                name.style.display = "block";
                buttons.style.display = "flex";
                description.style.display = "none";
            }
        })
    }


    return (
        <div className="taskCard w-28 relative text-gray-900 flex flex-col justify-start items-center border-b-4" style={{backgroundColor:color}}>
            <div className="handle w-full justify-center items-start h-8" style={{display:'flex'}}>
                <span className="text-center fas fa-grip-lines-vertical text-xl"></span>
            </div>
            <div className="contentBody w-full text-xl text-center" style={{display:'block'}}>
                <CTCInput 
                key={['taskName',String(task.id)].join('')}
                id={task.id}
                name={task.name}
                permission={permission}
                dataType={"name"}
                action={props.updateTask}
                afterAction={getContainer}
                afterActionInput={task.container_id}
                placeholder={"Task"}
                />
            </div>
            <div className="deleting w-full text-xl text-center flex justify-center items-center" style={{display:'none'}}>
                <span className="font-semibold">Deleting...</span>
            </div>
            <div className="buttons justify-around items-center" style={{display:'flex'}}>
                {
                    permission ? (
                    <>
                        <button className="far fa-times-circle text-3xl" onClick={deleteTask}></button>
                        <button className="infoButton fas fa-info-circle text-3xl mx-px" onClick={displayDescription}></button>
                        <button className="far fa-check-circle text-3xl" onClick={updateCompleted}></button>
                    </>
                    ) : (
                        <button className="infoButton fas fa-info-circle text-2xl mx-px" onClick={displayDescription}></button>
                    )
                }
            </div>
            <div className="description w-full text-sm text-center bg-transparent rounded flex-col justify-start items-center" style={{display:'none'}}>
                <div className="description__backButton w-full flex justify-end items-center px-2 pt-2"><button className="fas fa-times"></button></div>
                <CTCInput 
                key={['taskDescription',String(task.id)].join('')}
                id={task.id}
                name={task.description || "No Description"}
                permission={permission}
                dataType={"description"}
                action={props.updateTask}
                afterAction={getContainer}
                afterActionInput={task.container_id}
                placeholder={"Task Description"}
                />
            </div>
        </div>
    )
}

const actions = {updateTask,getContainer,getPrivateContainer,deleteTask}

TaskCard.propTypes = {
    updateTask:PropTypes.func.isRequired,
    getContainer:PropTypes.func.isRequired,
    getPrivateContainer:PropTypes.func.isRequired,
    deleteTask:PropTypes.func.isRequired,
}

export default connect(null,actions)(TaskCard)


// Needa work on it later

// const displayDescription = (e) => {
//     const button = e.target
//     const div = e.target.parentNode
//     const description = div.childNodes[1]
//     if (description.style.display === "none") {
//         description.style.display = "block";
//     } else {
//         description.style.display = "none";
//     }
//     document.addEventListener("click",(e)=>{
//         if (e.target !== description && e.target !== button && !description.contains(e.target)) {
//             setTimeout(()=>{description.style.display = "none";},501)
//         }
//     });
//     const descriptionHeight = description.offsetHeight
//     const container = document.getElementById(["containerScroll",task.container_id].join(''))
//     const containerHeight = container.offsetHeight
//     const displayHeight = descriptionHeight+containerHeight
//     container.style.transition = "all 0.5s linear"
//     container.style.height = displayHeight + 'px'
//     document.addEventListener('click',(e)=>{
//         if(!container.contains(e.target) && e.target !== button && !e.target.classList.contains("infoButton") ) {
//             container.style.height = containerHeight + 'px'
//         }
//     })
// }
