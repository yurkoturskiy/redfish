import React, { useContext } from "react";
import { Mutation } from "react-apollo";
// Queries
import { ALL_NOTES, SWITCH_PIN_NOTES } from "../queries";
// Context
import { NoteNode } from "./Note";
import { Cursors } from "../Notes";

function Pin(props) {
  const node = useContext(NoteNode);
  const cursors = useContext(Cursors);
  const updateCache = (cache, { data: { switchPinNotes } }) => {
    const cacheData = cache.readQuery({ query: ALL_NOTES });
    const {
      action,
      prevPinnedStatus,
      curPinnedStatus,
      prevOrder,
      curOrder
    } = switchPinNotes;
    cacheData.allNotes.edges.map(edge => {
      prevPinnedStatus.forEach((prevPinnedSts, index) => {
        if (
          edge.node.pinned === prevPinnedStatus[index] &&
          edge.node.order === prevOrder[index]
        ) {
          edge.node.pinned = curPinnedStatus[index];
          edge.node.order = curOrder[index];
          return edge;
        }
        if (action === "unpin") {
          if (!edge.node.pinned) edge.node.order += 1;
          if (edge.node.pinned && edge.node.order > prevOrder[index])
            edge.node.order -= 1;
        }
        if (action === "pin") {
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
