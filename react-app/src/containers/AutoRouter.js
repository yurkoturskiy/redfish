import React from "react";
import { graphql } from "react-apollo";
import { Route, Switch } from "react-router-dom";
// container components
import Authentication from "./Authentication";
import Main from "./landing/MainContainer";
import Login from "./auth/login/Login";
import Registration from "./auth/registration/Registration";
import EmailConfirmStatus from "./auth/registration/EmailConfirmStatus";
import PasswordReset from "./auth/passwordReset/PasswordReset";
import PasswordResetConfirm from "./auth/passwordReset/PasswordResetConfirm";
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
          {/* for not loged in users */}
          <Route exact path="/" component={Application} />
          <Route path="/login" component={Login} />
          <Route path="/registration" component={Registration} />
          <Route
            path="/email-confirm-status/:status/"
            component={EmailConfirmStatus}
          />
          <Route exact path="/password-reset" component={PasswordReset} />
          <Route
            path="/password-reset/confirm/:uid/:token"
            component={PasswordResetConfirm}
          />
          {/* auth required */}
          <Route path="/profile" component={Profile} />
          <Route path="/app" component={Application} />
          {/* neutral */}
          <Route path="/product" component={Main} />
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
