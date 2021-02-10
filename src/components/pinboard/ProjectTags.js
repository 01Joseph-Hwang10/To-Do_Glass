import React from 'react'
import { switchHidden } from '../../functions/switchDisplay'
import { COLOR_FIRST } from '../../store/variables'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTag } from "../../actions/todoactions/tagActions";

function ProjectTags(props) {

    const project = props.project
    const permission = props.permission

    const createTag = async (e) => {
        e.preventDefault()
        const form = e.target
        const input = form.querySelector('input')
        const postData = {
            name:input.value,
            tag_for_id:project.id
        }
    }

    return (
        <div className="flex justify-start items-center">
            <div className="mr-2"><span className="text-xl font-semibold" style={{color:COLOR_FIRST}}>Tags: </span></div>
            {
                permission ? (
                <div className="flex justify-start items-center space-x-2">
                    <div className="flex items-center justify-center bg-blue-200 py-1 px-2 rounded-2xl">
                        <button onClick={switchHidden} className="fas fa-plus w-16 h-4" style={{color:COLOR_FIRST,display:'block'}}></button>
                        <form onSubmit={createTag} className="flex justify-center items-center" style={{display:'none'}}>
                            <input required className="w-32 h-4 outline-none bg-transparent" placeholder="Tag"></input>
                        </form>
                    </div>
                </div>
                ) : (
                    <></>
                )
            }
        </div>
    )
}

ProjectTags.propTypes = {
    createTag:PropTypes.func.isRequired
}

export default connect(null,{createTag})(ProjectTags)

