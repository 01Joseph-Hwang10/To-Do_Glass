// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
import {getProject,clearProject} from '../../actions/projectActions';
import {clearContainer} from '../../actions/containerActions';
// etc
// import PropTypes from 'prop-types'
// Components
import GlanceCard from './GlanceCard';

class GlanceBox extends Component {
    
    render() {

        const glances = this.props.Glance

        const OnSubmit = (e) => {
            e.preventDefault()
            const form = e.target
            const input = form.childNodes[0]
            const project_id=input.value
            this.props.clearProject()
            this.props.clearContainer()
            this.props.getProject(project_id)
        }

        return (
            <div>
                {
                    Boolean(glances.length>0) ? (
                        <>
                            {
                                glances.map(glance => {
                                    return (
                                        <form onSubmit={OnSubmit}>
                                            <input className="hidden" value={glance.id} readOnly></input>
                                            <button>
                                                <GlanceCard glance={glance} />
                                            </button>
                                        </form>
                                    )
                                })
                            }
                        </>
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

// GlanceBox.propTypes = {

// }


const mapStateToProps = state => {
    return {
        Glance:state.glance.Glance
    }
}

const actions = {
    getProject,
    clearProject,
    clearContainer
}


export default connect(mapStateToProps,actions)(GlanceBox);
