import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import MaterialIcon from '@material/react-material-icon';

export const StyledDiv = styled.div`
  width: 256px;
  margin: 8px;
  padding: 12px;
  box-shadow: inset 0 0 0 ${(props) => props.isSelected ? 2 : 0}pt #3E3E3E, 0 0 0 1px #E3E3E3;
  border-radius: 6px;
  background-color: white;
  transition: box-shadow 0.2s;
  visibility: ${props => props.visibility};

  &:hover {
    box-shadow: inset 0 0 0 ${(props) => props.isSelected ? 2 : 0}pt #3E3E3E, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  .title {
    font-size: 1.5em;  
  }

  .content {
    font-size: 1em;
  }

  &:hover .container {
    opacity: 100;
  }


  .container {
    position: absolute;
    padding: 0px;
    height: 18px;
    width: 18px;
    border-radius: 12px;
    background-color: ${(props) => props.isSelected ? "grey" : "white"};
    top: 0;
    left: 0;
    opacity: ${(props) => props.isSelected ? 100 : 0};
    transition: opacity 0.4s, background-color 0.2s;
  }

  .container input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  .checkmark {
    transform:translate(-3px, -3px);
    font-size: 24px;
    fill: #3E3E3E;
  }

  .container:hover input ~ .checkmark {
    color: #3E3E3E;
  }

  .container input:checked ~ .checkmark {
    color: #3E3E3E;
  }
`

function Note(props) {
  const [isSelected, setIsSelected] = useState(false)
  return (
    <React.Fragment>
      <StyledDiv isSelected={isSelected}> 
        <label className="container">
          <input type="checkbox" onClick={() => setIsSelected(!isSelected)} />
          <MaterialIcon className="checkmark"  icon='check_circle' />
        </label>

        <p>{props.index}</p>
        {props.node.title && <h3 className="title">{props.node.title}</h3>}
        {props.node.content && <p className="content">{props.node.content}</p>}
      </StyledDiv>
    </React.Fragment>
  )
}

export default Note