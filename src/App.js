// React
import React from 'react';
import { HashRouter, Route } from "react-router-dom";
// Redux
import { Provider } from 'react-redux';
import store from './store/store';
// CSS
import './static/css/styles.css';
// Routes
import Landing from './routes/Landing';
import LoginForm from './mixins/auth/LoginForm';
import SignUpForm from './mixins/auth/SignUpForm';
import Navigation from './components/Navigation';
import Home from './routes/Home';


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Navigation />
        <Route path='/' exact component={Landing} />
        <div>
          <Route path='/home' exact component={Home} />
          <Route path='/login' exact component={LoginForm} />
          <Route path='/signup' exact component={SignUpForm} />
        </div>
      </HashRouter>
    </Provider>
  );
}

export default App;
