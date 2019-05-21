// external
import React, { useState, useEffect } from "react";
import { withApollo, Query, graphql, Mutation } from "react-apollo";
// local components
import Note from "./note/Note";
import DraggableMasonryLayout from "./DraggableMasonryLayout";
import SelectedNotesOptionsBar from "./SelectedNotesOptionsBar/Container";
import Topics from "./topics/Container";
// queries
import { ALL_NOTES, SELECTED_NOTES, REORDER_NOTE } from "./queries";

function Notes(props) {
  const selectionHandler = () => {};
  const updateNotesOrder = (cache, { data: { reorderNote } }) => {
    var cacheData = cache.readQuery({ query: ALL_NOTES });
    var { oldOrder, newOrder } = reorderNote;
    var data = cacheData.allNotes.edges.map(edge => {
      if (oldOrder < newOrder) {
        // Drag toward the end
        console.log("drag toward the end");
        if (edge.node.order > oldOrder && edge.node.order <= newOrder) {
          edge.node.order -= 1;
        }
        if (edge.node.order === oldOrder) edge.node.order = newOrder;
      }
      if (oldOrder > newOrder) {
        // Drag toward the start
        console.log("drag toward the start");
        if (edge.node.order < oldOrder && edge.node.order >= newOrder) {
          console.log("inbetween note");
          edge.node.order += 1;
        } else if (edge.node.order === oldOrder) {
          console.log("drag item");
          edge.node.order = newOrder;
        }
      }
      return edge;
    });
    cache.writeQuery({ query: ALL_NOTES, data });
  };
  return (
    <Query query={ALL_NOTES}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
          return <p>Error :(</p>;
        }
        const noteComponents = data.allNotes.edges.map((note, index) => (
          <Note
            key={note.node.id}
            order={note.node.order}
            node={note.node}
            number={index + 1}
            selectionHandler={selectionHandler}
            isSelected={props.selectedNotes.indexOf(note.node.id) !== -1}
          />
        ));
        var allCards = [];
        const pinnedLabel = (
          <div key="pinned-label" id="pinned-label" separator="true" order={-1}>
            <h3>Pinned</h3>
          </div>
        );
        allCards.push(pinnedLabel);
        noteComponents.forEach(
          (card, index) =>
            data.allNotes.edges[index].node.pinned && allCards.push(card)
        );
        const notPinnedLabel = (
          <div
            key="not-pinned-label"
            id="not-pinned-label"
            separator="true"
            order={allCards.length - 1}
          >
            <h3>Not pinned</h3>
          </div>
        );
        allCards.push(notPinnedLabel);
        noteComponents.forEach(
          (card, index) =>
            !data.allNotes.edges[index].node.pinned && allCards.push(card)
        );

        return (
          <React.Fragment>
            {props.selectedNotes.length > 0 && (
              <SelectedNotesOptionsBar selectedNotes={props.selectedNotes} />
            )}
            <Mutation mutation={REORDER_NOTE} update={updateNotesOrder}>
              {(reorderNote, { data }) => (
                <DraggableMasonryLayout
                  reverse={true}
                  onRearrange={(dragItem, newOrder) => {
                    reorderNote({
                      variables: {
                        id: dragItem.id,
                        newOrder: newOrder
                      }
                    });
                  }}
                  onEndlineEnter={() => {
                    if (data.allNotes.pageInfo.hasNextPage) {
                      fetchMore({
                        query: ALL_NOTES,
                        variables: {
                          cursor: data.allNotes.pageInfo.endCursor
                        },
                        updateQuery: (prevResult, { fetchMoreResult }) => {
                          if (!fetchMoreResult) return prevResult;
                          let mix = prevResult;
                          mix.allNotes.pageInfo =
                            fetchMoreResult.allNotes.pageInfo;
                          mix.allNotes.edges = [
                            ...prevResult.allNotes.edges,
                            ...fetchMoreResult.allNotes.edges
                          ];
                          return mix;
                        }
                      });
                    }
                  }}
                >
                  {allCards}
                </DraggableMasonryLayout>
              )}
            </Mutation>
            <Topics />
          </React.Fragment>
        );
      }}
    </Query>
  );
}

export default graphql(SELECTED_NOTES, {
  props: ({ data: { selectedNotes } }) => ({
    selectedNotes
  })
})(Notes);
