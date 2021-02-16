// React
import React from 'react';
import {Redirect} from 'react-router-dom';
// Redux
import { connect } from 'react-redux';
import { setScreenSize } from "../actions/screenActions";
// CSS
import "../static/css/Landing.css";
// etc
import PropTypes from "prop-types";
// Components
import LandingNav from '../components/desktop/landing/LandingNav';
import Introduction from '../components/desktop/landing/Introduction';
import ContainerFirst from '../components/desktop/landing/ContainerFirst';
import ContainerSecond from '../components/desktop/landing/ContainerSecond';
import ContainerThird from '../components/desktop/landing/ContainerThird';
import ContainerFourth from '../components/desktop/landing/ContainerFourth';
import Conclusion from '../components/desktop/landing/Conclusion';

class Landing extends React.Component {

    componentDidMount() {
        window.scrollTo(0,0)
        const setScreenSize = this.props.setScreenSize
        setScreenSize(window.innerWidth)
        window.onresize = function() {
            setScreenSize(window.innerWidth)
        }
    }

    render() {

        const screenSize = this.props.screenSize

        if(this.props.isAuthenticated) {
        
            const user_id = window.localStorage.getItem('user_id');
    
            return (
                <Redirect to={{pathname:`/${user_id}/home`}} />
            )
        } else {
            return (
                <div id="landing" className="flex flex-col items-center justify-start">
    
                    <LandingNav screenSize={screenSize} />
    
                    <Introduction screenSize={screenSize} />
    
                    <div className='description w-full 2xl:w-11/12 border-t-2'>
    
                        <ContainerFirst screenSize={screenSize} />
    
                        <ContainerSecond screenSize={screenSize} />
    
                        <ContainerThird screenSize={screenSize} />
    
                        <ContainerFourth screenSize={screenSize} />
    
                    </div>
    
                    <Conclusion />

                </div>
            )
        }
    }

}


Landing.propTypes = {
    setScreenSize:PropTypes.func.isRequired
}


const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated,
        screenSize:state.screen.screenSize
    }
}


export default connect(mapStateToProps, {setScreenSize})(Landing);
