import React from "react";
import { css } from "linaria";

const paragraph = css`
  display: inline-block;
  line-height: 64px;
`;

function NumOfSelectedNotes(props) {
  return <p className={paragraph}>{props.number} selected</p>;
}

export default NumOfSelectedNotes;
