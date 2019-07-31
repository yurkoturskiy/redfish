import React from "react";
import { css } from "linaria";
import MaterialIcon from "@material/react-material-icon";
// Local components
import DeleteOption from "./DeleteOption";

const wrapper = css`
  margin-left: auto;
  align-self: center;
`;

export default function(props) {
  return (
    <div className={wrapper}>
      <DeleteOption selectedNotes={props.selectedNotes} />
    </div>
  );
}
