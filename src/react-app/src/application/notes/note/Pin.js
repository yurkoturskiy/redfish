import React, { useContext } from "react";
import * as log from "loglevel";
import { Mutation, Query, withApollo } from "react-apollo";
// Local components
import PinIconFilled from "../../../static/PinIconFilled";
import PinIconOutlined from "../../../static/PinIconOutlined";
// Queries
import {
  ALL_NOTES,
  SWITCH_PIN_NOTES,
  NUM_OF_PINNED_UNPINNED_NOTES
} from "../../../graphql/queries";
// Context
import { NoteNode } from "./Note";

function Pin(props) {
  /* Icon for pin/unpin action */
  const node = useContext(NoteNode);
  const doPin = (mutation, data) => {
    var cacheData = props.client.readQuery({ query: ALL_NOTES });
    cacheData.allNotes.edges = cacheData.allNotes.edges.map(edge => {
      if (edge.node.id === node.id) {
        edge.node.pinned = true;
        edge.node.order = data.numOfPinnedNotes;
      }
      if (!edge.node.pinned && edge.node.order > node.order) {
        edge.node.order -= 1;
      }
      return edge;
    });
    mutation();
    props.client.writeQuery({ query: ALL_NOTES, data: cacheData });
  };
  const doUnpin = mutation => {
    var cacheData = props.client.readQuery({ query: ALL_NOTES });
    cacheData.allNotes.edges = cacheData.allNotes.edges.map(edge => {
      if (!edge.node.pinned && edge.node.id !== node.id) {
        edge.node.order += 1;
      } else if (edge.node.pinned && edge.node.order > node.order) {
        edge.node.order -= 1;
      } else if (edge.node.id === node.id) {
        edge.node.pinned = false;
        edge.node.order = 0;
      }
      return edge;
    });
    mutation();
    props.client.writeQuery({ query: ALL_NOTES, data: cacheData });
  };
  return (
    <Query query={NUM_OF_PINNED_UNPINNED_NOTES}>
      {({ data }) => (
        <Mutation
          mutation={SWITCH_PIN_NOTES}
          variables={{
            ids: [node.id],
            action: node.pinned ? "unpin" : "pin"
          }}
        >
          {switchPinNotes =>
            node.pinned ? (
              <PinIconFilled
                className="pin"
                onClick={() => doUnpin(switchPinNotes, data)}
              />
            ) : (
              <PinIconOutlined
                className="pin"
                onClick={() => doPin(switchPinNotes, data)}
              />
            )
          }
        </Mutation>
      )}
    </Query>
  );
}

export default withApollo(Pin);
