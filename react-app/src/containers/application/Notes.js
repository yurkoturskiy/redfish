import React, { useState, useEffect } from 'react'
import { withApollo, Query } from "react-apollo"

import allNotes from '../../graphql/allNotes'
import Note from './Note'
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"
// import { 
//   NotesWrapper,
// } from "../../components/Notes"
import NotesWrapper from './NotesWrapper'


function Notes(props) {
  const [wrapperWidth, setWrapperWidth] = useState(0)
  const [some, setSome] = useState('somestate')
  const [endline, setEndline] = useState([])

  useEffect(() => {
    // window.addEventListener("resize", updateWrapperWidth)
  })
  const somemethod = (param) => {
    console.log(param)
    setSome(param)
    console.log(some)
  }
  const updateWrapperWidth = () => {
    setWrapperWidth(window.innerWidth)
    console.log('wrapperWidth', wrapperWidth)
  }
  return (
    <Query query={allNotes}>
      {({ loading, error, data }) => {
        console.log(data)
        if (loading) return <p>Loading...</p>
        if (error) {
          console.log(error)
          return <p>Error :(</p>
        }
        const notes = data.allNotes.edges.map(({ node }, index) => {
          // console.log(node)
          return <Note somemethod={somemethod} index={index} key={node.id} node={node}/>
        })
        return (
          <NotesWrapper id="wrapper" allNotes={data.allNotes.edges} />
        )
      }}
    </Query>
  )
}

export default withApollo(Notes)