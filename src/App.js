// React
import React from 'react';
import { HashRouter, Route } from "react-router-dom";
// Redux
import { Provider } from 'react-redux';
import store from './store/store';
// Routes
import Enter from './routes/Enter';
// CSS
import './static/css/styles.css';


function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path='/' exact component={Enter} />
      </HashRouter>
    </Provider>
  );
}

export default App;
