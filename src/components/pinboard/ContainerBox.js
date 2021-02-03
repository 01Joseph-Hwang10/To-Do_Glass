import React, { Component } from 'react'
import { connect } from 'react-redux';
// import PropTypes from 'prop-types'
import Container from './Container';

class ContainerBox extends Component {
    
    render() {

        const container_ids = this.props.project.get_container_ids
        const containers = this.props.container
        const permission = this.props.permission

        return (
            <div className="w-full">
                <div className="w-full border-b-2"></div>
                {
                    container_ids.map(container_id => {
                        let container;
                        if(containers[container_id]) {
                            container=containers[container_id]
                        }
                        return (
                            <Container 
                            id={container_id} 
                            permission={permission}
                            container={container}
                             />
                        )
                    })
                }
                {
                    permission ? (
                    <div className="w-full border-b-2 flex justify-center items-center py-1">
                        <button className="fas fa-plus-circle text-xl"></button>
                    </div>
                    ) : (
                        <></>
                    )
                }
            </div>
        )
    }
}

// ContainerBox.propTypes = {

// }

const mapStateToProps = state => {
    return {
        container:state.container
    }
}


export default connect(mapStateToProps,null)(ContainerBox);
