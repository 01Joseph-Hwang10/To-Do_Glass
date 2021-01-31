// Reack
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
import { getContainer } from '../../actions/containerActions';
// etc
import PropTypes from 'prop-types'
// Components
import TaskCard from './partials/TaskCard';
import HorizontalScroll from '../../mixins/scroll/HorizontalScroll';
import ContainerHeader from './ContainerHeader';
import { COLOR_FIFTH, COLOR_THIRD } from '../../store/variables';


class Container extends Component {

    componentDidMount() {
        this.props.getContainer(this.props.id);
    }

    
    render() {

        let container,tasks,permission,description;
        container = this.props.container
        if(container) tasks = container.get_tasks
        if(container) description = container.description || "No Description"
        permission = this.props.permission

        return (
            <div className="w-full shadow-md flex justify-start items-center rounded mb-3 bg-indigo-100">
                {container ? (
                    <>
                    <div className="w-1/12 flex flex-col justify-center items-center bg-pink-100 h-full">
                        <button className="fas fa-grip-lines"></button>
                    </div>
                    <div className="w-11/12 flex flex-col justify-center items-center p-2">
                        <ContainerHeader name={container.name} importance={container.importance} permission={permission} />
                        <div className="w-full rounded bg-indigo-50 shadow-inner mx-2">
                            <HorizontalScroll card={
                                <>
                                <div className="w-3 h-1"></div>
                                {
                                tasks.map(task => {
                                    return (
                                        <div className="w-28 h-20 mx-1 my-3 rounded flex flex-col shadow-sm" style={{backgroundColor:COLOR_THIRD}}>
                                            <TaskCard 
                                            task={task}
                                            permission={permission}
                                            />
                                        </div>
                                        )
                                    })
                                }
                                {
                                    permission ? (
                                        <div className="w-28 h-20 mx-1 my-3 rounded shadow-sm" style={{backgroundColor:COLOR_THIRD}}>
                                            <form className="w-28 h-20 text-white flex flex-col justify-between items-center p-2">
                                                <div className="w-full flex flex-col items-center">
                                                    <span className="text-xs font-semibold">New Task</span>
                                                    <input className="w-11/12 text-sm text-gray-700 rounded px-1" placeholder="Name" style={{backgroundColor:COLOR_FIFTH}}></input>   
                                                </div>
                                                <div className="w-full flex flex-col items-center">
                                                    <button className="p-1 px-2 text-xs bg-green-200 text-gray-700 font-semibold rounded">Submit</button>

                                                </div>
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
                        <div className="w-full"><span>{description}</span></div>
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
    getContainer:PropTypes.func.isRequired
}


export default connect(null,{getContainer})(Container);
