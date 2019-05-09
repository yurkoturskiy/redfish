// external
import React, { useState, useEffect } from 'react'
import { withApollo, Query, graphql } from "react-apollo"
// local components
import Note from './note/Note'
import DraggableMasonryLayout from './DraggableMasonryLayout'
import SelectedNotesOptionsBar from './SelectedNotesOptionsBar'
// queries
import { ALL_NOTES, SELECTED_NOTES } from './queries'

function Notes(props) {
  const selectionHandler = () => {

  }
  return (
    <Query query={ALL_NOTES} >
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>
        if (error) {
          console.log(error)
          return <p>Error :(</p>
        }
        const cards = data.allNotes.edges.map((note, index) => (
          <Note 
            key={note.node.id} 
            node={note.node} 
            number={index + 1} 
            selectionHandler={selectionHandler} 
            isSelected={props.selectedNotes.indexOf(note.node.id) !== -1}
          />
        ))
        return (
          <React.Fragment>
            <SelectedNotesOptionsBar/>
            <DraggableMasonryLayout onEndlineEnter={() => {
              if (data.allNotes.pageInfo.hasNextPage) {
                fetchMore({
                query: ALL_NOTES,
                variables: {
                  cursor: data.allNotes.pageInfo.endCursor
                },
                updateQuery: (prevResult, { fetchMoreResult }) => {
                  if (!fetchMoreResult) return prevResult
                  let mix = prevResult
                  mix.allNotes.pageInfo = fetchMoreResult.allNotes.pageInfo
                  mix.allNotes.edges = [...prevResult.allNotes.edges, ...fetchMoreResult.allNotes.edges]
                  return mix
                }              
              })
            }}}>
              {cards}
            </DraggableMasonryLayout>
          </React.Fragment>
        )
      }}
    </Query>
  )
}

export default graphql(SELECTED_NOTES, {
  props: ({ data: { selectedNotes } }) => ({
    selectedNotes
  })
})(Notes)