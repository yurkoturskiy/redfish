import React from "react";
import { css } from "linaria";
// Local components
import DeselectAll from "./DeselectAll";
import NumOfSelectedNotes from "./NumOfSelectedNotes";
import ControlIcons from "./ControlIcons";

// Linaria style
const barWrapper = css`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 64px;
  background-color: white;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

function SelectedNotesOptionsBar(props) {
  return (
    <div className={barWrapper}>
      <DeselectAll />
      <NumOfSelectedNotes number={props.selectedNotes.length} />
      <ControlIcons selectedNotes={props.selectedNotes} />
    </div>
  );
}

export default SelectedNotesOptionsBar;
