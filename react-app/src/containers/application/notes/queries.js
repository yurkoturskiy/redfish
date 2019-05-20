import gql from "graphql-tag";

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
          created
          edited
          pinned
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
`;

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
`;

export const DELETE_NOTES = gql`
  mutation DeleteNotes($ids: [ID]!) {
    deleteNotes(input: { ids: $ids }) {
      deletedNotes {
        id
        title
        content
      }
    }
  }
`;

export const SWITCH_NOTES_SELECTOR = gql`
  mutation switchNotesSelector($id: ID!, $isSelected: Boolean!) {
    switchNotesSelector(id: $id, isSelected: $isSelected) @client
  }
`;

export const ALL_COLORS = gql`
  query {
    allColors {
      edges {
        node {
          id
          label
          value
        }
      }
    }
  }
`;

export const UPDATE_NOTES_COLOR = gql`
  mutation updateNotesColor($id: ID!, $newColor: String!) {
    updateNotesColor(input: { id: $id, newColor: $newColor }) {
      newColor {
        id
        label
        value
      }
    }
  }
`;

export const SELECTED_NOTES = gql`
  query {
    selectedNotes @client
  }
`;

export const SWITCH_PIN_NOTES = gql`
  mutation switchPinNotes($ids: [ID]!, $action: String!) {
    pinnedUnpinnedNotes {
      id
    }
  }
`;

export const REORDER_NOTE = gql`
  mutation reorderNote($id: ID!, $newOrder: Int!) {
    reorderNote(input: { id: $id, newOrder: $newOrder }) {
      newOrders
    }
  }
`;
