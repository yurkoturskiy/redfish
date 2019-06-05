import React, { useState } from "react";
import PropTypes from "prop-types";
import { useMutation } from "@apollo/react-hooks";
import MaterialIcon from "@material/react-material-icon";
// queries
import { SWITCH_NOTES_SELECTOR } from "./../queries";

function Selector(props) {
  const [isSelected, setIsSelected] = useState(false);

  const [switchNotesSelector] = useMutation(SWITCH_NOTES_SELECTOR, {
    variables: { id: props.id }
  });

  const handleSelection = () => {
    setIsSelected(!isSelected);
    switchNotesSelector();
  };

  return (
    <div
      className="checkmark-container"
      style={{
        "--checkmark-background-color": isSelected ? "grey" : "white",
        "--checkmark-opacity": isSelected ? 100 : 0
      }}
    >
      <MaterialIcon
        className="checkmark-material-icon"
        onClick={handleSelection}
        icon="check_circle"
      />
    </div>
  );
}

Selector.propTypes = {
  isSelected: PropTypes.bool,
  handleSelection: PropTypes.func,
  variables: PropTypes.object
};

export default Selector;
