// external
import React from "react";
import * as log from "loglevel";
import { Query, graphql, Mutation, withApollo } from "react-apollo";
// local components
import Note from "./note/Note";
import DraggableMasonryLayout from "react-universal-dnd-layout";
import SelectedNotesOptionsBar from "./SelectedNotesOptionsBar/Container";
import Topics from "./topics/Container";
// queries
import {
  ALL_NOTES,
  NOTES_COMPONENT,
  REORDER_NOTE
} from "../../graphql/queries";

export const Cursors = React.createContext();

function Notes(props) {
  const updateNotesOrder = (cache, { data: { reorderNote } }) => {
    log.debug("reorderNote", reorderNote);
    var cacheData = cache.readQuery({ query: ALL_NOTES });
    var { oldOrder, newOrder, pinned } = reorderNote;
    cacheData.allNotes.edges = cacheData.allNotes.edges.map(edge => {
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
    log.info("update notes order");
    cache.writeQuery({ query: ALL_NOTES, data: cacheData });
  };
  log.info("render notes");
  return (
    <Query query={NOTES_COMPONENT}>
      {({ loading, error, data, fetchMore }) => {
        if (loading) return <p>Loading...</p>;
        if (error) {
          console.log(error);
          return <p>Error :(</p>;
        }
        log.info("handle allNotes data query");
        log.debug("notes component data:", data);
        const cursors = data.allNotes.edges.map(note => note.cursor);
        const noteComponents = data.allNotes.edges.map((note, index) => (
          <Note
            key={note.node.id}
            order={note.node.order}
            node={note.node}
            number={index + 1}
            isSelected={data.selectedNotes.indexOf(note.node.id) !== -1}
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
        var numOfNotes = data.allNotes.edges.length;
        var numOfPinnedNotes = pinnedCards.length;
        var numOfNotPinnedNotes = notPinnedCards.length;
        props.client.writeData({
          data: {
            numOfPinnedNotes,
            numOfNotPinnedNotes
          }
        });
        return (
          <Cursors.Provider value={cursors}>
            {data.selectedNotes.length > 0 && (
              <SelectedNotesOptionsBar selectedNotes={data.selectedNotes} />
            )}
            <Mutation mutation={REORDER_NOTE}>
              {reorderNote => (
                <React.Fragment>
                  {pinnedCards.length !== 0 && (
                    /* Pinned notes */
                    <React.Fragment>
                      <div>
                        <h3>Pinned</h3>
                      </div>
                      <DraggableMasonryLayout
                        onRearrange={(dragItem, newOrder, allItems) => {
                          log.debug("all layout items", allItems);
                          let reorder = props.client.readQuery({
                            query: ALL_NOTES
                          });
                          for (let i = 0; i < numOfPinnedNotes; i++)
                            reorder.allNotes.edges[i].node.order =
                              allItems[i].order;
                          log.debug("reorder", reorder);
                          props.client.writeQuery({
                            query: ALL_NOTES,
                            data: reorder
                          });
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
                        onRearrange={(dragItem, newOrder, allItems) => {
                          log.debug("all layout items", allItems);
                          let reorder = props.client.readQuery({
                            query: ALL_NOTES
                          });
                          for (let i = numOfPinnedNotes; i < numOfNotes; i++)
                            reorder.allNotes.edges[i].node.order =
                              allItems[i - numOfPinnedNotes].order;
                          log.debug("reorder", reorder);
                          props.client.writeQuery({
                            query: ALL_NOTES,
                            data: reorder
                          });
                          reorderNote({
                            variables: {
                              id: dragItem.id,
                              newOrder: newOrder
                            }
                          });
                        }}
                        onEndlineEnter={() => {
                          if (data.allNotes.pageInfo.hasNextPage) {
                            var oldList = props.client.readQuery({
                              query: ALL_NOTES
                            });
                            props.client
                              .query({
                                query: ALL_NOTES,
                                variables: {
                                  cursor: oldList.allNotes.pageInfo.endCursor
                                }
                              })
                              .then(res => {
                                log.debug("fetch more data:", data);
                                let newList = oldList;
                                newList.allNotes.pageInfo =
                                  res.data.allNotes.pageInfo;
                                newList.allNotes.edges = [
                                  ...oldList.allNotes.edges,
                                  ...res.data.allNotes.edges
                                ];
                                log.debug("data to override:", newList);
                                props.client.writeQuery({
                                  query: ALL_NOTES,
                                  data: newList
                                });
                              });
                            console.log("endline");
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

export default withApollo(Notes);
