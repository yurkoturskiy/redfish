import React from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import { Query } from "react-apollo";
import MaterialIcon from "@material/react-material-icon";
// queries
import { ALL_COLORS } from "../../../graphql/queries";
// components
import ColorPoint from "./ColorPoint";
import ColorsBox from "./ColorsBox";

export const container = css`
  position: relative;
  height: 32px;
  width: 32px;

  .material-icons {
    line-height: 32px;
  }
`;

export const colorOptionIcon = css`
  line-height: 32px;
`;

function ColorOption(props) {
  return (
    <Query query={ALL_COLORS}>
      {({ loading, error, data }) => {
        var colorOptions;
        if (data) {
          colorOptions = data.allColors.map(color => (
            <ColorPoint key={color} color={color} noteId={props.node.id} />
          ));
        }
        return (
          <div className="options-icon">
            {data && <ColorsBox>{colorOptions}</ColorsBox>}
            <MaterialIcon icon="color_lens" className={colorOptionIcon} />
          </div>
        );
      }}
    </Query>
  );
}

ColorOption.propTypes = {
  node: PropTypes.object
};

export default ColorOption;
