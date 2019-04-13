import React, { useState } from 'react'
import { Mutation } from "react-apollo";
// queries
import { ALL_NOTES, ADD_NOTE } from './queries'



const updateCache = (cache, { data: { addNote } }) => {
  const { allNotes } = cache.readQuery({ query: ALL_NOTES })
  const injection = {
    node: addNote.newNote,
    __typename: "NoteNodeEdge"
  }
  allNotes.edges.unshift(injection)
  allNotes.edges.pop()
  cache.writeQuery({
    query: ALL_NOTES,
    data: {
      allNotes: allNotes
    }
  })
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