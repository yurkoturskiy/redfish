import React, { useState, useContext } from "react";
import * as log from "loglevel";
import PropTypes from "prop-types";
import { css } from "linaria";
import { Mutation } from "react-apollo";
// queries
import { ALL_NOTES, UPDATE_COLOR } from "../../../graphql/queries";
// context
import { NoteNode } from "./Note";

export const colorOption = css`
  height: 24px;
  width: 24px;
  margin: 3px;
  border-radius: 4px;
`;

function ColorPoint(props) {
  const color = `var(--note-color-${props.color.toLowerCase()}`;
  const node = useContext(NoteNode);
  return (
    <Mutation
      mutation={UPDATE_COLOR}
      variables={{ id: props.noteId, color: props.color }}
      optimisticResponse={{
        updateNote: {
          newNote: {
            ...node,
            color: props.color,
            __typename: "NoteNode"
          },
          __typename: "UpdateNotePayload"
        }
      }}
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
