import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchGlance, clearGlance, getGlance } from '../../../actions/todoactions/glanceActions'

class Search extends Component {
    
    render() {

        const OnSubmit = async (e) => {
            e.preventDefault()
            this.props.clearGlance()
            const form = e.target
            const input = form.querySelector('input')
            const postData = {
                input:input.value
            }
            await this.props.searchGlance(postData)
            input.value=''
        }

        const OnClick = async () => {
            this.props.clearGlance()
            await this.props.getGlance()
        }

        return (
            <div className="w-full flex space-x-1 items-center">
                <form className="w-full flex justify-between items-center" onSubmit={OnSubmit}>
                    <input required className="flex-grow bg-transparent border-2 p-1 rounded-xl border-gray-400" placeholder="search for your glance!"></input>
                    <button className="fas fa-search pl-2 text-xl"></button>
                </form>
                <div><button onClick={OnClick} className="far fa-lightbulb text-xl pl-2"></button></div>
            </div>
        )
    }
}


Search.propTypes = {
    searchGlance:PropTypes.func.isRequired,
    clearGlance:PropTypes.func.isRequired,
    getGlance:PropTypes.func.isRequired
}


export default connect(null,{searchGlance,clearGlance,getGlance})(Search);
