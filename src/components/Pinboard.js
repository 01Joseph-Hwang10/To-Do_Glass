// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux'

class Pinboard extends Component {

    render() {

        const project = this.props.Project;

        return (
            <div>
                <span>Pinboard</span>
                {
                    project.url ? (
                        <div>
                            <span>{project.name}</span>
                        </div>
                    ) : (
                        <div>
                            <span>Loading</span>
                        </div>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        Project:state.project.Project
    }
}


export default connect(mapStateToProps,null)(Pinboard);
