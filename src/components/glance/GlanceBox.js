// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
// etc
// import PropTypes from 'prop-types'
// Components
import GlanceCard from './GlanceCard';

class GlanceBox extends Component {
    
    render() {

        const glances = this.props.Glance

        return (
            <div className="w-full">
                {
                    Boolean(glances.length>0) ? (
                        <>
                            {
                                glances.map(glance => {
                                    return (
                                    <div className="w-full">
                                        <GlanceCard glance={glance} />
                                    </div>
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

export default connect(mapStateToProps,null)(GlanceBox);
