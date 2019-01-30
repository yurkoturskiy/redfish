import gql from "graphql-tag";
import { Mutation } from "react-apollo";

const ADD_NOTE = gql`
  mutation AddNote($type: String!) {
    addNote(type: $type) {
      id
      type
    }
  }
`;

const AddNote = () => {
  let input;

  return (
    <Mutation mutation={ADD_TODO}>
      {(addNote, { data }) => (
        <div>
          <form
            onSubmit={e => {
              e.preventDefault();
              addNote({ variables: { type: input.value } });
              input.value = "";
            }}
          >
            <input
              ref={node => {
                input = node;
              }}
            />
            <button type="submit">Add Nodo</button>
          </form>
        </div>
      )}
    </Mutation>
  );
};