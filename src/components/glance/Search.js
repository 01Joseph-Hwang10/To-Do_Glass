import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class Search extends Component {
    
    render() {

        const OnSubmit = (e) => {
            e.preventDefault()
        }

        return (
            <div className="w-full">
                <form className="w-full flex justify-between items-center" onSubmit={OnSubmit}>
                    <input className="flex-grow bg-transparent border-2 p-1 rounded-xl border-gray-400" placeholder="search for your glance!"></input>
                    <button className="fas fa-search p-1 ml-2 text-xl"></button>
                </form>
            </div>
        )
    }
}


// Search.propTypes = {

// }


export default Search;
