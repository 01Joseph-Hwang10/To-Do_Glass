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
import { COLOR_FIRST } from '../../store/variables';
// Components
import TaskCard from './partials/TaskCard';
import HorizontalScroll from '../../mixins/scroll/HorizontalScroll';
import ContainerHeader from './ContainerHeader';


class Container extends Component {

    componentDidMount() {
        this.props.getContainer(this.props.id);
    }

    render() {

        let container,tasks,permission,userId;
        container = this.props.container
        if(container) tasks = container.get_tasks
        if(container && !container.description) container.description =  "No Description"
        if(this.props.Profile.data) userId = this.props.Profile.data.id
        permission = this.props.permission

        const colorScheme = selectColorScheme()
        const color=selectColor(colorScheme)

        const createTask = async (e) => {
            e.preventDefault()
            const form = e.target
            const div = e.target.parentNode
            const button = div.childNodes[0]
            const input = form.childNodes[0]
            const order = Number(container.count_tasks) + 1
            const postData = {
                name:input.value,
                user_id:userId,
                container_id:container.id,
                order:order
            }
            await this.props.createTask(postData)
            await this.props.getContainer(container.id)
            input.value=""
            form.style.display='none'
            button.style.display='block'
        }


        return (
            <div className="w-full flex justify-center items-center bg-transparent border-b-2" style={{height:"100%"}}>
                {container ? (
                    <>
                    <div className="w-1/12 flex justify-center items-start" style={{height:"100%"}}>
                        <ContainerHeader container={container} permission={permission} />
                    </div>
                    <div className="w-11/12 flex flex-col justify-start items-center border-l-2">
                        <div className="w-full mx-2">
                            <HorizontalScroll id={["containerScroll",container.id].join('')} card={
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
                                            <section className="w-28 h-20 flex justify-center items-center" style={{display:'block'}}><button className="w-28 h-20 fas fa-plus-circle text-2xl w-full h-full" style={{color:COLOR_FIRST}} onClick={switchHidden}></button></section>
                                            <form className="w-28 h-20 text-gray-900 flex flex-col justify-around items-center p-1" style={{display:"none"}} onSubmit={createTask}>
                                                <input required className="w-11/12 text-sm text-gray-700 rounded px-1 bg-transparent border-2" placeholder="Name"></input>   
                                                <button className="p-1 px-2 text-xs bg-gray-200 text-gray-700 font-semibold rounded">Create</button>
                                            </form>
                                        </div>
                                    ) : (
                                        <div className="w-1 h-20"></div>
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
        Profile:state.userInfo.Profile
    }
}


export default connect(mapStateToProps,{getContainer,createTask})(Container);
