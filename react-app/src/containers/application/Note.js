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
      console.log("columns", props.columns)
      let newPosition = props.updateCards(props.index, position, props.node.id)
      setPosition(newPosition)
      setVisibility("visible")
      console.log("new position", newPosition)
      console.log('old position', position)
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