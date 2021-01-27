// React
import React from 'react';
// Redux
import {checkAuth} from '../actions/authActions';
import { connect } from 'react-redux';
// Component
import Overview from '../components/Overview';
import Pinboard from '../components/Pinboard';
import Glance from '../components/Glance';

class Home extends React.Component {

    componentDidMount() {
        const CheckAuth = this.props.checkAuth;
        const isAuthenticated = this.props.isAuthenticated
        CheckAuth(isAuthenticated);
        setInterval(function(){CheckAuth(isAuthenticated); }, (1000*60*4+1000*50) )
    }

    render() {

        const pinboardIsLoaded = Boolean(Object.keys(this.props.Project).length > 0)

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
                    {
                        pinboardIsLoaded ? (
                            <Pinboard />
                        ) : (
                            <div>
                                <span>Open Your Project!</span>
                            </div>
                        )
                    }
                </div>
                <div>
                    <Glance />
                </div>
            </div>
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated,
        Project:state.project.Project
    }
}


export default connect(mapStateToProps,{checkAuth})(Home);
