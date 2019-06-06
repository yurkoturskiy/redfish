import gql from "graphql-tag";

export default gql`
  query {
    isAuthenticated @client
  }
`;
