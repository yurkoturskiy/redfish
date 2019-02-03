import gql from 'graphql-tag'

export default gql`
  query {
    allNotes {
      edges {
        node {
          id
          title
          content
        }
      }
    }
  }
`