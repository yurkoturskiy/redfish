import React from "react";
import PropTypes from "prop-types";
import { css } from "linaria";
import { useMutation } from "@apollo/react-hooks";
import MaterialIcon from "@material/react-material-icon";
// queries
import { ALL_NOTES, DELETE_NOTES } from "./../queries";

export const deleteOption = css`
  line-height: 48px;
`;

function DeleteOption(props) {
  const handleDeletion = (
    // Update function
    cache,
    {
      data: {
        deleteNotes: { deletedNotes }
      }
    }
  ) => {
    var cacheData = cache.readQuery({ query: ALL_NOTES });
    // remaping notes with correct cursors
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
  };

  const [deleteNotes] = useMutation(DELETE_NOTES, {
    variables: { ids: [props.node.id] },
    update: handleDeletion
  });

  return (
    <MaterialIcon
      className={deleteOption}
      onClick={deleteNotes}
      icon="delete"
    />
  );
}

DeleteOption.propTypes = {
  node: PropTypes.object
};

export default DeleteOption;
