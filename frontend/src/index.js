// React
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
// Redux
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store/store';
// etc
// import './store/i18n'
// Sentry
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
// App
import App from './App';

if(process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: "https://7f5461adeb874ddb8ac371cf9b9ed756@o496976.ingest.sentry.io/5645252",
    integrations: [new Integrations.BrowserTracing()],

    // We recommend adjusting this value in production, or using tracesSampler
    // for finer control
    tracesSampleRate: 0.5,
  });
}


const { store, persistor } = configureStore();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
