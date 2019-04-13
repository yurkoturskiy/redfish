import React, { useState, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import styled from 'styled-components'
import MaterialIcon from '@material/react-material-icon';
// queries
import { ALL_NOTES, SWITCH_NOTES_SELECTOR, DELETE_NOTES } from "./queries"

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
    user-select: none;
  }

  .menu {
    height: 48px;
    background-color: pink;
    width: 100%;
    left: 0;
  }

  .menu .item {
    line-height: 48px;
  }
`

function Note(props) {
  const [isSelected, setIsSelected] = useState(false)
  const handleSelection = () => {
    setIsSelected(!isSelected)
  }
  const handleDeletion = (cache, { data: { deleteNotes: { deletedNotes } } }) => {
    console.log('DELETED')
    const { allNotes } = cache.readQuery({ query: ALL_NOTES })
    console.log(allNotes)
    var deletedNotesIDs = []
    deletedNotes.forEach(note => {
      deletedNotesIDs.push(note.id)
    })
    var allCursors = []
    var freshNodes = []
    allNotes.edges.forEach(edge => {
      allCursors.push(edge.cursor)
      !deletedNotesIDs.includes(edge.node.id) && freshNodes.push(edge.node)
    })
    var newEdges = []
    freshNodes.forEach((node, index) => {
      newEdges.push({
        cursor: allCursors[index], 
        node: node,
        __typename: "NoteNodeEdge"
      })
    })
    const endCursor = allCursors[newEdges.length - 1]
    allNotes.edges = newEdges
    allNotes.pageInfo.endCursor = endCursor
  }
  return (
    <StyledDiv isSelected={isSelected}> 
      <Mutation 
        mutation={SWITCH_NOTES_SELECTOR} 
        update={handleSelection} 
        variables={{ id: props.node.id, isSelected: !isSelected }}
      >
        {switchNotesSelector => (
          <div className="container">
            <MaterialIcon className="checkmark" onClick={switchNotesSelector} icon='check_circle' />
          </div>
        )}
      </Mutation>
      <p>{props.number}</p>
      {props.node.title && <h3 className="title">{props.node.title}</h3>}
      {props.node.content && <p className="content">{props.node.content}</p>}
      <Mutation
        mutation={DELETE_NOTES}
        update={handleDeletion}
        variables={{ ids: [props.node.id] }}
      >
        {deleteNotes => (
          <div className="menu">
            <MaterialIcon onClick={deleteNotes} className="item" icon='delete' />
          </div>
        )}
      </Mutation>
    </StyledDiv>
  )
}

export default Note