import React, { useState } from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
// Components
import Selector from "./Selector";
import OptionsContainer from "./OptionsContainer";
import DialogWindow from "./DialogWindow";
import Pin from "./Pin";

export const container = css`
  position: relative;
  width: 240px;
  min-height: 112px;
  margin: 8px;
  padding: 12px;
  box-shadow: var(--container-box-shadow);
  border-radius: 6px;
  transition: box-shadow 0.2s;
  opacity: var(--opacity);
  background-color: var(--note-color);

  @media (max-width: 379px) {
    /* Extra small */
    width: 130px;
  }

  @media (min-width: 380px) and (max-width: 767px) {
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
    background-color: var(--note-color);
    opacity: 0;
    fill: var(--pin-icon-color);
    transition: opacity 0.2s, fill 0.2s;
  }

  .pin:hover {
    fill: var(--pin-icon-color-hover);
  }

  &:hover .pin {
    opacity: 100;
  }

  .options {
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    position: absolute;
    width: 96%;
    bottom: 4px;
    left: 4px;
    flex-direction: row;
    text-align: center;
    height: 48px;
    opacity: 0;
  }

  &:hover .options {
    opacity: 100;
  }

  .options-icon {
    position: relative;
    height: 32px;
    width: 32px;
  }

  .material-icons {
    line-height: 32px;
    color: rgba(0, 0, 0, 0.7);
  }

  .material-icons:hover {
    color: rgba(0, 0, 0, 0.9);
  }

  .checkmark-container {
    position: absolute;
    padding: 0px;
    height: 18px;
    width: 18px;
    border-radius: 12px;
    background-color: var(--checkmark-background-color);
    top: -6px;
    left: -6px;
    opacity: var(--checkmark-opacity);
    transition: opacity 0.4s, background-color 0.2s;
  }

  &:hover .checkmark-container {
    opacity: 100;
  }

  .checkmark-material-icon {
    transform: translate(-3px, -8px);
    font-size: 24px;
    fill: #3e3e3e;
    user-select: none;
  }
`;

export const title = css`
  font-size: 1.5em;
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 140%;
  color: #5c5c5c;
`;

export const contentContainer = css`
  height: 100%;
  max-height: 600px;
  overflow: hidden;

  @media (max-width: 1024px) {
    /* Extra small */
    max-height: 300px;
  }
`;

export const content = css`
  font-style: normal;
  font-weight: normal;
  font-size: 1rem;
  line-height: 140%;
  color: #3c3c3c;
`;

// Context
export const NoteNode = React.createContext();

function Note(props) {
  const [inEdit, setInEdit] = useState(false);
  const [visible, setVisible] = useState(true);
  var noteColorVariable = `var(--note-color-${props.node.color.toLowerCase()})`;
  var cutText = (text, numOfSymbols) => {
    let regex = new RegExp(`^(.{${numOfSymbols}}[^s]*).*`);
    return text === null ? "" : text.replace(regex, "$1");
  };
  var contentText = cutText(props.node.content, 500);
  var titleText = props.node.title;
  const switchVisibility = () => {
    setVisible(visible => !visible);
  };
  const containerBorderWidth = props.node.color !== "WHITE" ? "0px" : "1px";
  return (
    <NoteNode.Provider value={props.node}>
      <DialogWindow
        inEdit={inEdit}
        setInEdit={setInEdit}
        switchVisibility={switchVisibility}
      >
        <div
          {...props.draggableItem}
          className={container}
          style={{
            "--note-color": noteColorVariable,
            "--container-box-shadow": `inset 0 0 0 ${
              props.isSelected ? 2 : 0
            }pt #3E3E3E, 0 0 0 ${containerBorderWidth} #E3E3E3`,
            "--container-box-shadow-hover": `inset 0 0 0 ${
              props.isSelected ? 2 : 0
            }pt #3E3E3E, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)`,
            "--opacity": visible ? 1 : 0
          }}
          id={props.node.id}
        >
          <Selector isSelected={props.isSelected} id={props.node.id} />
          <Pin />
          <div className={contentContainer} onClick={() => setInEdit(true)}>
            {props.node.title && <h3 className={title}>{titleText}</h3>}
            {props.node.content && <p className={content}>{contentText}</p>}
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
