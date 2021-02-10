import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { deleteTag, updateTag } from "../actions/todoactions/tagActions";

class Tag extends React.Component {


    render() {

        const tag = this.props.tag
        const permission = this.props.permission
        
        let bgColor="bg-blue-200"
        if(this.props.bgColor) bgColor = this.props.bgColor
    
        const OnClick = async () => {
            const id = tag.id
            await this.props.deleteTag(id)
            if(this.props.update) this.props.update()
        }
        
        return (
            <div className={["flex items-center justify-center py-1 px-2 rounded-2xl",bgColor].join(' ')}>
                <span>{tag.name}</span>
                {
                    permission ? (
                        <button onClick={OnClick} className="fas fa-times ml-2"></button>
                    ) : (
                        <></>
                    )
                }
            </div>
        )
    }

}

Tag.propTypes = {
    deleteTag:PropTypes.func.isRequired,
    updateTag:PropTypes.func.isRequired
}

export default connect(null,{deleteTag,updateTag})(Tag)

