import gql from 'graphql-tag'

export const ALL_NOTES = gql`
  query AllNotes($amount: Int = 27, $cursor: String) {
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

export const ADD_NOTE = gql`
  mutation AddNote($title: String, $content: String) {
    addNote(input: { title: $title, content: $content }) {
      clientMutationId
      newNote {
        id
        title
        content
        __typename
      }
    }
  }
`

export const DELETE_NOTE = gql`
mutation DeleteNote($id: ID!) {
  deleteNote(input: {id: "Tm90ZU5vZGU6MzQz"}) {
    deletedNote {
      id
      title
      content
    }
  }
}
`