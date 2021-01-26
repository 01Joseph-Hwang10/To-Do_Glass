// React
import React, { Component } from 'react'
// etc
// import PropTypes from 'prop-types'
// Components
import GlanceBox from './glance/GlanceBox'
import Search from './glance/Search'

class Glance extends Component {
    
    render() {
        return (
            <div>
                <div>
                    <Search />
                </div>
                <div>
                    <GlanceBox />
                </div>
            </div>
        )
    }
}


// Glance.propTypes = {

// }


export default Glance;
