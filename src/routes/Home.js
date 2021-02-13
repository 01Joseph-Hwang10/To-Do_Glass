// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import {checkAuth} from '../actions/useractions/authActions';
import { disableFullScreen } from "../actions/screenActions";
// etc
import PropTypes from "prop-types";
// import { COLOR_FOURTH } from '../store/variables';
// Component
import Overview from '../components/desktop/Overview';
import Pinboard from '../components/desktop/Pinboard';
import Glance from '../components/desktop/Glance';

class Home extends React.Component {

    componentDidMount() {
        this.props.disableFullScreen()
        const CheckAuth = this.props.checkAuth;
        const isAuthenticated = this.props.isAuthenticated
        CheckAuth(isAuthenticated);
        setInterval(function(){CheckAuth(isAuthenticated); }, (1000*60*4+1000*50) )
    }

    render() {

        const pinboardIsLoaded = Boolean(Object.keys(this.props.project).length > 0)
        const isFullScreen = this.props.isFullScreen
        const overviewWidth = (function(){return(isFullScreen?"0%":"17%")})()
        const overviewOpacity = (function(){return(isFullScreen?0:1)})()
        const pinboardWidth = (function(){return(isFullScreen?"90%":"50%")})()
        const glanceWidth = (function(){return(isFullScreen?"0%":"25%")})()
        const glanceOpacity = (function(){return(isFullScreen?0:1)})()
        const delay = (function(){return(isFullScreen?"":"0.4s")})()


        return (
            <>
            <div className="scroller mt-16 flex justify-center w-full overflow-x-hidden">
                <div className="container w-2/12 m-2 rounded p-3" style={{
                    width:overviewWidth,
                    opacity:overviewOpacity,
                    transition:`width 0.5s, opacity 0.1s ease-in-out ${delay}`
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
                                    <span>Currently No Projects Are Loaded</span>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="container w-3/12 m-2 mt-6" style={{
                    width:glanceWidth,
                    opacity:glanceOpacity,
                    transition:`width 0.5s, opacity 0.1s ease-in-out ${delay}`
                }}>
                    <Glance />
                </div>
            </div>
            </>
        );
    }
}

Home.propTypes = {
    checkAuth:PropTypes.func.isRequired,
    disableFullScreen:PropTypes.func.isRequired,
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated,
        project:state.project.Project,
        isFullScreen:state.screen.isFullScreen
    }
}

const actions = {checkAuth, disableFullScreen}


export default connect(mapStateToProps,actions)(Home);
