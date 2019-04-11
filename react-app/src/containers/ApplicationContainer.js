import React from "react";
import Notes from "./application/Notes"
import AddNote from "./application/AddNote"



class Application extends React.Component {
  render() {
    return (
      <div>
        <AddNote/>
        <Notes/>
      </div>
    );
  }
}

export default Application;
