import gql from 'graphql-tag'

export default gql`
  query($amount: Int!, $cursor: String) {
    allNotes(first: $amount, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
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