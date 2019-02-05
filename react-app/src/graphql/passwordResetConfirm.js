import gql from "graphql-tag"

export default gql`
  query(
    $uid: String!, 
    $token: String!, 
    $new_password1: String!, 
    $new_password2: String!
  ) {
    passwordResetConfirm(input: {
      uid: $uid, 
      token: $token, 
      new_password1: $new_password1, 
      new_password2: $new_password2
    }) @rest(
      type: "PasswordResetConfirm", 
      method: "POST", 
      path: "rest-auth/password/reset/confirm/"
    ) {
      detail
      __typename
    }
  }
`