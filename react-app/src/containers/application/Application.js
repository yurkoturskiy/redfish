import React from "react";
// components
import NotesContainer from "./notes/NotesContainer"
import Logo from "./Logo"
import PreferencesBtn from "./PreferencesBtn"


class Application extends React.Component {
  render() {
    return (
      <div>
        <Logo/>
        <NotesContainer/>
        <PreferencesBtn/>
      </div>
    );
  }
}

export default Application;
