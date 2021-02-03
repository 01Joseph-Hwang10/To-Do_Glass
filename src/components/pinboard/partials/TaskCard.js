// React
import React from 'react'
// Redux
import { connect } from 'react-redux'
import { updateTask, deleteTask } from "../../../actions/todoactions/taskActions";
import { getContainer } from "../../../actions/todoactions/containerActions";
// etc
import PropTypes from 'prop-types'
// Components
import CTCInput from '../../../mixins/input/CTCInput'
import { selectColor } from '../../../functions/tailwindColorScheme';

function TaskCard(props) {

    const task = props.task
    const permission = props.permission
    const color = selectColor(props.colorScheme)

    const deleteTask = async () => {
        await props.deleteTask(task.id)
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
                <button className="fas fa-info-circle text-lg mx-px"></button>
                <button className="far fa-check-circle text-lg"></button>
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

