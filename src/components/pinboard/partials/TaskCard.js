// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
import { updateTask, deleteTask } from "../../../actions/todoactions/taskActions";
import { getContainer } from "../../../actions/todoactions/containerActions";
// etc
import PropTypes from 'prop-types'
import { switchDisplay } from '../../../functions/switchDisplay';
// Components
import CTCInput from '../../../mixins/input/CTCInput'
import { selectColor } from '../../../functions/tailwindColorScheme';

function TaskCard(props) {

    const task = props.task
    const permission = props.permission
    const color = (function(){return(task.completed?"#9CA3AF":selectColor(props.colorScheme))})()

    const deleteTask = async () => {
        await props.deleteTask(task.id)
        props.getContainer(task.container_id)
    }

    const updateCompleted = async () => {
        const userId = localStorage.getItem('user_id')
        const currentState = task.completed
        const postData = {
            completed:!currentState,
            user_id:userId
        }
        await props.updateTask(postData,task.id)
        props.getContainer(task.container_id)
    }

    return (
        <div className="w-28 h-20 text-gray-900 flex flex-col justify-between items-center" style={{backgroundColor:color}}>
            <div className="w-full flex justify-center items-start"><button className="w-full fas fa-grip-lines-vertical"></button></div>
            <div className="w-full text-xl text-center">
                <CTCInput 
                id={task.id}
                name={task.name}
                permission={permission}
                dataType={"name"}
                action={props.updateTask}
                afterAction={props.getContainer}
                afterActionInput={task.container_id}
                />
            </div>
            <div className="flex justify-center items-center">
                <button className="far fa-times-circle text-lg" onClick={deleteTask}></button>
                <div className="relative">
                    <button className="fas fa-info-circle text-lg mx-px" onClick={switchDisplay}></button>
                    <div className="absolute w-full text-sm text-center bg-gray-200 rounded" style={{display:'none',minHeight:"20px"}}>
                        <CTCInput 
                        id={task.id}
                        name={task.description}
                        permission={permission}
                        dataType={"description"}
                        action={props.updateTask}
                        afterAction={props.getContainer}
                        afterActionInput={task.container_id}
                        />
                    </div>
                </div>
                <button className="far fa-check-circle text-lg" onClick={updateCompleted}></button>
            </div>
        </div>
    )
}

const actions = {updateTask,getContainer,deleteTask}

TaskCard.propTypes = {
    updateTask:PropTypes.func.isRequired,
    getContainer:PropTypes.func.isRequired,
    deleteTask:PropTypes.func.isRequired,
}

export default connect(null,actions)(TaskCard)

