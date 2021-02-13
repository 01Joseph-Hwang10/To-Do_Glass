// React
import React, { Component } from 'react'
// Redux
import { connect } from 'react-redux';
// etc
// import PropTypes from 'prop-types'
import { COLOR_SEVENTH } from "../../../store/variables";
// Components
import GlanceCard from './GlanceCard';

class GlanceBox extends Component {
    
    render() {

        const glances = this.props.Glance
        const isLoading = this.props.isLoading

        return (
            <div className="w-full">
                {
                    glances.length>0 ? (
                        <>
                            {
                                glances.map(glance => {
                                    return (
                                    <div key={glance.id} className="w-full">
                                        <GlanceCard glance={glance} />
                                    </div>
                                    )
                                })
                            }
                        </>
                    ) : (
                        <>
                        {
                            isLoading ? (
                                <>
                                <div className="w-full rounded shadow-md flex flex-col p-2 mt-3" style={{backgroundColor:COLOR_SEVENTH}}>
                                    <div className="w-full animate-pulse space-y-4">
                                        <div className="w-full my-1">
                                            <div className="w-full flex justify-between items-start">
                                                <div className="w-1/3 h-4 p-2 bg-gray-200 rounded"></div>
                                                <div className="w-5/12 h-10 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 w-11/12">
                                            <div className="w-9/12 p-2 h-3 bg-gray-200 rounded"></div>
                                            <div className="w-full p-2 h-3 bg-gray-200 rounded"></div>
                                            <div className="w-7/12 p-2 h-3 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="flex space-x-1">
                                            <div className="w-2/12 p-2 h-2 bg-gray-200 rounded"></div>
                                            <div className="w-3/12 p-2 h-2 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="w-full rounded shadow-md flex flex-col p-2 mt-3" style={{backgroundColor:COLOR_SEVENTH}}>
                                    <div className="w-full animate-pulse space-y-4">
                                        <div className="w-full my-1">
                                            <div className="w-full flex justify-between items-start">
                                                <div className="w-1/3 h-4 p-2 bg-gray-200 rounded"></div>
                                                <div className="w-5/12 h-10 bg-gray-200 rounded"></div>
                                            </div>
                                        </div>
                                        <div className="space-y-2 w-11/12">
                                            <div className="w-9/12 p-2 h-3 bg-gray-200 rounded"></div>
                                            <div className="w-full p-2 h-3 bg-gray-200 rounded"></div>
                                            <div className="w-7/12 p-2 h-3 bg-gray-200 rounded"></div>
                                        </div>
                                        <div className="flex space-x-1">
                                            <div className="w-2/12 p-2 h-2 bg-gray-200 rounded"></div>
                                            <div className="w-3/12 p-2 h-2 bg-gray-200 rounded"></div>
                                        </div>
                                    </div>
                                </div>
                                </>
                            ) : (
                                <div className="p-2 flex justify-center items-center rounded shadow-md w-full mt-3" style={{backgroundColor:COLOR_SEVENTH}}>
                                    <span className="font-semibold">No Glances Are Found</span>
                                </div>
                            )
                        }
                        </>
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
        Glance:state.glance.Glance,
        isLoading:state.glance.isLoading
    }
}

export default connect(mapStateToProps,null)(GlanceBox);
