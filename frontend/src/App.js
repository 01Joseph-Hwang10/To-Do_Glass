// React
import React from 'react';
import { HashRouter, Route } from "react-router-dom";
// Redux
import { connect } from 'react-redux';
// CSS
import './static/css/styles.css';
// Routes
import Landing from './routes/Landing';
import LoginForm from './mixins/auth/LoginForm';
import SignUpForm from './mixins/auth/SignUpForm';
import Navigation from './components/desktop/Navigation';
import Home from './routes/Home';
import Footer from './components/desktop/Footer';
import updateProfileForm from './mixins/updateProfileForm';
import Social from './routes/Social';
import ResetPassword from './mixins/auth/ResetPassword';


function App(props) {

  const onLanding = props.onLanding
  const minHeight = (function(){return(onLanding?"auto":"100vh")})()

  return (
      <HashRouter>
        <div className="w-full text-gray-800">
          <Route path='/' exact component={Landing} />
          <Navigation />
          <div className="mt-20" style={{minHeight:minHeight}}>
            <Route path='/:id/home' exact component={Home} />
            <Route path='/:id/social' exact component={Social} />
            <Route path='/:id/edit_profile' exact component={updateProfileForm} />
            <Route path='/login' exact component={LoginForm} />
            <Route path='/signup' exact component={SignUpForm} />
            <Route path='/reset_password' exact component={ResetPassword} />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </HashRouter>
  );
}

const mapStateToProps = state => {
  return {
    onLanding:state.onLanding.onLanding,
    screenSize:state.screen.screenSize
  }
}

export default connect(mapStateToProps,null)(App);
