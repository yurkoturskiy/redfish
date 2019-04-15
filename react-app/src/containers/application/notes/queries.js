import gql from 'graphql-tag'

export const ALL_NOTES = gql`
  query AllNotes($amount: Int = 20, $cursor: String) {
    allNotes(first: $amount, after: $cursor) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          content
          pinned
          created
          edited
          order
          color {
            id
            label
            value
          }
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
        pinned
        created
        edited
        order
        color {
          id
          label
          value
        }
        __typename
      }
    }
  }
`

export const DELETE_NOTES = gql`
  mutation DeleteNotes($ids: [ID]!) {
    deleteNotes(input: {ids: $ids}) {
      deletedNotes {
        id
        title
        content
      }
    }
  }
`

export const SWITCH_NOTES_SELECTOR = gql`
  mutation switchNotesSelector($id: ID!, $isSelected: Boolean!) {
    switchNotesSelector(id: $id, isSelected: $isSelected) @client
  }
`