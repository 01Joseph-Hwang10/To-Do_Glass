import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {Logout} from '../actions/authActions';
import useNav from '../hooks/useNav';

class Navigation extends React.Component {

    componentDidMount() {
        console.log(document.getElementById("landing"))
        const nav = document.getElementById("navigation")
        if (document.getElementById("landing")) {
            nav.style.display = "none";
        } else {
            nav.style.display = "block";
        }
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

export default connect(null,{Logout})(Navigation);
