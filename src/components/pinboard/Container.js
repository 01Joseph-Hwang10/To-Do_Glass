// Reack
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
import { getContainer } from '../../actions/todoactions/containerActions';
import { createTask } from "../../actions/todoactions/taskActions";
// etc
import PropTypes from 'prop-types'
import {switchHidden} from '../../functions/switchDisplay';
import { selectColor, selectColorScheme } from '../../functions/tailwindColorScheme';
// Components
import TaskCard from './partials/TaskCard';
import HorizontalScroll from '../../mixins/scroll/HorizontalScroll';
import ContainerHeader from './ContainerHeader';
import { COLOR_FIRST } from '../../store/variables';


class Container extends Component {

    componentDidMount() {
        this.props.getContainer(this.props.id);
    }

    render() {

        let container,tasks,permission;
        container = this.props.container
        if(container) tasks = container.get_tasks
        if(container && !container.description) container.description =  "No Description"
        permission = this.props.permission

        const colorScheme = selectColorScheme()
        const color=selectColor(colorScheme)

        const createTask = (e) => {
            e.preventDefault()
            const form = e.target
            const input = form.childNodes[0]
            const order = Number(container.count_tasks) + 1
            const postData = {
                name:input.value,
                user_id:this.props.userId,
                container_id:container.id,
                order:order
            }
            this.props.createTask(postData)
            this.props.getContainer(container.id)
            input.value=""
        }

        return (
            <div className="w-full flex justify-start items-center bg-transparent border-b-2">
                {container ? (
                    <>
                    <div className="w-1/12 flex justify-center items-center">
                        <ContainerHeader container={container} permission={permission} />
                    </div>
                    <div className="w-11/12 flex flex-col justify-center items-center border-l-2">
                        <div className="w-full mx-2">
                            <HorizontalScroll card={
                                <>
                                {
                                tasks.map(task => {
                                    return (
                                        <div className="w-28 h-20 flex flex-col">
                                            <TaskCard 
                                            task={task}
                                            permission={permission}
                                            colorScheme={colorScheme}
                                            />
                                        </div>
                                        )
                                    })
                                }
                                {
                                    permission ? (
                                        <div className="w-28 h-20 flex justify-center items-center" style={{backgroundColor:color}}>
                                            <button className="fas fa-plus-circle text-2xl w-full h-full" style={{display:"block",color:COLOR_FIRST}} onClick={switchHidden}></button>
                                            <form className="w-28 h-20 text-gray-900 flex flex-col justify-around items-center p-1" style={{display:"none"}} onSubmit={createTask}>
                                                <input className="w-11/12 text-sm text-gray-700 rounded px-1 bg-transparent border-2" placeholder="Name"></input>   
                                                <button className="p-1 px-2 text-xs bg-gray-200 text-gray-700 font-semibold rounded">Create</button>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="w-1 h-20 my-3"></div>
                                    )
                                }
                                </>
                                }
                                />
                        </div>
                    </div>
                    </>
                ) : (
                    <div>
                        <span>Loading</span>
                    </div>
                )}
            </div>
        )
    }
}


Container.propTypes = {
    getContainer:PropTypes.func.isRequired,
    createTask:PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        userId:Number(state.userInfo.Profile.data.id)
    }
}


export default connect(mapStateToProps,{getContainer,createTask})(Container);
