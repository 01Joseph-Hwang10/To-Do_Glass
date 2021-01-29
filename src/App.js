// React
import React from 'react';
import { HashRouter, Route } from "react-router-dom";
// CSS
import './static/css/styles.css';
// Routes
import Landing from './routes/Landing';
import LoginForm from './mixins/auth/LoginForm';
import SignUpForm from './mixins/auth/SignUpForm';
import Navigation from './components/Navigation';
import Home from './routes/Home';
import Footer from './components/Footer';



function App() {
  return (
      <HashRouter>
        <div className="w-full text-gray-800">
          <Navigation />
          <Route path='/' exact component={Landing} />
          <div className="mt-14" style={{minHeight:"75vh"}}>
            <Route path='/:id/home' exact component={Home} />
            <Route path='/login' exact component={LoginForm} />
            <Route path='/signup' exact component={SignUpForm} />
          </div>
          <Footer />
        </div>
      </HashRouter>
  );
}

export default App;
