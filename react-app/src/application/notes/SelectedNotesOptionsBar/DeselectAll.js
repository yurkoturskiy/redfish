import React from "react";
import { withApollo } from "react-apollo";
import { css } from "linaria";

const deselectAll = css`
  display: inline-block;
  font-size: 16px;
  width: 64px;
  text-align: center;
  line-height: 64px;
  color: red;
`;

function DeselectAll(props) {
  const cleanSelectedNotesState = () => {
    props.client.writeData({ data: { selectedNotes: [] } });
  };
  return (
    <div className={deselectAll} onClick={() => cleanSelectedNotesState()}>
      X
    </div>
  );
}

export default withApollo(DeselectAll);
