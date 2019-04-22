import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { CSSTransition } from 'react-transition-group'

const Wrapper = styled.div`
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

const DialogWindowStyledDiv = styled.div`
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
const Background = styled.div`
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
    <Wrapper>
      <CSSTransition
        in={props.inEdit}
        timeout={300}
        classNames="dialog"
        unmountOnExit
      >
        <DialogWindowStyledDiv>
          <h1>{props.node.title}</h1>
          <p>{props.node.content}</p>
        </DialogWindowStyledDiv>
      </CSSTransition>
      {props.inEdit && <Background onClick={() => props.setInEdit(false)} />}
      {props.children}
    </Wrapper>
  );
}

DialogWindow.propTypes = {
  inEdit: PropTypes.bool,
  setInEdit: PropTypes.func,
  node: PropTypes.object,
}

export default DialogWindow