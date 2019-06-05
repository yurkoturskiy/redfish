import gql from "graphql-tag";

export const IS_AUTHENTICATED = gql`
  query {
    isAuthenticated @client
  }
`;

export const SWITCH_AUTHENTICATION = gql`
  mutation switchAuthentication($status: Boolean!) {
    switchAuthentication(status: $status) @client
  }
`;
