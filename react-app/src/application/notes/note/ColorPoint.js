import React, { useState } from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import { Mutation } from "react-apollo";
// queries
import { ALL_NOTES, UPDATE_NOTES_COLOR } from "../../../graphql/queries";

export const colorOption = css`
  height: 24px;
  width: 24px;
  margin: 3px;
  border-radius: 4px;
`;

function ColorPoint(props) {
  const color = `var(--note-color-${props.color.toLowerCase()}`;
  const updateNote = (cache, { data }) => {
    var cacheData = cache.readQuery({ query: ALL_NOTES });
    cacheData.allNotes.edges.map(edge => {
      if (edge.node.id === props.noteId) {
        return (edge.node.color = data.updateNotesColor.newColor);
      }
      return edge;
    });
    cache.writeQuery({ query: ALL_NOTES, data: cacheData });
  };
  return (
    <Mutation
      mutation={UPDATE_NOTES_COLOR}
      update={updateNote}
      variables={{ id: props.noteId, newColor: props.color }}
    >
      {(updateNotesColor, { data }) => (
        <div
          className={colorOption}
          style={{ backgroundColor: color }}
          onClick={async e => {
            e.preventDefault();
            await updateNotesColor();
          }}
        />
      )}
    </Mutation>
  );
}

ColorPoint.propTypes = {
  noteId: PropTypes.string,
  color: PropTypes.string
};

export default ColorPoint;
