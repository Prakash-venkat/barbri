import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'

import configureStore from './config/configureStore';
import * as serviceWorker from './serviceWorker';
import './assets/base.scss';
import { HashRouter, Route, Switch } from "react-router-dom";
// import Admin from './admin/DemoPages/Main';


import App from './App';
// const store = createStore(
//     combineReducers({
//         configureStore : configureStore
//   }),
//     applyMiddleware(thunk, logger)
//   )

const store = configureStore();

  ReactDOM.render(
  
  <Provider store={store}>
      <HashRouter>
      <App/>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
)




serviceWorker.unregister();
if (module.hot && process.env.NODE_ENV === "development") {
    module.hot.accept("./LoadableApp", () => {
        const NextApp = require("./LoadableApp").default;
        ReactDOM.render(<NextApp />, 'root');
    });
}

