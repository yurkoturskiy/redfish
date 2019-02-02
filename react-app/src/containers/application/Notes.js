import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

import Note from './Note'
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"
import { 
  NotesWrapper,
} from "../../components/Notes"


class Notes extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      originPoints: [],
    }
  }
  render() {
    return (
      <Query
        query={gql`
          {
            allNotes {
              edges {
                node {
                  id
                  title
                  content
                }
              }
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log(error)
            return <p>Error :(</p>;
          }
          const notes = data.allNotes.edges.map(({ node }, index) => (
            <Note index={index} key={node.id} node={node}/>
          ))
          return (
            <NotesWrapper>
                {notes}
            </NotesWrapper>
          )
        }}
      </Query>
    )
  }
}

export default Notes