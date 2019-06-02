import React from "react";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";
// components
import AppNavBar from "./application/AppNavBar";
// graphql
import logout from "../graphql/logout";

function NavigationContainer(props) {
  return <AppNavBar />;
}

export default withApollo(withRouter(NavigationContainer));
