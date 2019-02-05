import gql from 'graphql-tag'

export default gql`
  query(
    $username: String!, 
    $email: String!, 
    $password1: String!, 
    $password2: String!
  ) {
    registration(input: {
      username: $username, 
      email: $email, 
      password1: $password1, 
      password2: $password2
    }) @rest(
      type: "Registration", 
      method: "POST", 
      path: "rest-auth/registration/"
    ) {
      key
      __typename
    }
  }
`