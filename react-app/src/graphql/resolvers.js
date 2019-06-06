import gql from "graphql-tag";

const resolvers = {
  Mutation: {
    switchNotesSelector: (_, { id }, { cache }) => {
      const query = gql`
        query {
          selectedNotes @client
        }
      `;
      const { selectedNotes } = cache.readQuery({ query });
      var data;
      if (selectedNotes.indexOf(id) === -1) {
        // Select. Add note's ID to the global state
        selectedNotes.push(id);
        data = { selectedNotes };
      } else {
        // Deselect. Remove note's ID from the global state
        data = {
          selectedNotes: selectedNotes.filter(
            selectedNoteID => id !== selectedNoteID
          )
        };
      }
      cache.writeData({ query, data });
      return null;
    }
  }
};

export default resolvers;
