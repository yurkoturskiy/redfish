import gql from "graphql-tag";

export const IS_AUTHENTICATED = gql`
  query {
    isAuthenticated @client
  }
`;
