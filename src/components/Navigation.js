// React
import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// Redux
import {Logout} from '../actions/authActions';
import {checkPlace,hideNavAfterLogout} from '../actions/navControl';
import {deleteProfileAfterLogout} from '../actions/userInfoActions';
// etc
import {PropTypes} from 'prop-types';

class Navigation extends React.Component {

    componentDidMount() {
        this.props.checkPlace()
    }

    componentWillUpdate() {
        this.props.checkPlace()
    }

    render() {

        const Logout = () => {
            this.props.Logout();
            this.props.hideNavAfterLogout();
            this.props.deleteProfileAfterLogout();
        }

        return (
            <div id="navigation" style={{display:'block'}}>
                <Link to='/'><span>Logo</span></Link>
                <span>Navigation</span>
                <button onClick={Logout}>Log out</button>
            </div>
        )
    }
}

const actions={Logout, checkPlace, 
    hideNavAfterLogout, deleteProfileAfterLogout};

Navigation.propTypes = {
    Logout:PropTypes.func.isRequired,
    checkPlace:PropTypes.func.isRequired,
    hideNavAfterLogout:PropTypes.func.isRequired,
    deleteProfileAfterLogout:PropTypes.func.isRequired
}

export default connect(null,actions)(Navigation);
