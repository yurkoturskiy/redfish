import React from "react";
import ReactDOM from "react-dom";
// container components
import App from "./application/App";
import { ApolloProvider } from "react-apollo";
import { Router } from "react-router-dom";
// others
import * as serviceWorker from "./serviceWorker";
import history from "./history";
import apolloClient from "./apolloClient";

// Set env variables
let activeEnv =
  process.env.REACT_APP_ENV || process.env.NODE_ENV || "development";
require("dotenv").config({
  path: `.env.${activeEnv}`
});
activeEnv !== "production" && console.log(activeEnv, "environment");

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
