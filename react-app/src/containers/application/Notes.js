import React, { useState, useEffect } from 'react'
import { withApollo, Query } from "react-apollo"

import allNotes from '../../graphql/allNotes'
import Note from './Note'
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"
import NotesWrapper from './NotesWrapper'


function Notes(props) {
  return (
    <Query query={allNotes}>
      {({ loading, error, data }) => {
        console.log(data)
        if (loading) return <p>Loading...</p>
        if (error) {
          console.log(error)
          return <p>Error :(</p>
        }
        return (
          <NotesWrapper id="wrapper" allNotes={data.allNotes.edges} />
        )
      }}
    </Query>
  )
}

export default Notes