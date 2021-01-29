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


class Container extends Component {

    componentDidMount() {
        this.props.getContainer(this.props.id);
    }

    componentDidUpdate() {
        // if(!this.props.container) this.props.getContainer(this.props.id);
    }
    
    render() {

        let container,tasks,permission;
        container = this.props.container
        if(container) tasks = container.get_tasks
        permission = this.props.permission

        return (
            <div>
                {container ? (
                    <div>
                        <span>{container.name}</span>
                        <span>{container.description}</span>
                        <div>
                            <HorizontalScroll card={
                                tasks.map(task => {
                                    return (
                                        <TaskCard 
                                        task={task}
                                        permission={permission}
                                        />
                                    )
                                })
                            }/>
                        </div>
                    </div>
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
