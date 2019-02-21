import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const NoteCard = styled.div`
  width: 240px;
  position: absolute;
  margin: 8px;
  padding: 12px;
  border: 1px solid #D9D9D9;
  border-radius: 6px;
  background-color: white;
  transition: transform ${props => props.transition}s;
  visibility: ${props => props.visibility};
`

export const NoteTitle = styled.h3`
  font-size: 1.5em;
`

export const NoteContent = styled.p`
  font-size: 1em;
`

function Note(props) {
  const [position, setPosition] = useState(undefined)
  const [height, setHeight] = useState(0)
  const [visibility, setVisibility] = useState("hidden")
  const [transition, setTransition] = useState(0)
  useEffect(() => {
    if (position) {
      setTransition(0.5)
    }
    if (props.columns) {
      setHeight(document.getElementById(props.node.id).offsetHeight)
      let newPosition = props.updateCards(props.index, position, props.node.id)
      setPosition(newPosition)
      setVisibility("visible")
    }
  }, [props.columns, props.cardsSampleProps])
  return (
    <NoteCard 
      style={{
        transform: `translate(${position ? position.x : 0}px, ${position ? position.y : 0}px)`,
      }}
      transition={transition} 
      visibility={visibility} 
      id={props.node.id}
    >
      <p>#{props.index}</p>
      {props.node.title && <NoteTitle>{props.node.title}</NoteTitle>}
      {props.node.content && <NoteContent>{props.node.content}</NoteContent>}
    </NoteCard>
  )
}

export default Note