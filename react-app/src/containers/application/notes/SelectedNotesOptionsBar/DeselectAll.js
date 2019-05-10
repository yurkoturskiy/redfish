import React from "react";
import { withApollo } from "react-apollo";
import { css } from "linaria";

const deselectAll = css`
  display: inline-block;
  font-size: 16px;
  color: red;
  padding: 12px;
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
