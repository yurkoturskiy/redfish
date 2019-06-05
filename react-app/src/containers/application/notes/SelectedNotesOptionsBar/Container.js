import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { css } from "linaria";
// Local components
import DeselectAll from "./DeselectAll";
import NumOfSelectedNotes from "./NumOfSelectedNotes";
import { SELECTED_NOTES } from "../queries";

// Linaria style
const barWrapper = css`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4;
  width: 100%;
  height: 64px;
  background-color: white;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
`;

function SelectedNotesOptionsBar() {
  const { data } = useQuery(SELECTED_NOTES);
  return (
    <div className={barWrapper}>
      <DeselectAll />
      <NumOfSelectedNotes number={data.selectedNotes.length} />
    </div>
  );
}

export default SelectedNotesOptionsBar;
