import React, { useContext } from "react";
import { Mutation } from "react-apollo";
// Queries
import { ALL_NOTES, SWITCH_PIN_NOTES } from "../queries";
// Context
import { NoteNode } from "./Note";
import { Cursors } from "../Notes";

function Pin() {
  /* Icon for pin/unpin action */
  const node = useContext(NoteNode);
  const cursors = useContext(Cursors);
  const updateCache = (cache, { data: { switchPinNotes } }) => {
    const cacheData = cache.readQuery({ query: ALL_NOTES });
    const {
      action, // "pin" or "unpin"
      prevPinnedStatus, // [true, false]
      curPinnedStatus, // [false, false]
      prevOrder, // [2, 9]
      curOrder // [4, 5]
    } = switchPinNotes;
    cacheData.allNotes.edges.map(edge => {
      // Iterate through all notes in cache
      prevPinnedStatus.forEach((prevPinnedSts, index) => {
        // Get index and iterate through received status arrays
        if (
          edge.node.pinned === prevPinnedStatus[index] &&
          edge.node.order === prevOrder[index]
        ) {
          // Update note with changed pinned status
          edge.node.pinned = curPinnedStatus[index];
          edge.node.order = curOrder[index];
          return edge; // Prevent further ordering changes
        }
        if (action === "unpin") {
          // Update ordering on unpinning
          if (!edge.node.pinned) edge.node.order += 1;
          if (edge.node.pinned && edge.node.order > prevOrder[index])
            edge.node.order -= 1;
        }
        if (action === "pin") {
          // Update ordering on pinning
          if (!edge.node.pinned && edge.node.order > prevOrder[index])
            edge.node.order -= 1;
        }
      });
      return edge;
    });
    cache.writeQuery({ query: ALL_NOTES, data: cacheData });
  };
  return (
    <Mutation
      mutation={SWITCH_PIN_NOTES}
      variables={{
        ids: [node.id],
        action: node.pinned ? "unpin" : "pin"
      }}
      update={updateCache}
    >
      {switchPinNotes => <div className="pin" onClick={switchPinNotes} />}
    </Mutation>
  );
}

export default Pin;
