// external
import React, { useState, useEffect } from 'react'
import { withApollo, Query } from "react-apollo"
// local components
import Note from './Note'
import MasonryLayout from './MasonryLayout'
// queries
import allNotes from '../../graphql/allNotes'

const amount = 30

function Notes(props) {
  return (
    <Query query={allNotes} variables={{amount: amount}}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>
        if (error) {
          console.log(error)
          return <p>Error :(</p>
        }
        const cards = data.allNotes.edges.map((note, index) => (
            <Note key={note.node.id} node={note.node} number={index} />
        ))
        return (
          <MasonryLayout>
            {cards}
          </MasonryLayout>
        )
      }}
    </Query>
  )
}

export default Notes