import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Card from "react-bootstrap/Card"
import CardDeck from "react-bootstrap/CardDeck"
import NotesWrapper from "../components/NotesWrapper"

const Notes = () => (
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
      console.log(data)
      const notes = data.allNotes.edges.map(({ node }) => (
        <div>
          <Card key={node.id} style={{ width: '256px', marginRight: '0px', marginBottom: '16px'}}>
            <Card.Body>
              <Card.Title>{node.title}</Card.Title>
              <Card.Text>{node.content}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))
      return (
        <NotesWrapper>
          <CardDeck>
            {notes}
          </CardDeck>
        </NotesWrapper>
      )
    }}
  </Query>
);

class Application extends React.Component {
  render() {
    return (
      <div>
        <Notes/>
      </div>
    );
  }
}

export default Application;
