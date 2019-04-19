import React, { useState } from 'react'
import { Mutation } from "react-apollo";
// queries
import { ALL_NOTES, ADD_NOTE } from './queries'



const updateCache = (cache, { data: { addNote: { newNote } } }) => {
  const cacheData = cache.readQuery({ query: ALL_NOTES })
  // remember cursors
  var allCursors = []
  cacheData.allNotes.edges.forEach(edge => {
    allCursors.push(edge.cursor)
  })
  // new edge prototype
  var newEdge = {
    cursor: undefined, // setup in the reset cursors section
    node: newNote,
    __typename: "NoteNodeEdge"
  }
  // include new edge as first item 
  // and exclude the last one without the cursor
  cacheData.allNotes.edges.unshift(newEdge)
  cacheData.allNotes.edges.pop()
  // reset cursors
  cacheData.allNotes.edges.forEach((edge, index) =>  {
    edge.cursor = allCursors[index]
  })
  cache.writeQuery({ query: ALL_NOTES, data: cacheData })
}

function AddNote() {
  let input;
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")

  return (
    <Mutation mutation={ADD_NOTE} update={updateCache}>
      {(addNote, { data }) => (
        <div>
          <form
            onSubmit={async e => {
              e.preventDefault()
              await addNote({ variables: { title: title, content: content } })
              setTitle("")
              setContent("")
            }}
          >
            <input
              id="title"
              value={title}
              type="text"
              onChange={e => setTitle(e.target.value)}
            />
            <input
              id="content"
              value={content}
              type="text"
              onChange={e => setContent(e.target.value)}
            />
            <button type="submit">Add Nodo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
}

export default AddNote