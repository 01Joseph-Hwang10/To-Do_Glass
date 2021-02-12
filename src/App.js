// React
import React from 'react';
import { HashRouter, Route } from "react-router-dom";
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


function App() {
  return (
      <HashRouter>
        <div className="scroller w-full text-gray-800">
          <Navigation />
          <Route path='/' exact component={Landing} />
          <div className="scroller mt-20" style={{minHeight:"100vh"}}>
            <Route path='/:id/home' exact component={Home} />
            <Route path='/:id/social' exact component={Social} />
            <Route path='/:id/edit_profile' exact component={updateProfileForm} />
            <Route path='/login' exact component={LoginForm} />
            <Route path='/signup' exact component={SignUpForm} />
          </div>
          <Footer />
        </div>
      </HashRouter>
  );
}

export default App;
