// external
import React, { useState, useEffect } from 'react'
import { withApollo, Query } from "react-apollo"
// local components
import Note from './Note'
import MasonryLayout from './MasonryLayout'
// queries
import allNotes from '../../graphql/allNotes'

const amount = 30

function Notes() {
  return (
    <Query query={allNotes} variables={{amount: amount}}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>
        if (error) {
          console.log(error)
          return <p>Error :(</p>
        }
        const cards = data.allNotes.edges.map((note, index) => (
          <Note key={note.node.id} node={note.node} number={index} />
        ))
        return (
          <MasonryLayout onEndlineEnter={() => {
            if (data.allNotes.pageInfo.hasNextPage) {
              fetchMore({
              query: allNotes,
              variables: {
                amount: amount,
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
          </MasonryLayout>
        )
      }}
    </Query>
  )
}

export default Notes