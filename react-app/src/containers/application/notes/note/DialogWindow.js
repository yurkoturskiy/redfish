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
  const [dialogWindow, setDialogWindow] = useState(false);
  const onClickHandler = () => {
    setDialogWindow(true)
  }
  const renderChildren =
    React.Children.map(props.children, (child, index) => {
      // Change eash child
      let newComponent = React.cloneElement(child, {
        onClick: onClickHandler,
        style: dialogWindow ? {
          opacity: 0,
        } : undefined
      })
      return newComponent;
    });
  return (
    <Wrapper>
      <CSSTransition
        in={dialogWindow}
        timeout={300}
        classNames="dialog"
        unmountOnExit
      >
        <DialogWindowStyledDiv>
          {props.children}
        </DialogWindowStyledDiv>
      </CSSTransition>
      {dialogWindow && <Background onClick={() => setDialogWindow(false)} />}
      {renderChildren}
    </Wrapper>
  );
}

export default DialogWindow