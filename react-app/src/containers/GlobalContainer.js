import React from "react";
// container components
import AutoRouter from "./AutoRouter";
import AppNavBar from "./application/AppNavBar";

// global style
import { css } from "linaria";
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

function GlobalContainer() {
  return (
    <AutoRouter>
      <AppNavBar />
    </AutoRouter>
  );
}

export default GlobalContainer;
