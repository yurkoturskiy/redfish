import gql from "graphql-tag";

export default gql`
  query {
    logout(input: {})
      @rest(type: "Logout", method: "POST", path: "rest-auth/logout/") {
      __typename
    }
  }
`;
