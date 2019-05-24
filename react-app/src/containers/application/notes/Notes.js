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

export const Cursors = React.createContext();

function Notes(props) {
  const selectionHandler = () => {};
  const updateNotesOrder = (cache, { data: { reorderNote } }) => {
    var cacheData = cache.readQuery({ query: ALL_NOTES });
    var { oldOrder, newOrder, pinned } = reorderNote;
    var data = cacheData.allNotes.edges.map(edge => {
      if (edge.node.pinned === pinned) {
        // Drag withing pinned or unpinned span
        if (oldOrder < newOrder) {
          // Drag toward the end
          if (edge.node.order > oldOrder && edge.node.order <= newOrder) {
            edge.node.order -= 1;
          } else if (edge.node.order === oldOrder) edge.node.order = newOrder;
        }
        if (oldOrder > newOrder) {
          // Drag toward the start
          if (edge.node.order < oldOrder && edge.node.order >= newOrder) {
            edge.node.order += 1;
          } else if (edge.node.order === oldOrder) {
            edge.node.order = newOrder;
          }
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
        const cursors = data.allNotes.edges.map(note => note.cursor);
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
        var pinnedCards = [];
        noteComponents.map((card, index) => {
          if (data.allNotes.edges[index].node.pinned) pinnedCards.push(card);
        });
        var notPinnedCards = [];
        noteComponents.forEach((card, index) => {
          if (!data.allNotes.edges[index].node.pinned)
            notPinnedCards.push(card);
        });
        console.log("not pinned cards", notPinnedCards);

        return (
          <Cursors.Provider value={cursors}>
            {props.selectedNotes.length > 0 && (
              <SelectedNotesOptionsBar selectedNotes={props.selectedNotes} />
            )}
            <Mutation mutation={REORDER_NOTE} update={updateNotesOrder}>
              {reorderNote => (
                <React.Fragment>
                  {pinnedCards.length !== 0 && (
                    /* Pinned notes */
                    <React.Fragment>
                      <div>
                        <h3>Pinned</h3>
                      </div>
                      <DraggableMasonryLayout
                        onRearrange={(dragItem, newOrder) => {
                          reorderNote({
                            variables: {
                              id: dragItem.id,
                              newOrder: newOrder
                            }
                          });
                        }}
                      >
                        {pinnedCards}
                      </DraggableMasonryLayout>
                    </React.Fragment>
                  )}
                  {notPinnedCards.length !== 0 && (
                    /* Not pinned notes */
                    <React.Fragment>
                      <div>
                        <h3>Not pinned</h3>
                      </div>
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
                              updateQuery: (
                                prevResult,
                                { fetchMoreResult }
                              ) => {
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
                        {notPinnedCards}
                      </DraggableMasonryLayout>
                    </React.Fragment>
                  )}
                </React.Fragment>
              )}
            </Mutation>
            <Topics />
          </Cursors.Provider>
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
