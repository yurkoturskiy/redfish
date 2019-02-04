import gql from 'graphql-tag'

export default gql`
  query {
    appState @client {
      isAuth
    }
  }
`