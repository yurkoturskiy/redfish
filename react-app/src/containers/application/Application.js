import React from "react";
// components
import NotesContainer from "./notes/NotesContainer";
import Logo from "./Logo";
import PreferencesBtn from "./preferences/PreferencesBtn";

class Application extends React.Component {
  render() {
    return (
      <div>
        <NotesContainer />
      </div>
    );
  }
}

export default Application;
