import React from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import { useMutation } from "@apollo/react-hooks";

// queries
import { ALL_NOTES, UPDATE_NOTES_COLOR } from "./../queries";

export const colorOption = css`
  box-shadow: inset 0px 0px 0px 2px rgba(255,255,255,1);
  height: 32px;
  width: 32px
  border-radius: 16px;
`;

function ColorPoint(props) {
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

  const [updateNotesColor] = useMutation(UPDATE_NOTES_COLOR, {
    variables: { id: props.noteId, newColor: props.color.label },
    update: updateNote
  });

  return (
    <div
      className={colorOption}
      style={{ backgroundColor: `#${props.color.value}` }}
      onClick={async e => {
        e.preventDefault();
        await updateNotesColor();
      }}
    />
  );
}

ColorPoint.propTypes = {
  noteId: PropTypes.string,
  color: PropTypes.object
};

export default ColorPoint;
