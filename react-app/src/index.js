import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import GlobalContainer from './containers/GlobalContainer'
import * as serviceWorker from './serviceWorker'
import { Router } from 'react-router-dom'
import history from './history'
import {Provider} from 'react-redux'
import store from './store/configureStore'


ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <GlobalContainer />
    </Provider>
  </Router>, document.getElementById('root'));
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
