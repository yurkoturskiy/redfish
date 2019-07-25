import React from "react";
import ReactDOM from "react-dom";
import * as log from "loglevel";
// container components
import App from "./application/App";
import { ApolloProvider } from "react-apollo";
import { Router } from "react-router-dom";
// others
import * as serviceWorker from "./serviceWorker";
import history from "./history";
import apolloClient from "./apolloClient";

// Set env variables
log.setLevel(process.env.REACT_APP_LOG_LEVEL);
log.info("landing ulr:", process.env.REACT_APP_LANDING_URL);
log.info("server url:", process.env.REACT_APP_SERVER_URL);

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
