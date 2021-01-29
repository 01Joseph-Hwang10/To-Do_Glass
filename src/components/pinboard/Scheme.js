import React, { Component } from 'react'
import { connect } from 'react-redux'
import SchemeCard from './partials/SchemeCard';
import HorizontalScroll from '../../mixins/scroll/HorizontalScroll';
import { COLOR_FIFTH, COLOR_SIXTH } from '../../store/variables';
// import PropTypes from 'prop-types'

class Scheme extends Component {

    render() {

        const OnSubmit = (e) => {
            e.preventDefault()
            const form = e.target
            const input = form.childNodes[1]
            // Actions
            input.value=""
        };

        const containers = this.props.project.get_containers;
        const permission = this.props.permission

        return (
            <div className="w-full rounded shadow-inner py-3 bg-indigo-50">
                <HorizontalScroll card={
                    <>
                    <div className="w-1 h-1"><div className="w-1 h-1"></div></div>
                    {
                        containers.map(container => {
                            return (
                                <div className="w-32 h-24 mx-1 mr-3">
                                    <SchemeCard 
                                    container={container}
                                    permission={permission}
                                    />
                                </div>
                            )
                        })
                    }
                    <div className="w-36 h-24 mx-1">
                        <div className="flex flex-col justify-center items-center rounded shadow-lg w-36 h-24 mx-2" style={{backgroundColor:COLOR_SIXTH}}>
                            <form className="w-full flex flex-col justify-center items-center" onSubmit={OnSubmit}>
                                <span className="text-sm mb-1">New Container</span>
                                <input placeholder="Name" className="w-11/12 rounded border-2 mb-1" style={{backgroundColor:COLOR_FIFTH}}></input>
                                <button className="text-sm bg-pink-100 p-1 px-3 font-semibold rounded">Submit</button>
                            </form>
                        </div>
                    </div>
                    <div className="w-5 h-1"><div className="w-5 h-1"></div></div>
                    </>
                }/>
            </div>
        )
    }
}

// Scheme.propTypes = {

// }

export default connect(null,null)(Scheme);
