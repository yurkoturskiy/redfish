import React from "react";
import { css } from "linaria";
import { Query } from "react-apollo";
import { Route, Switch } from "react-router-dom";
// Local components
import NavigationBar from "./NavigationBar";
import Authentication from "./Authentication";
import Logout from "./Logout";
import NotesContainer from "./notes/NotesContainer";
import Profile from "./profile/Profile";
// Queries
import { IS_AUTHENTICATED } from "../graphql/queries";

// Global linaria's css styles
import "@material/react-text-field/dist/text-field.css";
import "@material/react-button/dist/button.css";
import "@material/react-material-icon/dist/material-icon.css";
import "@material/react-fab/dist/fab.css";
export const globals = css`
  :global() {
    @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
    @import url("https://fonts.googleapis.com/css?family=Fira+Sans");
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

    body {
      font-family: "Fira Sans", sans-serif;
      margin: 0;
      padding: 0;
    }
  }
`;

const App = () => (
  /*
   * The root component of the app beyond the infrastracture ones.
   * The algorithm:
   * - Get isAuthenticated state from the global state storage
   * - Initialize the app from the Authentication component, which has to
   *   approve user's credentials and set isAuthenticated state to true or
   *   refuse them by cleanup fake token and redirect a user to the login page.
   * - After Authentication component set isAuthenticated state to true
   *   this component will display app's components by routing urls.
   *   Also it provide navigation component
   */

  <Query query={IS_AUTHENTICATED}>
    {({ data }) => {
      if (data.isAuthenticated)
        return (
          <React.Fragment>
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={NotesContainer} />
              <Route path="/profile" component={Profile} />
              <Route path="/logout" component={Logout} />
            </Switch>
          </React.Fragment>
        );
      else
        return (
          <div>
            <Authentication />
            <p>spinner</p>
          </div>
        );
    }}
  </Query>
);

export default App;
