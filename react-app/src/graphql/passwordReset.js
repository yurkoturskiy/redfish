import gql from "graphql-tag"

export default gql`
  query($email: String!) {
    passwordReset(input: {email: $email}) 
      @rest(type: "PasswordReset", method: "POST", path: "rest-auth/password/reset/") {
      detail
      __typename
    }
  }
`