import gql from "graphql-tag"

export default gql`
  query($username: String!, $password: String!) {
    login(input: {username: $username, password: $password}) 
      @rest(type: "Login", method: "POST", path: "rest-auth/login/") {
      key
      __typename
    }
  }
`