import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { 
  NoteCard,
  NoteTitle,
  NoteContent,
} from "../../components/Notes"

const theme = {
  margin: '8px',
  padding: '12p',
  border: '1px solid grey'
}

function Note(props) {
  const [position, setPosition] = useState({x: 0, y: 0})
  const [height, setHeight] = useState(0)
  useEffect(() => {
    setHeight(document.getElementById(props.node.id).offsetHeight)
    console.log("columns", props.columns)
    let newPosition = props.updateCards(props.index, position, props.node.id)
    setPosition(newPosition)
    console.log("new position", newPosition)
  }, [props.columns, props.cardsSampleProps])
  return (
    <NoteCard position={position} id={props.node.id}>
      <p>#{props.index}</p>
      {props.node.title && <NoteTitle>{props.node.title}</NoteTitle>}
      {props.node.content && <NoteContent>{props.node.content}</NoteContent>}
    </NoteCard>
  )
}

export default Note