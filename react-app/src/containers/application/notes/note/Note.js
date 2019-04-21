import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// Components
import Selector from './Selector'
import OptionsContainer from './OptionsContainer'
import DialogWindow from './DialogWindow'
// queries
import { ALL_NOTES, SWITCH_NOTES_SELECTOR, DELETE_NOTES } from "./../queries"
// styled components
import { CheckmarkContainerStyledDiv } from './Selector'
import { OptionsContainerStyledDiv } from './OptionsContainer'

export const NoteContainerStyledDiv = styled.div`
  width: 256px;
  margin: 8px;
  padding: 12px;
  box-shadow: inset 0 0 0 ${(props) => props.isSelected ? 2 : 0}pt #3E3E3E, 0 0 0 1px #E3E3E3;
  border-radius: 6px;
  background-color: white;
  transition: box-shadow 0.2s;
  visibility: ${props => props.visibility};

  &.red {
    background-color: #FFDDDD;
  }

  &.green {
    background-color: #C3FFBB;
  }

  &.blue {
    background-color: #E4F3FF;
  }

  &.yellow {
    background-color: #FFF6A7;
  }

  &.purple {
    background-color: #FFA1C9;
  }

  &:hover {
    box-shadow: inset 0 0 0 ${(props) => props.isSelected ? 2 : 0}pt #3E3E3E, 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }

  &:hover ${CheckmarkContainerStyledDiv} {
    opacity: 100;
  }

  &:hover ${OptionsContainerStyledDiv} {
    opacity: 100;
  }
`
export const TitleStyledH3 = styled.h3`
  font-size: 1.5em;
`

export const ContentStyledP = styled.p`
  font-size: 1em;
`

function Note(props) {
  const [isSelected, setIsSelected] = useState(false)
  const handleSelection = () => {
    setIsSelected(!isSelected)
  }
  return (
    <DialogWindow>
      <NoteContainerStyledDiv isSelected={isSelected} className={props.node.color.label} > 
        <Selector 
          handleSelection={handleSelection}
          isSelected={isSelected} 
          variables={{
            id: props.node.id,
            isSelected: !props.isSelected
          }}
        />
        <p>{props.number}</p>
        {props.node.title && <TitleStyledH3>{props.node.title}</TitleStyledH3>}
        {props.node.content && <ContentStyledP>{props.node.content}</ContentStyledP>}
        <OptionsContainer node={props.node} />
      </NoteContainerStyledDiv>
    </DialogWindow>
  )
}

Note.propTypes = {
  node: PropTypes.object,
}

export default Note