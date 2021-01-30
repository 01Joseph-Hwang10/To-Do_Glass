// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'
import {createContainer} from '../../actions/containerActions';
import {getProject} from '../../actions/projectActions';
// etc
import { COLOR_FIFTH, COLOR_SIXTH } from '../../store/variables';
import PropTypes from 'prop-types'
// Components
import SchemeCard from './partials/SchemeCard';
import HorizontalScroll from '../../mixins/scroll/HorizontalScroll';

class Scheme extends Component {

    render() {

        const project = this.props.project
        const containers = project.get_containers;
        const projectId = project.id
        const permission = this.props.permission
        const countContainers = Number(project.count_containers)
        
        const OnSubmit = (e) => {
            e.preventDefault()
            const form = e.target
            const input = form.childNodes[0]
            const post_data = {
                name:input.value,
                project:projectId,
                user_id:localStorage.getItem('user_id'),
                order:(countContainers+1),
            }
            this.props.createContainer(post_data)
            this.props.getProject()
            input.value=""
            input.blur()
        };

        return (
            <div className="w-full rounded shadow-inner py-3 bg-indigo-50">
                <HorizontalScroll card={
                    <>
                    <div className="w-1 h-1"><div className="w-1 h-1"></div></div>
                    {
                        containers.map(container => {
                            return (
                                <div className="w-32 h-24 mx-1 mr-3">
                                    <SchemeCard 
                                    container={container}
                                    permission={permission}
                                    />
                                </div>
                            )
                        })
                    }
                    {
                        permission ? (
                        <div className="w-36 h-24 mx-1">
                            <div className="flex flex-col justify-start items-center rounded shadow-lg w-36 h-24 mx-2 py-1" style={{backgroundColor:COLOR_SIXTH}}>
                                <div className="w-full h-full flex flex-col justify-between items-center">
                                    <div className="w-full flex justify-center items-start"><span className="text-xs font-bold mb-1">New Container</span></div>
                                    <form className="w-full h-full flex flex-col justify-around items-center" onSubmit={OnSubmit}>
                                        <input placeholder="Name" className="w-11/12 rounded border-2 mb-1 text-sm" style={{backgroundColor:COLOR_FIFTH}}></input>
                                        <button className="text-xs bg-pink-100 p-1 px-2 font-semibold rounded">Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        ) : (
                            <span></span>
                        )
                    }
                    <div className="w-5 h-1"><div className="w-5 h-1"></div></div>
                    </>
                }/>
            </div>
        )
    }
}

Scheme.propTypes = {
    createContainer:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired
}

export default connect(null,{createContainer,getProject})(Scheme);
