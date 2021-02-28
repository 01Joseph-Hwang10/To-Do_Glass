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
import { scrollToTop } from '../functions/scrollFunctions';

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
        if(window.innerWidth < 1024) {
            this.props.hideScrollButton()
            this.props.openOverview()
        }
    }

    render() {

        const pinboardIsLoaded = Boolean(Object.keys(this.props.project).length > 0)
        const isFullScreen = this.props.isFullScreen
        const screenSize = this.props.screenSize
        const marginTop = (function(){return(screenSize>=640?'1.25rem':'')})()

        const overviewOpened = this.props.overviewOpened
        const glanceOpened = this.props.glanceOpened
        const scrollButtonVisible = this.props.scrollButtonVisible

        const showScrollButton = this.props.showScrollButton
        const hideScrollButton = this.props.hideScrollButton

        let overviewWidth, overviewOpacity, pinboardWidth, pinboardOpacity, glanceWidth, glanceOpacity,delay,overviewDelay,glanceDelay, pinboardDelay, 
            widthDuration, opacityDuration, overviewDisplay,pinboardDisplay, glanceDisplay,padding,margin
        if(screenSize >= 1024) {
            overviewDisplay = 'block'
            pinboardDisplay = 'block'
            glanceDisplay = 'block'
            widthDuration = '0.5s'
            opacityDuration = '0.1s'
            overviewWidth = (function(){return(isFullScreen?"0%":"17%")})()
            overviewOpacity = (function(){return(isFullScreen?0:1)})()
            pinboardWidth = (function(){return(isFullScreen?"100%":"50%")})()
            pinboardOpacity = 1
            glanceWidth = (function(){return(isFullScreen?"0%":"25%")})()
            glanceOpacity = (function(){return(isFullScreen?0:1)})()
            delay = (function(){return(isFullScreen?"":"0.4s")})()
            overviewDelay = delay
            pinboardDelay = ''
            glanceDelay = delay
            padding = '0'
            margin='1rem'
            showScrollButton()
        }
        if(screenSize < 1024 && screenSize >= 640) {
            overviewDisplay = 'block'
            pinboardDisplay = 'block'
            glanceDisplay = 'block'
            widthDuration = '0.5s'
            opacityDuration = '0.1s'
            overviewWidth = (function(){return(overviewOpened?"35%":'0%')})()
            overviewOpacity = (function(){return(overviewOpened?1:0)})()
            pinboardWidth = (function(){
                if(overviewOpened) return '60%'
                if(glanceOpened) return '50%'
                return '100%'
            })()
            pinboardOpacity = 1
            glanceWidth = (function(){return(glanceOpened?'45%':'0%')})()
            glanceOpacity = (function(){return(glanceOpened?1:0)})()
            overviewDelay = (function(){return(overviewOpened?'0.4s':'')})()
            pinboardDelay = ''
            glanceDelay = (function(){return(glanceOpened?'0.4s':'')})()
            padding = '0'
            margin='1rem'
        }
        if(screenSize < 640) {
            overviewDisplay = (function(){return(overviewOpened?'block':'none')})()
            pinboardDisplay = (function(){return(!overviewOpened&&!glanceOpened?'block':'none')})()
            glanceDisplay = (function(){return(glanceOpened?'block':'none')})()
            widthDuration = '0s'
            opacityDuration = '0s'
            overviewWidth = '100%'
            overviewOpacity = 1
            pinboardWidth = '100%'
            pinboardOpacity = 1
            glanceWidth = '100%'
            glanceOpacity = 1
            overviewDelay = ''
            pinboardDelay = ''
            glanceDelay = ''
            padding = '0.5rem'
            margin='0'
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
            if(screenSize < 640 ) scrollToTop()
        }

        const switchGlance = () => {
            if(!glanceOpened) {
                openGlance()
            } else {
                focusPinboard()
            }
            if(screenSize < 640) scrollToTop()
        }

        const switchPinboard = () => {
            focusPinboard()
            if(screenSize < 640 && pinboardIsLoaded) {
                const textarea = document.querySelector(`.projectDetail`).querySelector('textarea')
                textarea.style.height = '1px'
                textarea.style.height = (24+textarea.scrollHeight) +'px'
            }
        }

        return (
            <>
            <div className="scroller mt-16 flex justify-center w-full overflow-x-hidden">
                <div className="container rounded px-2" style={{
                    width:overviewWidth,
                    opacity:overviewOpacity,
                    transition:`width ${widthDuration} ease-in-out, opacity ${opacityDuration} ease-in-out ${overviewDelay}`,
                    marginTop:marginTop,
                    display:overviewDisplay,
                    paddingRight:padding,
                    paddingLeft:padding,
                    marginRight:margin
                }}>
                    <Overview />
                </div>
                <div className="container" style={{
                    width:pinboardWidth,
                    opacity:pinboardOpacity,
                    transition:`width ${widthDuration} ease-in-out, opacity ${opacityDuration} ease-in-out ${pinboardDelay}`,
                    display:pinboardDisplay
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
                <div className="container mt-6 px-2" style={{
                    width:glanceWidth,
                    opacity:glanceOpacity,
                    transition:`width ${widthDuration} ease-in-out, opacity ${opacityDuration} ease-in-out ${glanceDelay}`,
                    display:glanceDisplay,
                    paddingLeft:padding,
                    paddingRight:padding,
                    marginLeft:margin
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
                                <button onClick={switchPinboard} style={{color:(function(){return(!overviewOpened && !glanceOpened?'orange':COLOR_FIRST)})(),transition:'all 0.1s ease-in-out'}} className="p-1 text-4xl fas fa-clipboard z-50 pinboard"></button>
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
