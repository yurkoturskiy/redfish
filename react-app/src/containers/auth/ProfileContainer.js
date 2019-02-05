import React from 'react'
// presentational components
import ProfileForm from '../../components/auth/ProfileForm'
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Profile = () => (
  <Query
    query={gql`
      {
        profile {
          edges {
            node {
              id
              username
              email
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
      return data.profile.edges.map(({ node }) => (
        <div key={node.id}>
          <p>{node.id}</p>
          <p>{node.username}</p>
          <p>{node.email}</p>
          <p>{node.firstName}</p>
          <p>{node.lastName}</p>
        </div>
      ))
    }}
  </Query>
);

export default Profile