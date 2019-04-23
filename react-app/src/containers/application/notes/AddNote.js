import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Mutation } from "react-apollo";
// queries
import { ALL_NOTES, ADD_NOTE } from './queries'

export const WrapperStyledDiv = styled.div`
  position: ${props => props.isActive ? 'fixed' : 'absolute'};
  z-index: 2;
  border-radius: 6px;
  top: ${props => props.isActive ? '20vh' : '20px'};
  left: 50%;
  margin: 0 0 0 -250px;
  transition: top 0.4s, box-shadow 1s;
  background-color: white;
  box-shadow: ${props => props.isActive ? '0px 3px 26px 0px rgba(0,0,0,0.3)' : '0px 1px 1px 0px rgba(0,0,0,0.2)'};
  padding: 0px;

  &:hover {
    box-shadow: 0px 3px 26px 0px rgba(0,0,0,0.3);
  }
`

export const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 1;
`

export const TitleLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px 20px 16px 20px;
  line-height: 24px;
  font-size: 16px;
  height: 56px;
  pointer-events: none;
`

export const TitleInput = styled.textarea`
  display: ${props => props.isActive ? 'block' : 'none'};
  vertical-align: top;
  padding: 16px 20px 16px 20px;
  border: 0px;
  border-radius: 6px;
  font-size: 16px;
  height: 56px;
  resize: none;
  width: 500px;
`

export const ContentLabel = styled.label`
  position: absolute;
  padding: 16px 20px 16px 20px;
  line-height: 24px;
  font-size: 16px;
  height: 56px;
  pointer-events: none;
`

export const ContentInput = styled.textarea`
  vertical-align: top;
  padding: 16px 20px 16px 20px;
  border: 0px;
  border-radius: 6px;
  width: 500px;
  font-size: 16px;
  resize: none;
  height: 56px;
`

export const SubmitButton = styled.button`
  display: ${props => props.isActive ? 'block' : 'none'};
`

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
  const [isActive, setIsActive] = useState(false)
  const contentInputRef = useRef()
  const titleInputRef = useRef()
  const reset = () => {
    setTitle("")
    setContent("")
    titleInputRef.current.style.height = '56px';
    contentInputRef.current.style.height = '56px';
  }
  const onTitleChange = (event) => {
    var outerHeight = parseInt(window.getComputedStyle(titleInputRef.current).height, 10)
    var diff = outerHeight - titleInputRef.current.clientHeight
    titleInputRef.current.style.height = 0;
    titleInputRef.current.style.height = Math.max(56, titleInputRef.current.scrollHeight + diff) + 'px';
    setTitle(event.target.value)
  }
  const onContentChange = (event) => {
    var outerHeight = parseInt(window.getComputedStyle(contentInputRef.current).height, 10)
    var diff = outerHeight - contentInputRef.current.clientHeight
    contentInputRef.current.style.height = 0;
    contentInputRef.current.style.height = Math.max(56, contentInputRef.current.scrollHeight + diff) + 'px';
    setContent(event.target.value) 
  }
  return (
    <Mutation mutation={ADD_NOTE} update={updateCache}>
      {(addNote, { data }) => (
        <React.Fragment>
          <WrapperStyledDiv onClick={() => setIsActive(true)} isActive={isActive}>
            <form
              onSubmit={async e => {
                e.preventDefault()
                await addNote({ variables: { title: title, content: content } })
                setIsActive(false)
                reset()
              }}
            >
              {isActive && <TitleLabel>{title === "" && 'Title'}</TitleLabel>}
              <TitleInput
                id="title"
                value={title}
                type="text"
                onChange={e => onTitleChange(e)}
                isActive={isActive}
                ref={titleInputRef}
              />
              <ContentLabel>{content === "" && 'Take a note...'}</ContentLabel>
              <ContentInput
                data-adaptheight
                id="content"
                value={content}
                type="text"
                onChange={e => onContentChange(e)}
                isActive={isActive}
                ref={contentInputRef}
              />
              <SubmitButton type="submit" isActive={isActive}>Add Nodo</SubmitButton>
            </form>
          </WrapperStyledDiv>
          { isActive && <Background onClick={() => setIsActive(false)} /> }
        </React.Fragment>
      )}
    </Mutation>
  );
}

export default AddNote