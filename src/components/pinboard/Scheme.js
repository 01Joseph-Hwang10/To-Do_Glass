import React, { Component } from 'react'
import { connect } from 'react-redux'
import SchemeCard from '../../mixins/cards/SchemeCard';
import HorizontalScroll from '../../mixins/scroll/HorizontalScroll';
// import PropTypes from 'prop-types'

class Scheme extends Component {


    render() {

        const containers = this.props.project.get_containers;
        const permission = this.props.permission

        return (
            <div>
                <span>Scheme</span>
                <div>
                    <HorizontalScroll card={
                        containers.map(container => {
                            return (
                                <SchemeCard 
                                container={container}
                                permission={permission}
                                />
                            )
                        })
                    } />
                </div>
            </div>
        )
    }
}

// Scheme.propTypes = {

// }

export default connect(null,null)(Scheme);
