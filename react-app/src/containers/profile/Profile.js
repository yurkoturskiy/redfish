import React from "react";
// presentational components
import ProfileForm from "./ProfileForm";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

const query = gql`
  {
    profile {
      id
      username
      email
      firstName
      lastName
    }
  }
`;

const Profile = () => {
  const { loading, error, data } = useQuery(query);

  if (loading) return <p>Loading...</p>;

  if (error) {
    console.log(error);
    return <p>Error :(</p>;
  }

  return (
    <div key={data.profile.id}>
      <p>{data.profile.id}</p>
      <p>{data.profile.username}</p>
      <p>{data.profile.email}</p>
      <p>{data.profile.firstName}</p>
      <p>{data.profile.lastName}</p>
    </div>
  );
};

export default Profile;
