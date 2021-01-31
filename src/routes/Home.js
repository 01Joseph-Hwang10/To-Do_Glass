// React
import React from 'react';
// Redux
import {checkAuth} from '../actions/authActions';
import { connect } from 'react-redux';
// Component
import Overview from '../components/Overview';
import Pinboard from '../components/Pinboard';
import Glance from '../components/Glance';
// import { COLOR_FOURTH } from '../store/variables';

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
            <div className="mt-16 flex justify-center w-full">
                <div className="container w-2/12 m-2 rounded p-3">
                    <Overview />
                </div>
                <div className="container w-6/12 m-2">
                    {
                        pinboardIsLoaded ? (
                            <Pinboard />
                        ) : (
                            <div className="w-full">
                                <div className="flex justify-center items-center w-full bg-gray-100 rounded shadow-inner" style={{height:"500px"}}>
                                    <span>No Projects are opened</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="container w-3/12 m-2 mt-6">
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
