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
import Conclusion from '../components/desktop/landing/Conclusion';

class Landing extends React.Component {

    componentDidMount() {
        window.scrollTo(0,0)
    }

    render() {

        if(this.props.isAuthenticated) {
        
            const user_id = window.localStorage.getItem('user_id');
    
            return (
                <Redirect to={{pathname:`/${user_id}/home`}} />
            )
        } else {
            return (
                <div id="landing" className="flex flex-col items-center justify-start">
    
                    <LandingNav />
    
                    <Introduction />
    
                    <div className='description w-full 2xl:w-11/12 border-t-2'>
    
                        <ContainerFirst />
    
                        <ContainerSecond />
    
                        <ContainerThird />
    
                        <ContainerFourth />
    
                    </div>
    
                    <Conclusion />

                </div>
            )
        }
    }

}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.login.isAuthenticated
    }
}


export default connect(mapStateToProps, null)(Landing);
