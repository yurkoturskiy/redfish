import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { Route, Switch } from "react-router-dom";
// container components
import Authentication from "./Authentication";
import Logout from "./Logout";
import Application from "./application/Application";
import Profile from "./profile/Profile";
// graphql
import { IS_AUTHENTICATED } from "../graphql/queries";

export const endpoints = {
  passwordReset: "/password-reset"
};

function AutoRouter(props) {
  const {
    data: { isAuthenticated }
  } = useQuery(IS_AUTHENTICATED);

  console.log("is authenticated", isAuthenticated);
  if (isAuthenticated) {
    // Return the app if user is authenticated
    return (
      <React.Fragment>
        {props.children}
        <Switch>
          {/* for not loged in users */}
          <Route exact path="/" component={Application} />
          {/* auth required */}
          <Route path="/profile" component={Profile} />
          <Route path="/app" component={Application} />
          <Route path="/logout" component={Logout} />
          {/* neutral */}
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

export default AutoRouter;
