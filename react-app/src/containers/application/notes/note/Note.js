import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { css } from 'linaria'
import gql from 'graphql-tag'
// Components
import Selector from './Selector'
import OptionsContainer from './OptionsContainer'
import DialogWindow from './DialogWindow'
// queries
import { ALL_NOTES, SWITCH_NOTES_SELECTOR, DELETE_NOTES, SELECTED_NOTES } from "./../queries"
// styled components
import { CheckmarkContainerStyledDiv } from './Selector'
import { OptionsContainerStyledDiv } from './OptionsContainer'

export const container = css`
  width: 256px;
  margin: 8px;
  padding: 12px;
  box-shadow: var(--container-box-shadow);
  border-radius: 6px;
  background-color: var(--container-background-color);
  transition: box-shadow 0.2s;
  opacity: var(--opacity);

  &:hover {
    box-shadow: var(--container-box-shadow-hover)
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
    transform:translate(-3px, -3px);
    font-size: 24px;
    fill: #3E3E3E;
    user-select: none;
  }
`

export const title = css`
  font-size: 1.5em;
`

export const content = css`
  font-size: 1em;
`


function Note(props) {
  const [inEdit, setInEdit] = useState(false);

  return (
    <DialogWindow 
      inEdit={inEdit} 
      setInEdit={setInEdit}
      node={props.node}
    >
      <div 
        {...props.draggableItem}
        className={container}
        style={{
          '--container-background-color': `#${props.node.color.value}`,
          '--container-box-shadow': `inset 0 0 0 ${props.isSelected ? 2 : 0}pt #3E3E3E, 0 0 0 1px #E3E3E3`,
          '--container-box-shadow-hover': `inset 0 0 0 ${props.isSelected ? 2 : 0}pt #3E3E3E, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)`,
          '--opacity': inEdit ? 0 : 1
        }}
        id={props.node.id}
      > 
        <Selector 
          isSelected={props.isSelected}
          id={props.node.id}
        />
        <div onClick={() => setInEdit(true)}>
          {props.node.title && <h3 className={title} >{props.node.title}</h3>}
          {props.node.content && <p className={content} >{props.node.content}</p>}
        </div>
        <OptionsContainer node={props.node} />
      </div>
    </DialogWindow>
  )
}

Note.propTypes = {
  node: PropTypes.object,
}

export default Note