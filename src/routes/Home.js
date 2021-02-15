// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import {checkAuth} from '../actions/useractions/authActions';
import { disableFullScreen, focusPinboard, openGlance, openOverview, setScreenSize } from "../actions/screenActions";
// etc
import PropTypes from "prop-types";
import { COLOR_FIFTH, COLOR_FIRST } from '../store/variables';
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
        const setScreenSize = this.props.setScreenSize
        window.onresize = function() {
            setScreenSize(window.innerWidth)
        }
    }

    render() {

        const pinboardIsLoaded = Boolean(Object.keys(this.props.project).length > 0)
        const isFullScreen = this.props.isFullScreen
        const screenSize = this.props.screenSize

        const overviewOpened = this.props.overviewOpened
        const glanceOpened = this.props.glanceOpened

        let overviewWidth, overviewOpacity, pinboardWidth, glanceWidth, glanceOpacity,delay
        if(screenSize >= 1024) {
            overviewWidth = (function(){return(isFullScreen?"0%":"17%")})()
            overviewOpacity = (function(){return(isFullScreen?0:1)})()
            pinboardWidth = (function(){return(isFullScreen?"90%":"50%")})()
            glanceWidth = (function(){return(isFullScreen?"0%":"25%")})()
            glanceOpacity = (function(){return(isFullScreen?0:1)})()
            delay = (function(){return(isFullScreen?"":"0.4s")})()
        } else {
            overviewWidth = (function(){return(overviewOpened?"30%":'0%')})()
            overviewOpacity = (function(){return(overviewOpened?1:0)})()
            pinboardWidth = (function(){
                if(overviewOpened) return '60%'
                if(glanceOpened) return '50%'
                return '90%'
            })()
            glanceWidth = (function(){return(glanceOpened?'40%':'0%')})()
            glanceOpacity = (function(){return(glanceOpened?1:0)})()
            delay = ""
        }

        return (
            <>
            <div className="scroller mt-16 flex justify-center w-full overflow-x-hidden">
                <div className="container m-2 rounded p-3" style={{
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
                <div className="container m-2 mt-6" style={{
                    width:glanceWidth,
                    opacity:glanceOpacity,
                    transition:`width 0.5s, opacity 0.1s ease-in-out ${delay}`
                }}>
                    <Glance />
                </div>
                {
                    screenSize >= 1024 ? (
                        <></>
                    ) : (
                        <div className="fixed bottom-0 w-full z-50 flex justify-center items-center">
                            <div className="rounded-t-lg p-4 border-2 border-b-none flex justify-center items-center space-x-10" style={{backgroundColor:COLOR_FIFTH}}>
                                <button onClick={openOverview} style={{color:(function(){return(overviewOpened?'orange':COLOR_FIRST)})()}} className="p-1 text-6xl fas fa-user z-50"></button>
                                <button onClick={focusPinboard} style={{color:(function(){return(!overviewOpened && !glanceOpened?'orange':COLOR_FIRST)})()}} className="p-1 text-6xl fas fa-clipboard z-50"></button>
                                <button onClick={openGlance} style={{color:(function(){return(glanceOpened?'orange':COLOR_FIRST)})()}} className="p-1 text-6xl fas fa-search z-50"></button>
                            </div>
                        </div>
                    )
                }
            </div>
            </>
        );
    }
}

Home.propTypes = {
    checkAuth:PropTypes.func.isRequired,
    disableFullScreen:PropTypes.func.isRequired,
    setScreenSize:PropTypes.func.isRequired
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated,
        project:state.project.Project,
        isFullScreen:state.screen.isFullScreen,
        screenSize:state.screen.screenSize,
        overviewOpened:state.screen.overviewOpened,
        glanceOpened:state.screen.glanceOpened
    }
}

const actions = {checkAuth, disableFullScreen, setScreenSize}


export default connect(mapStateToProps,actions)(Home);
