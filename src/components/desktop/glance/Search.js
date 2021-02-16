import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { searchGlance, clearGlance, getGlance } from '../../../actions/todoactions/glanceActions'

class Search extends Component {
    
    render() {

        const tags = this.props.Tags

        const setToInitial = (e) => {
            const eventOrigin = e.target
            const glance = eventOrigin.closest('.glance')
            const moreGlances = glance.querySelector('.moreGlances')
            const button = moreGlances.querySelector('button')
            const span = moreGlances.querySelector('span')
            button.style.display = 'block'
            span.style.display = 'none'
        }

        const OnSubmit = async (e) => {
            await this.props.clearGlance()
            e.preventDefault()
            const form = e.target
            const input = form.querySelector('input')
            const postData = {
                input:input.value,
                user_id:localStorage.getItem('user_id'),
                searchContinue:0
            }
            await this.props.searchGlance(postData)
            input.value=''

            setToInitial(e)
        }

        const OnClick = async (e) => {
            this.props.clearGlance()
            if(tags && tags.length > 0) {
                let tagNames = []
                for (let i=0; i<tags.length; i++) {
                    tagNames.push(tags[i].name)
                }
                const postData = {
                    input:tagNames.join(' '),
                    user_id:localStorage.getItem('user_id'),
                    searchContinue:0
                }
                await this.props.searchGlance(postData)
            } else {
                await this.props.getGlance()
            }

            setToInitial(e)
        }

        const random = async (e) => {
            this.props.clearGlance()
            await this.props.getGlance()

            setToInitial(e)
        }

        return (
            <div className="w-full flex space-x-1 items-center">
                <form className="w-full flex justify-between items-center" onSubmit={OnSubmit}>
                    <input className="flex-grow bg-transparent border-2 p-1 rounded-xl border-gray-400" placeholder="search for your glance!"></input>
                    <button className="fas fa-search pl-2 text-xl"></button>
                </form>
                <div><button onClick={OnClick} className="far fa-lightbulb text-xl pl-2"></button></div>
                <div><button onClick={random} className="fas fa-random text-xl pl-2"></button></div>
            </div>
        )
    }
}


Search.propTypes = {
    searchGlance:PropTypes.func.isRequired,
    clearGlance:PropTypes.func.isRequired,
    getGlance:PropTypes.func.isRequired
}

const mapStateToProps = state => {
    return {
        Tags:state.tag.Tags
    }
}


export default connect(mapStateToProps,{searchGlance,clearGlance,getGlance})(Search);
