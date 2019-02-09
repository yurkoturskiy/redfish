import React from "react";
import { withApollo, Query } from "react-apollo";

import allNotes from '../../graphql/allNotes'
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
  componentDidMount() {
    console.log('mount')
    // this.props.client.writeData({ data: { NoteNodeEdge: [] } })
  }
  render() {
    return (
      <Query query={allNotes}>
        {({ loading, error, data }) => {
          console.log(data)
          if (loading) return <p>Loading...</p>;
          if (error) {
            console.log(error)
            return <p>Error :(</p>;
          }
          const notes = data.allNotes.edges.map(({ node }, index) => {
            // console.log(node)
            return <Note index={index} key={node.id} node={node}/>
          })
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

export default withApollo(Notes)