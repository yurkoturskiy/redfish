import gql from "graphql-tag";

export const IS_AUTHENTICATED = gql`
  query {
    isAuthenticated @client
  }
`;

export const LOGOUT = gql`
  mutation logout($key: String!) {
    logout(input: { key: $key }) {
      detail
    }
  }
`;
