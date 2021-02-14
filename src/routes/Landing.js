// React
import React from 'react';
// Redux
import { connect } from 'react-redux';
import {Redirect} from 'react-router-dom';
// CSS
import "../static/css/Landing.css";
// Components
import LandingNav from '../components/desktop/landing/LandingNav';
import Introduction from '../components/desktop/landing/Introduction';
import ContainerFirst from '../components/desktop/landing/ContainerFirst';
import ContainerSecond from '../components/desktop/landing/ContainerSecond';
import ContainerThird from '../components/desktop/landing/ContainerThird';
import ContainerFourth from '../components/desktop/landing/ContainerFourth';

function Landing(props) {

    if(props.isAuthenticated) {
        
        const user_id = window.localStorage.getItem('user_id');

        return (
            <Redirect to={{pathname:`/${user_id}/home`}} />
        )
    } else {
        return (
            <div id="landing" className="flex flex-col items-center justify-start">

                <LandingNav />

                <Introduction />
                
                <div className="my-10 w-full"></div>

                <div className='description w-10/12 2xl:w-8/12'>

                    <ContainerFirst />

                    <div className="my-16 w-full"></div>

                    <ContainerSecond />

                    <div className="my-16 w-full"></div>

                    <ContainerThird />

                    <div className="my-16 w-full"></div>

                    <ContainerFourth />

                </div>

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated
    }
}


export default connect(mapStateToProps, null)(Landing);
