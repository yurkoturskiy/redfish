import React from "react";
import { css } from "linaria";

const paragraph = css`
  display: inline-block;
  padding: 12px 12px 12px 12px;
`;

function NumOfSelectedNotes(props) {
  return <p className={paragraph}>items selected: {props.number}</p>;
}

export default NumOfSelectedNotes;
