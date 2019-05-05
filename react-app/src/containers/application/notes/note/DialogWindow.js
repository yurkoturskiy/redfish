import React, { useState } from 'react'
import { css } from 'linaria'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'

const wrapper = css`
  .dialog-enter {
    opacity: 0;
    transform: scale(0.9);
  }
  .dialog-enter-active {
    opacity: 1;
    transform: translateX(0);
    transition: opacity 300ms, transform 300ms;
  }
  .dialog-exit {
    opacity: 1;
  }
  .dialog-exit-active {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 300ms, transform 300ms;
  }
`

const dialogWindow = css`
  position: fixed;
  top: 0;
  left: 50%;
  top: 200px;
  margin-left: -400px;
  z-index: 4;
  width: 800px;
  background-color: white;
  border-radius: 6px;
  box-shadow: 0px 3px 26px 0px rgba(0,0,0,0.3);
`
const background = css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  z-index: 3;
`

function DialogWindow(props) {
  return (
    <div className={wrapper}>
      <CSSTransition
        in={props.inEdit}
        timeout={300}
        classNames="dialog"
        unmountOnExit
      >
        <div className={dialogWindow}>
          <h1>{props.node.title}</h1>
          <p>{props.node.content}</p>
        </div>
      </CSSTransition>
      {props.inEdit && <div className={background} onClick={() => props.setInEdit(false)} />}
      {props.children}
    </div>
  );
}

DialogWindow.propTypes = {
  inEdit: PropTypes.bool,
  setInEdit: PropTypes.func,
  node: PropTypes.object,
}

export default DialogWindow