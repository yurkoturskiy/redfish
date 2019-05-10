import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { withApollo, compose, graphql } from "react-apollo";
import gql from "graphql-tag";
// components
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import LandingNavBar from "./landing/LandingNavBar";
import AppNavBar from "./application/AppNavBar";
// graphql
import icon from "../static/icon.svg";
import appState from "../graphql/appState";
import logout from "../graphql/logout";

class NavigationContainer extends React.Component {
  constructor(props) {
    super(props);
    this.logout = this.logout.bind(this);
  }
  logout() {
    this.props.client.query({ query: logout });
    localStorage.removeItem("token");
    this.props.client.cache.reset();
    this.props.history.push("/login");
    console.log("logout");
  }
  render() {
    if (this.props.isAuth) {
      return <AppNavBar />;
    } else {
      return <LandingNavBar />;
    }
  }
}

export default withApollo(
  withRouter(
    compose(
      graphql(appState, {
        props: ({ data: { isAuth } }) => ({
          isAuth
        })
      })
    )(NavigationContainer)
  )
);
