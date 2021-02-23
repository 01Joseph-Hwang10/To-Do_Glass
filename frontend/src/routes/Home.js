// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import {checkAuth} from '../actions/useractions/authActions';
import { 
    disableFullScreen, 
    focusPinboard, 
    openGlance, 
    openOverview, 
    setScreenSize,
    showScrollButton,
    hideScrollButton 
} from "../actions/screenActions";
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
        setInterval(function(){CheckAuth(isAuthenticated); }, (1000*60*60*24 - 1000*60*5) )
        const setScreenSize = this.props.setScreenSize
        setScreenSize(window.innerWidth)
        window.onresize = function() {
            setScreenSize(window.innerWidth)
        }
        if(window.innerWidth < 1024) this.props.hideScrollButton()
    }

    render() {

        const pinboardIsLoaded = Boolean(Object.keys(this.props.project).length > 0)
        const isFullScreen = this.props.isFullScreen
        const screenSize = this.props.screenSize

        const overviewOpened = this.props.overviewOpened
        const glanceOpened = this.props.glanceOpened
        const scrollButtonVisible = this.props.scrollButtonVisible

        const showScrollButton = this.props.showScrollButton
        const hideScrollButton = this.props.hideScrollButton

        let overviewWidth, overviewOpacity, pinboardWidth, glanceWidth, glanceOpacity,delay,overviewDelay,glanceDelay
        if(screenSize >= 1024) {
            overviewWidth = (function(){return(isFullScreen?"0%":"17%")})()
            overviewOpacity = (function(){return(isFullScreen?0:1)})()
            pinboardWidth = (function(){return(isFullScreen?"90%":"50%")})()
            glanceWidth = (function(){return(isFullScreen?"0%":"25%")})()
            glanceOpacity = (function(){return(isFullScreen?0:1)})()
            delay = (function(){return(isFullScreen?"":"0.4s")})()
            overviewDelay = delay
            glanceDelay = delay
            showScrollButton()
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
            overviewDelay = (function(){return(overviewOpened?'0.4s':'')})()
            glanceDelay = (function(){return(glanceOpened?'0.4s':'')})()
        }

        const switchScrollVisible = () => {
            if (scrollButtonVisible) {
                hideScrollButton()
            } else {
                showScrollButton()
            }
        }

        const openOverview = this.props.openOverview
        const focusPinboard = this.props.focusPinboard
        const openGlance = this.props.openGlance

        const switchOverview = () => {
            if(!overviewOpened) {
                openOverview()
            } else {
                focusPinboard()
            }
        }

        const switchGlance = () => {
            if(!glanceOpened) {
                openGlance()
            } else {
                focusPinboard()
            }
        }

        return (
            <>
            <div className="scroller mt-16 flex justify-center w-full overflow-x-hidden">
                <div className="container m-2 rounded p-3" style={{
                    width:overviewWidth,
                    opacity:overviewOpacity,
                    transition:`width 0.5s, opacity 0.1s ease-in-out ${overviewDelay}`
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
                    transition:`width 0.5s, opacity 0.1s ease-in-out ${glanceDelay}`
                }}>
                    <Glance />
                </div>
                {
                    screenSize >= 1024 ? (
                        <></>
                    ) : (
                        <div className="fixed bottom-0 w-full z-50 flex justify-center items-center">
                            <div id="controlBar" className="rounded-t-lg p-4 pb-0 pt-1 border-2 border-b-none flex justify-center items-center space-x-5 shadow-md" style={{backgroundColor:COLOR_FIFTH}}>
                                <button onClick={switchOverview} style={{color:(function(){return(overviewOpened?'orange':COLOR_FIRST)})(),transition:'all 0.1s ease-in-out'}} className="p-1 text-4xl fas fa-user z-50 overview"></button>
                                <button onClick={this.props.focusPinboard} style={{color:(function(){return(!overviewOpened && !glanceOpened?'orange':COLOR_FIRST)})(),transition:'all 0.1s ease-in-out'}} className="p-1 text-4xl fas fa-clipboard z-50 pinboard"></button>
                                <button onClick={switchGlance} style={{color:(function(){return(glanceOpened?'orange':COLOR_FIRST)})(),transition:'all 0.1s ease-in-out'}} className="p-1 text-4xl fas fa-search z-50 glance"></button>
                                <button onClick={switchScrollVisible} style={{color:(function(){return(scrollButtonVisible?"orange":COLOR_FIRST)})(),transition:'all 0.1s ease-in-out'}} className="fas fa-chevron-circle-right text-4xl z-50 p-1 border-l-2 pl-4 toggleScrollButton"></button>
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
    setScreenSize:PropTypes.func.isRequired,
    openOverview:PropTypes.func.isRequired,
    openGlance:PropTypes.func.isRequired,
    focusPinboard:PropTypes.func.isRequired,
    showScrollButton:PropTypes.func.isRequired,
    hideScrollButton:PropTypes.func.isRequired,
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated,
        project:state.project.Project,
        isFullScreen:state.screen.isFullScreen,
        screenSize:state.screen.screenSize,
        overviewOpened:state.screen.overviewOpened,
        glanceOpened:state.screen.glanceOpened,
        scrollButtonVisible:state.screen.scrollButtonVisible
    }
}

const actions = {
    checkAuth,
    disableFullScreen,
    setScreenSize,
    openOverview,
    openGlance,
    focusPinboard,
    showScrollButton,
    hideScrollButton,
}


export default connect(mapStateToProps,actions)(Home);
