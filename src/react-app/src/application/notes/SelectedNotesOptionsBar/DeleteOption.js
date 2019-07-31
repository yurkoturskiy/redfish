import React from "react";
import * as log from "loglevel";
import PropTypes from "prop-types";
import { css } from "linaria";
import { Mutation } from "react-apollo";
import MaterialIcon from "@material/react-material-icon";
// queries
import { ALL_NOTES, DELETE_NOTES } from "../../../graphql/queries";

export const deleteOption = css`
  vertical-align: middle;
`;

export const container = css`
  position: relative;
  height: 32px;
  width: 32px;
  outline: 1px solid red;
  text-align: center;
  vertical-align: middle;
`;

function DeleteOption(props) {
  const handleDeletion = (
    cache,
    {
      data: {
        deleteNotes: { deletedNotes }
      }
    }
  ) => {
    var cacheData = cache.readQuery({ query: ALL_NOTES });
    // remaping notes with correct cursors
    log.info("deletedNotes", deletedNotes);
    var deletedNotesIDs = [];
    deletedNotes.forEach(note => {
      deletedNotesIDs.push(note.id);
    });
    // remember cursors and filter Nodes
    var allCursors = [];
    var freshNodes = [];
    var deletedNodes = [];
    cacheData.allNotes.edges.forEach(edge => {
      allCursors.push(edge.cursor);
      !deletedNotesIDs.includes(edge.node.id) && freshNodes.push(edge.node);
      deletedNotesIDs.includes(edge.node.id) && deletedNodes.push(edge.node);
    });
    // prototype of new edges
    var newEdges = [];
    freshNodes.forEach((node, index) => {
      newEdges.push({
        cursor: allCursors[index],
        node: node,
        __typename: "NoteNodeEdge"
      });
    });
    // prototype of the end cursor
    const endCursor = allCursors[newEdges.length - 1];
    cacheData.allNotes.edges = newEdges; // include new edges into the cache
    cacheData.allNotes.pageInfo.endCursor = endCursor; // reset end cursor
    // Update order
    cacheData.allNotes.edges.map(edge => {
      deletedNodes.forEach(deletedNode => {
        if (
          edge.node.order > deletedNode.order &&
          deletedNode.pinned === edge.node.pinned
        )
          edge.node.order -= 1;
      });
      return edge;
    });
    cache.writeQuery({ query: ALL_NOTES, data: cacheData });
    cache.writeData({ data: { selectedNotes: [] } });
  };

  const deletedNotes = props.selectedNotes.map(id => {
    return { id, __typename: "NoteNode" };
  });

  return (
    <Mutation
      mutation={DELETE_NOTES}
      update={handleDeletion}
      variables={{ ids: props.selectedNotes }}
      optimisticResponse={{
        deleteNotes: {
          deletedNotes: deletedNotes,
          __typename: "DeleteNotesPayload"
        }
      }}
    >
      {deleteNotes => (
        <MaterialIcon
          className={deleteOption}
          onClick={deleteNotes}
          icon="delete"
        />
      )}
    </Mutation>
  );
}

DeleteOption.propTypes = {
  node: PropTypes.object
};

export default DeleteOption;
