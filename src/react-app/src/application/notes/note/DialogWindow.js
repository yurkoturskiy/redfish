import React, { useState, useContext, useEffect, useRef } from "react";
import { withApollo } from "react-apollo";
import { css } from "linaria";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
// Context
import { NoteNode } from "./Note";
// Queries
import { EDIT_NOTE } from "../../../graphql/queries";

export const titleInput = css`
  display: var(--add-note-title-input-display);
  vertical-align: top;
  padding: 16px 20px 16px 20px;
  border: 0px;
  border-radius: 6px;
  font-size: 16px;
  height: 56px;
  resize: none;
  width: 500px;
  background: transparent;
`;

export const contentInput = css`
  vertical-align: top;
  padding: 16px 20px 16px 20px;
  border: 0px;
  border-radius: 6px;
  width: 500px;
  font-size: 16px;
  resize: none;
  heigth: 56px;
  background: transparent;
`;

const wrapper = css`
  .dialog-enter {
    top: var(--card-pos-y);
    left: var(--card-pos-x);
    width: var(--card-width);
    height: var(--card-height);
    max-height: var(--card-height);
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    margin-left: 0px;
    opacity: 1;
  }

  .dialog-enter-active {
    opacity: 1;
    left: 50%;
    top: 200px;
    width: 500px;
    margin-left: -250px;
    height: auto;
    box-shadow: 0px 3px 26px 0px rgba(0, 0, 0, 0.3);
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms, width 300ms, height 300ms,
      left 300ms, top 300ms, margin-left 300ms, box-shadow 300ms;
  }

  .dialog-exit {
    opacity: 1;
    width: 500px;
  }

  .dialog-exit-active {
    opacity: 1;
    width: var(--card-width);
    max-height: var(--card-height);
    top: var(--card-pos-y);
    left: var(--card-pos-x);
    margin-left: 0px;
    box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0.3);
    transition: opacity 300ms, transform 300ms, width 300ms, height 300ms,
      left 300ms, top 300ms, margin-left 300ms, box-shadow 300ms;
  }
`;

const dialogWindow = css`
  position: fixed;
  overflow: hidden;
  height: auto;
  top: 0;
  left: 50%;
  top: 200px;
  margin-left: -250px;
  z-index: 4;
  width: 500px;
  border-radius: 6px;
  box-shadow: 0px 3px 26px 0px rgba(0, 0, 0, 0.3);
`;
const background = css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  z-index: 3;
`;

function DialogWindow(props) {
  const node = useContext(NoteNode);
  var noteColorVariable = `var(--note-color-${node.color.toLowerCase()})`;
  const [cardWidth, setCardWidth] = useState();
  const [cardHeight, setCardHeight] = useState();
  const [cardPosX, setCardPosX] = useState();
  const [cardPosY, setCardPosY] = useState();
  const [dialogHeight, setDialogHeight] = useState();
  const [title, setTitle] = useState(node.title);
  const [content, setContent] = useState(node.content);
  const contentInputRef = useRef();
  const titleInputRef = useRef();
  useEffect(() => {
    const element = document.getElementById(node.id);
    setCardHeight(`${element.offsetHeight}px`);
    setCardWidth(`${element.offsetWidth}px`);
  }, []);
  useEffect(() => {
    const element = document.getElementById(node.id);
    var rect = element.getBoundingClientRect();
    setCardPosX(rect.left);
    setCardPosY(rect.top);
    setDialogHeight(() => {
      if (props.inEdit) {
        const dialogElement = document.getElementById(`${node.id}-dialog`);
        return dialogElement.offsetHeight;
      }
      return dialogHeight;
    });
  }, [props, dialogHeight, node.id]);

  useEffect(() => {
    // Adjust height of the title field
    if (props.inEdit) {
      var outerHeight = parseInt(
        window.getComputedStyle(titleInputRef.current).height,
        10
      );
      var diff = outerHeight - titleInputRef.current.clientHeight;
      titleInputRef.current.style.height = 0;
      titleInputRef.current.style.height =
        Math.max(56, titleInputRef.current.scrollHeight + diff) + "px";
    }
  }, [title, titleInputRef, props.inEdit]);

  useEffect(() => {
    // Adjust height of the content field
    if (props.inEdit) {
      var outerHeight = parseInt(
        window.getComputedStyle(contentInputRef.current).height,
        10
      );
      var diff = outerHeight - contentInputRef.current.clientHeight;
      contentInputRef.current.style.height = 0;
      contentInputRef.current.style.height =
        Math.max(56, contentInputRef.current.scrollHeight + diff) + "px";
    }
  }, [content, contentInputRef, props.inEdit]);

  const onTitleChange = event => setTitle(event.target.value);

  const onContentChange = event => setContent(event.target.value);

  const closeEdit = () => {
    // Send new data to the server and close dialog window
    props.client.mutate({
      mutation: EDIT_NOTE,
      variables: {
        id: node.id,
        title,
        content
      },
      optimisticResponse: {
        updateNote: {
          newNote: {
            ...node,
            title,
            content,
            __typename: "NoteNode"
          },
          __typename: "UpdateNotePayload"
        }
      }
    });
    props.setInEdit(false);
  };

  return (
    <div
      className={wrapper}
      style={{
        "--card-width": cardWidth,
        "--card-height": cardHeight,
        "--card-pos-x": `${cardPosX}px`,
        "--card-pos-y": `${cardPosY}px`,
        "--dialog-height": `${dialogHeight}px`
      }}
    >
      <CSSTransition
        in={props.inEdit}
        timeout={300}
        classNames="dialog"
        onEnter={() => props.switchVisibility()}
        onExited={() => props.switchVisibility()}
        unmountOnExit
      >
        <div
          className={dialogWindow}
          style={{ backgroundColor: noteColorVariable }}
          id={`${node.id}-dialog`}
        >
          <form>
            <textarea
              className={titleInput}
              onChange={e => onTitleChange(e)}
              type="text"
              value={title}
              ref={titleInputRef}
            />
            <textarea
              className={contentInput}
              onChange={e => onContentChange(e)}
              type="text"
              value={content}
              ref={contentInputRef}
            />
          </form>
        </div>
      </CSSTransition>
      {props.inEdit && (
        <div className={background} onClick={() => closeEdit()} />
      )}
      {props.children}
    </div>
  );
}

DialogWindow.propTypes = {
  inEdit: PropTypes.bool,
  setInEdit: PropTypes.func
};

export default withApollo(DialogWindow);
