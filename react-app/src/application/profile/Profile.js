import React from "react";
// presentational components
import { Query } from "react-apollo";
import gql from "graphql-tag";

const Profile = () => (
  <Query
    query={gql`
      {
        profile {
          id
          username
          email
          firstName
          lastName
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) {
        console.log(error);
        return <p>Error :(</p>;
      }
      console.log(data);
      return (
        <div key={data.profile.id}>
          <p>{data.profile.id}</p>
          <p>{data.profile.username}</p>
          <p>{data.profile.email}</p>
          <p>{data.profile.firstName}</p>
          <p>{data.profile.lastName}</p>
        </div>
      );
    }}
  </Query>
);

export default Profile;
