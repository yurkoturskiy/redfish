import React from "react";
// components
import NotesContainer from "./notes/NotesContainer"
import Logo from "./Logo"


class Application extends React.Component {
  render() {
    return (
      <div>
        <Logo/>
        <NotesContainer/>
      </div>
    );
  }
}

export default Application;
