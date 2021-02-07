// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'
import {createContainer,getContainer} from '../../actions/todoactions/containerActions';
import {getProject} from '../../actions/todoactions/projectActions'
// etc
import { COLOR_FIFTH, COLOR_FIRST, COLOR_SIXTH } from '../../store/variables';
import PropTypes from 'prop-types'
import {switchHidden} from '../../functions/switchDisplay'
import { sortByOrder } from '../../functions/sortByOrder';
// Components
import SchemeCard from './partials/SchemeCard';
import HorizontalScroll from '../../mixins/scroll/HorizontalScroll';

class Scheme extends Component {

    render() {

        const project = this.props.project
        const containers = project.get_containers.sort(sortByOrder)
        const projectId = project.id
        const permission = this.props.permission
        const countContainers = Number(project.count_containers)
        
        const OnSubmit = async (e) => {
            e.preventDefault()
            const form = e.target
            const div = e.target.parentNode
            const button = div.childNodes[0]
            const input = form.childNodes[0]
            const post_data = {
                name:input.value,
                project_id:projectId,
                user_id:localStorage.getItem('user_id'),
                order:(countContainers+1),
            }
            await this.props.createContainer(post_data)
            await this.props.getProject(projectId)
            input.value=""
            input.blur()
            form.style.display = "none"
            button.style.display = "block"
        };

        return (
            <div className="w-full rounded shadow-inner py-3 bg-indigo-50">
                <HorizontalScroll card={
                    <>
                    <div className="w-1 h-1"><div className="w-1 h-1"></div></div>
                    {
                        containers.map(container => {
                            return (
                                <div className="w-40 h-32 mx-1 mr-3">
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
                        <div className="w-40 h-32 mx-1">
                            <div className="flex flex-col justify-start items-center rounded shadow-lg w-40 h-32 mx-2 py-1" style={{backgroundColor:COLOR_SIXTH}}>
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <button className="fas fa-plus-circle text-3xl w-full h-full" style={{display:'block',color:COLOR_FIRST}} onClick={switchHidden}></button>
                                    <form className="w-full h-full flex flex-col justify-around items-center" style={{display:'none'}} onSubmit={OnSubmit}>
                                        <input required placeholder="Name" className="w-11/12 rounded border-2 mb-1 text-sm focus:border-gray-600" style={{
                                            backgroundColor:COLOR_FIFTH,
                                            transition:"all 0.5s ease-in-out"
                                        }}></input>
                                        <button className="text-xs bg-pink-100 p-1 px-2 font-semibold rounded">Create</button>
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
    getContainer:PropTypes.func.isRequired,
    getProject:PropTypes.func.isRequired,
}


const mapStateToProps = state => {
    return {
        createdId: state.container.created
    }
}


export default connect(mapStateToProps,{createContainer,getContainer,getProject})(Scheme);
