import React from 'react';
import Overview from '../components/Overview';
import {showNavAfterLogin} from '../actions/navControl'
import { connect } from 'react-redux';

class Home extends React.Component {

    componentDidMount() {
        this.props.showNavAfterLogin();
    }

    render() {
        return (
            <>
            <div>
                <h1>Home</h1>
            </div>
            <div>
                <div>
                    <Overview />
                </div>
                <div></div>
                <div></div>
            </div>
            </>
        );
    }
}


export default connect(null,{showNavAfterLogin})(Home);
