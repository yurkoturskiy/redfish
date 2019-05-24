import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import gql from "graphql-tag";
// Components
import Selector from "./Selector";
import OptionsContainer from "./OptionsContainer";
import DialogWindow from "./DialogWindow";
import Pin from "./Pin";
// queries
import {
  ALL_NOTES,
  SWITCH_NOTES_SELECTOR,
  DELETE_NOTES,
  SELECTED_NOTES
} from "./../queries";

export const container = css`
  width: 256px;
  margin: 8px;
  padding: 12px;
  box-shadow: var(--container-box-shadow);
  border-radius: 6px;
  background-color: var(--container-background-color);
  transition: box-shadow 0.2s;
  opacity: var(--opacity);

  @media (max-width: 767px) {
    /* Extra small */
    width: 160px;
  }

  @media (min-width: 768px) and (max-width: 991px) {
    /* Small */
    width: 256px;
  }

  @media (min-width: 991px) and (max-width: 1199px) {
    /* Medium */
    width: 256px;
  }

  @media (min-width: 1200px) {
    /* Large */
    width: 256px;
  }

  &:hover {
    box-shadow: var(--container-box-shadow-hover);
  }

  .pin {
    position: absolute;
    right: 12px;
    top: 12px;
    height: 24px;
    width: 24px;
    background-color: pink;
    opacity: 0;
  }

  &:hover .pin {
    opacity: 100;
  }

  .options {
    display: flex;
    flex-direction: row;
    height: 32px;
    outline: 1px solid grey;
    width: 100%;
    left: 0;
    opacity: 0;
  }

  &:hover .options {
    opacity: 100;
  }

  .checkmark-container {
    position: absolute;
    padding: 0px;
    height: 18px;
    width: 18px;
    border-radius: 12px;
    background-color: var(--checkmark-background-color);
    top: 0;
    left: 0;
    opacity: var(--checkmark-opacity);
    transition: opacity 0.4s, background-color 0.2s;
  }

  &:hover .checkmark-container {
    opacity: 100;
  }

  .checkmark-material-icon {
    transform: translate(-3px, -3px);
    font-size: 24px;
    fill: #3e3e3e;
    user-select: none;
  }
`;

export const title = css`
  font-size: 1.5em;
`;

export const content = css`
  font-size: 1em;
`;

// Context
export const NoteNode = React.createContext();

function Note(props) {
  const [inEdit, setInEdit] = useState(false);

  return (
    <NoteNode.Provider value={props.node}>
      <DialogWindow inEdit={inEdit} setInEdit={setInEdit}>
        <div
          {...props.draggableItem}
          className={container}
          style={{
            "--container-background-color": `#${props.node.color.value}`,
            "--container-box-shadow": `inset 0 0 0 ${
              props.isSelected ? 2 : 0
            }pt #3E3E3E, 0 0 0 1px #E3E3E3`,
            "--container-box-shadow-hover": `inset 0 0 0 ${
              props.isSelected ? 2 : 0
            }pt #3E3E3E, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)`,
            "--opacity": inEdit ? 0 : 1
          }}
          id={props.node.id}
        >
          <Selector isSelected={props.isSelected} id={props.node.id} />
          <Pin />
          <div onClick={() => setInEdit(true)}>
            <p>{props.node.order}</p>
            <p>{props.node.pinned ? "pinned" : "not pinned"}</p>
            {props.node.title && <h3 className={title}>{props.node.title}</h3>}
            {props.node.content && (
              <p className={content}>{props.node.content}</p>
            )}
          </div>
          <OptionsContainer node={props.node} />
        </div>
      </DialogWindow>
    </NoteNode.Provider>
  );
}

Note.propTypes = {
  node: PropTypes.object
};

export default Note;
