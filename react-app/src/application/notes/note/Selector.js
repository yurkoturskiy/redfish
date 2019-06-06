import React from "react";
import PropTypes from "prop-types";
import { Mutation } from "react-apollo";
import MaterialIcon from "@material/react-material-icon";
// queries
import { SWITCH_NOTES_SELECTOR } from "../../../graphql/queries";

function Selector(props) {
  return (
    <Mutation mutation={SWITCH_NOTES_SELECTOR} variables={{ id: props.id }}>
      {switchNotesSelector => (
        <div
          className="checkmark-container"
          style={{
            "--checkmark-background-color": props.isSelected ? "grey" : "white",
            "--checkmark-opacity": props.isSelected ? 100 : 0
          }}
        >
          <MaterialIcon
            className="checkmark-material-icon"
            onClick={switchNotesSelector}
            icon="check_circle"
          />
        </div>
      )}
    </Mutation>
  );
}

Selector.propTypes = {
  isSelected: PropTypes.bool,
  handleSelection: PropTypes.func,
  variables: PropTypes.object
};

export default Selector;
