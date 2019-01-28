import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";

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
      return data.allNotes.edges.map(({ node }) => (
        <div key={node.id}>
          <h3>{node.title}</h3>
          <p>{node.content}</p>
        </div>
      ))
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
