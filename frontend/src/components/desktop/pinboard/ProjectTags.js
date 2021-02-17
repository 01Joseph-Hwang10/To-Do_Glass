// React
import React from 'react'
// Redux
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { createTag, getTag, clearTag, updateTag } from "../../../actions/todoactions/tagActions";
// etc
import { switchHidden } from '../../../functions/switchDisplay'
import { COLOR_FIRST } from '../../../store/variables'
// Components
import Tag from "../../../mixins/Tag";

class ProjectTags extends React.Component {


    componentDidMount() {
        const project = this.props.project
        this.props.clearTag()
        if(project) this.props.getTag(project.get_tags)
    }


    render() {

        const project = this.props.project
        const tags = this.props.tags
        const permission = this.props.permission
    
        const createTag = async (e) => {
            e.preventDefault()
            const form = e.target
            const formDiv = form.parentNode
            const span = formDiv.querySelector('span')
            form.style.display="none"
            span.style.display='block'

            const input = form.querySelector('input')
            const postData = {
                name:input.value,
                tag_for_id:project.id,
                user_id:localStorage.getItem('user_id')
            }
            await this.props.createTag(postData)
            this.forceUpdate()
            const div = form.parentNode
            const button = div.querySelector('button')
            span.style.display='none'
            button.style.display="block"
            input.value=""
        }

        const updateComponent = () => {
            this.forceUpdate()
        }
    
        return (
            <div key={project.id} className="flex justify-start items-start">
                <div className={['mb-1 mr-2',(function(){return(permission?"":"mt-2")})()].join(' ')}><span className="text-xl font-semibold" style={{color:COLOR_FIRST}}>Tags: </span></div>
                    <div className="flex justify-start items-center flex-wrap space-x-2">
                    {
                        tags.map(tag => {
                            if(tag && tag.id){
                                return (
                                    <div key={tag.id} className={['mb-1',(function(){return(permission?"":"mt-2")})()].join(' ')}>
                                        <Tag tag={tag} permission={permission} update={updateComponent} />
                                    </div>
                                )
                            } else {
                                return (<></>)
                            }
                        })
                    }
                    {
                        permission ? (
                            <div className="flex items-center justify-center bg-blue-200 py-1 mb-1 px-2 rounded-2xl">
                                <button onClick={switchHidden} className="fas fa-plus w-16 h-6" style={{color:COLOR_FIRST,display:'block'}}></button>
                                <form onSubmit={createTag} className="flex justify-center items-center" style={{display:'none'}}>
                                    <input required className="w-32 h-6 outline-none bg-transparent" placeholder="Tag"></input>
                                </form>
                                <span className="text-sm" style={{display:'none'}}></span>
                            </div>
                        ) : (
                            <></>
                        )
                    }
                    </div>
            </div>
        )
    }

}

ProjectTags.propTypes = {
    createTag:PropTypes.func.isRequired,
    getTag:PropTypes.func.isRequired,
    clearTag:PropTypes.func.isRequired,
    updateTag:PropTypes.func.isRequired
}


const mapStateToProps = state => {
    return {
        tags:state.tag.Tags
    }
}

const actions = {createTag,getTag,clearTag,updateTag}


export default connect(mapStateToProps,actions)(ProjectTags)

