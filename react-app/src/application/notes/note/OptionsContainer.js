import React, { useState } from "react";
import PropTypes from "prop-types";
// local components
import DeleteOption from "./DeleteOption";
import ColorOption from "./ColorOption";

function OptionsContainer(props) {
  const noteColorVariable = `var(--note-color-${props.node.color.toLowerCase()})`;
  return (
    <div className="options" style={{ backgroundColor: noteColorVariable }}>
      <DeleteOption node={props.node} />
      <ColorOption node={props.node} />
    </div>
  );
}

OptionsContainer.propTypes = {
  node: PropTypes.object
};

export default OptionsContainer;
