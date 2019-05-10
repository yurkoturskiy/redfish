import React, { useState } from "react";
import { css } from "linaria";
import { Query } from "react-apollo";
// Local components
import DeselectAll from "./DeselectAll";
import NumOfSelectedNotes from "./NumOfSelectedNotes";

// Linaria style
const barWrapper = css`
  position: fixed;
  top: 0;
  left: 50%;
  z-index: 4;
  width: 500px;
  height: 48px;
  margin-left: -250px;
  background-color: lightgrey;
`;

function SelectedNotesOptionsBar(props) {
  return (
    <div className={barWrapper}>
      <DeselectAll />
      <NumOfSelectedNotes number={props.selectedNotes.length} />
    </div>
  );
}

export default SelectedNotesOptionsBar;
