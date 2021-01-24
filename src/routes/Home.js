// React
import React from 'react';
// Redux
import {checkAuth} from '../actions/authActions';
import { connect } from 'react-redux';
// Component
import Overview from '../components/Overview';
import Pinboard from '../components/Pinboard';

class Home extends React.Component {

    componentDidMount() {
        this.props.checkAuth();
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
                <div>
                    <Pinboard />
                </div>
                <div></div>
            </div>
            </>
        );
    }
}


export default connect(null,{checkAuth})(Home);
