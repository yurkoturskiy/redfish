import React, { useState } from "react";
import { css } from "linaria";
import { Query } from "react-apollo";

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
      <p>items selected: {props.selectedNotes.length}</p>
    </div>
  );
}

export default SelectedNotesOptionsBar;
