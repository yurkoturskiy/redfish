import React, { useState, useContext, useEffect } from "react";
import { css } from "linaria";
import PropTypes from "prop-types";
import { CSSTransition } from "react-transition-group";
// Context
import { NoteNode } from "./Note";

const wrapper = css`
  .dialog-enter {
    top: var(--card-pos-y);
    left: var(--card-pos-x);
    width: var(--card-width);
    height: var(--card-height);
    margin-left: 0px;
    opacity: 1;
  }

  .dialog-enter-active {
    opacity: 1;
    left: 50%;
    top: 200px;
    width: 800px;
    margin-left: -400px;
    height: auto;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms, width 300ms, height 300ms,
      left 300ms, top 300ms, margin-left 300ms;
  }

  .dialog-exit {
    opacity: 1;
    width: 800px;
    height: var(--dialog-height);
  }

  .dialog-exit-active {
    opacity: 1;
    width: var(--card-width);
    height: var(--card-height);
    top: var(--card-pos-y);
    left: var(--card-pos-x);
    margin-left: 0px;
    transition: opacity 300ms, transform 300ms, width 300ms, height 300ms,
      left 300ms, top 300ms, margin-left 300ms;
  }
`;

const dialogWindow = css`
  position: fixed;
  height: auto;
  top: 0;
  left: 50%;
  top: 200px;
  margin-left: -400px;
  z-index: 4;
  width: 800px;
  background-color: white;
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
  const [cardWidth, setCardWidth] = useState();
  const [cardHeight, setCardHeight] = useState();
  const [cardPosX, setCardPosX] = useState();
  const [cardPosY, setCardPosY] = useState();
  const [dialogHeight, setDialogHeight] = useState();
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
          style={{ backgroundColor: `#${node.color.value}` }}
          id={`${node.id}-dialog`}
        >
          <h1>{node.title}</h1>
          <p>{node.content}</p>
        </div>
      </CSSTransition>
      {props.inEdit && (
        <div className={background} onClick={() => props.setInEdit(false)} />
      )}
      {props.children}
    </div>
  );
}

DialogWindow.propTypes = {
  inEdit: PropTypes.bool,
  setInEdit: PropTypes.func
};

export default DialogWindow;
