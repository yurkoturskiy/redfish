import React from "react";
import { graphql } from "react-apollo";
import { Route, Switch } from "react-router-dom";
// container components
import Authentication from "./Authentication";
import Logout from "./Logout";
import Application from "./application/Application";
import Profile from "./profile/Profile";
// graphql
import appState from "../graphql/appState";

export const endpoints = {
  passwordReset: "/password-reset"
};

function AutoRouter(props) {
  console.log("is authenticated", props.isAuthenticated);
  if (props.isAuthenticated) {
    // Return the app if user is authenticated
    return (
      <React.Fragment>
        {props.children}
        <Switch>
          <Route exact path="/" component={Application} />
          <Route path="/profile" component={Profile} />
          <Route path="/app" component={Application} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </React.Fragment>
    );
  } else {
    // Return the authentication component at first to authenticate user
    // Redirect to login page if credentials are wrong
    return (
      <div>
        <Authentication />
        <p>spinner</p>
      </div>
    );
  }
}

export default graphql(appState, {
  props: ({ data: { isAuthenticated } }) => ({
    isAuthenticated
  })
})(AutoRouter);
