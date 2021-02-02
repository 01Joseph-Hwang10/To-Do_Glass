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
        const isFullScreen = this.props.isFullScreen
        const overviewWidth = (function(){return(isFullScreen?"0%":"17%")})()
        const overviewOpacity = (function(){return(isFullScreen?0:1)})()
        const pinboardWidth = (function(){return(isFullScreen?"100%":"50%")})()
        const glanceWidth = (function(){return(isFullScreen?"0%":"25%")})()
        const glanceOpacity = (function(){return(isFullScreen?0:1)})()


        return (
            <>
            <div className="mt-16 flex justify-center w-full">
                <div className="container w-2/12 m-2 rounded p-3" style={{
                    width:overviewWidth,
                    opacity:overviewOpacity,
                    transition:'all 0.5s ease-in-out'
                }}>
                    <Overview />
                </div>
                <div className="container m-2" style={{
                    width:pinboardWidth,
                    transition:'all 0.5s ease-in-out'
                }}>
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
                <div className="container w-3/12 m-2 mt-6" style={{
                    width:glanceWidth,
                    opacity:glanceOpacity,
                    transition:'all 0.5s ease-in-out'
                }}>
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
        Project:state.project.Project,
        isFullScreen:state.screen.isFullScreen
    }
}


export default connect(mapStateToProps,{checkAuth})(Home);
