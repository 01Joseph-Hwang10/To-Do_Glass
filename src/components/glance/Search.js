import React, { Component } from 'react'
// import PropTypes from 'prop-types'

class Search extends Component {
    
    render() {

        const OnSubmit = (e) => {
            e.preventDefault()
        }

        return (
            <div>
                <form onSubmit={OnSubmit}>
                    <input placeholder="search for your glance!"></input>
                    <button>Search</button>
                </form>
            </div>
        )
    }
}


// Search.propTypes = {

// }


export default Search;
