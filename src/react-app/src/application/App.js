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
import Spinner from "./Spinner";
// Queries
import { APP_COMPONENT } from "../graphql/queries";

// Global linaria's css styles
import "@material/react-text-field/dist/text-field.css";
import "@material/react-button/dist/button.css";
import "@material/react-material-icon/dist/material-icon.css";
import "@material/react-fab/dist/fab.css";
import "@material/react-icon-button/dist/icon-button.css";
export const globals = css`
  :global() {
    @import url("https://maxcdn.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css");
    @import url("https://fonts.googleapis.com/css?family=Fira+Sans");
    @import url("https://fonts.googleapis.com/icon?family=Material+Icons");

    :root {
      --grey-01: #e6e6e6;
      --grey-02: #cccccc;
      --grey-03: #b2b2b2;
      --grey-04: #999999;
      --grey-05: #808080;
      --grey-06: #666666;
      --grey-07: #4c4c4c;
      --grey-08: #333333;
      --grey-09: #1a1a1a;

      --pin-icon-color: rgba(0, 0, 0, 0.4);
      --pin-icon-color-hover: rgba(0, 0, 0, 0.8);

      --note-color-white: white;
      --note-color-red: #f28b82;
      --note-color-orange: #ffd34f;
      --note-color-yellow: #fff476;
      --note-color-green: #d3f096;
      --note-color-blue: #afcbfa;
      --note-color-violet: #d7aefc;
    }

    body {
      font-family: "Roboto", sans-serif;
      margin: 0;
      padding: 0 0 128px 0;
    }
    .masonry {
      margin: 28px auto 0 auto;
      max-width: 1440px;
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

  <Query query={APP_COMPONENT}>
    {({ data }) => {
      return (
        <React.Fragment>
          {data.isLoading && <Spinner />}
          {data.isAuthenticated ? (
            <React.Fragment>
              <NavigationBar />
              <Switch>
                <Route exact path="/" component={NotesContainer} />
                <Route path="/profile" component={Profile} />
                <Route path="/logout" component={Logout} />
              </Switch>
            </React.Fragment>
          ) : (
            <div>
              <Authentication />
            </div>
          )}
        </React.Fragment>
      );
    }}
  </Query>
);

export default App;
