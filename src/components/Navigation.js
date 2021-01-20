import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import {Logout} from '../actions/authActions';
import useNav from '../hooks/useNav';

function Navigation(props) {

    // eslint-disable-next-line
    const {onLanding,setOnLanding} = useNav();

    let style="block";
    if(onLanding) {
        style="none";
    } else {
        style="block";
    }

    return (
        <div id="navigation" style={{display:style}}>
            <Link to='/'><span>Logo</span></Link>
            <span>Navigation</span>
            <button onClick={props.Logout}>Log out</button>
        </div>
    )
}

export default connect(null,{Logout})(Navigation);
