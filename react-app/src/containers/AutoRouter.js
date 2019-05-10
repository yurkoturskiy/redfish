import React from "react";
import { withRouter } from "react-router";
import { graphql } from "react-apollo";
import { Route, Switch } from "react-router-dom";
// container components
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

const authEndpoints = ["/profile", "/app"];

const notAuthEndpoints = ["/", "/login", "/registration", "/password-reset"];

class AutoRouter extends React.Component {
  constructor(props) {
    super(props);
    this.checkPermission();
  }
  componentDidUpdate(prevProps) {
    this.checkPermission();
    console.log(this.props);
  }
  checkPermission() {
    // Auto-redirection
    if (this.props.isAuth) {
      for (let i in notAuthEndpoints) {
        if (this.props.location.pathname === notAuthEndpoints[i]) {
          console.log("you logged in");
          this.props.history.push("/app");
        }
      }
    } else {
      for (let i in authEndpoints) {
        if (this.props.location.pathname === authEndpoints[i]) {
          this.props.history.push("/login");
        }
      }
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.props.children}
        <Switch>
          {/* for not loged in users */}
          <Route exact path="/" component={Main} />
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
  }
}

export default graphql(appState, {
  props: ({ data: { isAuth } }) => ({
    isAuth
  })
})(withRouter(AutoRouter));
