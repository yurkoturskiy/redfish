import React from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import { Query } from "react-apollo";
import MaterialIcon from "@material/react-material-icon";
// queries
import { ALL_COLORS } from "./../queries";
// components
import ColorPoint from "./ColorPoint";

export const container = css`
  position: relative;
  height: 32px;
  width: 32px;
  outline: 1px solid red;
`;

export const colorOptionIcon = css`
  line-height: 32px;
`;

export const colorsBox = css`
  display: none;
  position: absolute;
  top: 0;
  transform: translate(0, -100px);
  height: 100px;
  width: 100px;
  background-color: white;
  border-radius: 8px;

  .${container}:hover & {
    display: flex;
    flex-wrap: wrap;
  }
`;

function ColorOption(props) {
  return (
    <Query query={ALL_COLORS}>
      {({ loading, error, data: { allColors } }) => {
        if (loading) return <p>loading</p>;
        if (error) return <p>error</p>;
        const colorOptions = allColors.edges.map(({ node }) => (
          <ColorPoint key={node.id} color={node} noteId={props.node.id} />
        ));
        return (
          <div className={container}>
            <div className={colorsBox}>{colorOptions}</div>
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
