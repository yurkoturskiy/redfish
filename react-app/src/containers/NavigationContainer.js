import React from "react";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";
// components
import AppNavBar from "./application/AppNavBar";
// graphql
import logout from "../graphql/logout";

function NavigationContainer(props) {
  const logout = () => {
    props.client.query({ query: logout });
    localStorage.removeItem("token");
    props.client.cache.reset();
    props.history.push("/login");
    console.log("logout");
  };
  return <AppNavBar />;
}

export default withApollo(withRouter(NavigationContainer));
