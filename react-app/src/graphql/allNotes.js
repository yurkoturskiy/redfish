import gql from 'graphql-tag'

export default gql`
  query {
    allNotes {
      edges {
        node {
          __typename
          id
          title
          content
        }
      }
    }
  }
`