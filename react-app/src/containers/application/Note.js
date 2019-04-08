import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

export const NoteCard = styled.div`
  width: 256px;
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
  return (
    <NoteCard>
      <p>{props.index}</p>
      {props.node.title && <NoteTitle>{props.node.title}</NoteTitle>}
      {props.node.content && <NoteContent>{props.node.content}</NoteContent>}
    </NoteCard>
  )
}

export default Note