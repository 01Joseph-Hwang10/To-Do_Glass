import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import Container from './Container';

class ContainerBox extends Component {
    
    render() {

        const container_ids = this.props.project.get_container_ids
        const permission = this.props.permission

        return (
            <div>
                {
                    container_ids.map(container_id => {
                        return (
                            <Container id={container_id} permission={permission}/>
                        )
                    })
                }
            </div>
        )
    }
}

// ContainerBox.propTypes = {

// }


export default ContainerBox;
