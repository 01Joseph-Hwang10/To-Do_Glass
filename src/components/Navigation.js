// React
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Redux
import {Logout} from '../actions/authActions';
import {checkLanding} from '../actions/navControl';
// etc
import {PropTypes} from 'prop-types';

class Navigation extends React.Component {

    componentDidMount() {
        this.props.checkLanding()
    }

    componentDidUpdate() {
        this.props.checkLanding()
    }


    render() {
        return (
            <div id="navigation" style={{display:'block'}}>
                <Link to='/'><span>Logo</span></Link>
                <span>Navigation</span>
                <button onClick={this.props.Logout}>Log out</button>
            </div>
        )
    }
}

Navigation.propTypes = {
    Logout:PropTypes.func.isRequired
}

export default connect(null,{Logout, checkLanding})(Navigation);
