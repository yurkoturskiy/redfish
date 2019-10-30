// external
import React, { useState } from "react";
import * as log from "loglevel";
import { css } from "linaria";
import { Query, graphql, Mutation, withApollo } from "react-apollo";
// local components
import Note from "./note/Note";
import DraggableMasonryLayout from "react-universal-dnd-layout";
import SelectedNotesOptionsBar from "./SelectedNotesOptionsBar/Container";
import Spinner from "../Spinner";
// queries
import {
  ALL_NOTES,
  NOTES_COMPONENT,
  REORDER_NOTE
} from "../../graphql/queries";

export const Cursors = React.createContext();

export const headersStyles = css`
  font-size: 0.875rem;
  margin: 0 0 0 16px;
  color: lightgrey;
`;

function Notes(props) {
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  log.info("render notes");
  return (
    <Query query={NOTES_COMPONENT}>
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) {
          console.log(error);
          props.client.writeData({ data: { isLoading: false } });
          return <p>Error :(</p>;
        }
        props.client.writeData({ data: { isLoading: false } });
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
        var allNotesLoaded = !data.allNotes.pageInfo.hasNextPage;
        props.client.writeData({
          data: {
            numOfPinnedNotes,
            numOfNotPinnedNotes,
            allNotesLoaded
          }
        });
        const pinnedHeader = <h3 className={headersStyles}>Pinned</h3>;
        const notPinnedHeader = <h3 className={headersStyles}>Others</h3>;
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
                      <DraggableMasonryLayout
                        header={pinnedHeader}
                        key="layout-for-pinned-notes"
                        onRearrange={(dragItem, newOrder, allItems) => {
                          log.info("rearrange pinned notes");
                          log.debug("all layout items", allItems);
                          let reorder = props.client.readQuery({
                            query: ALL_NOTES
                          });
                          for (let a = 0; a < allItems.length; a++) {
                            for (let b = 0; b < numOfNotes; b++) {
                              if (
                                reorder.allNotes.edges[b].node.id ===
                                allItems[a].id
                              ) {
                                reorder.allNotes.edges[b].node.order =
                                  allItems[a].order;
                                break;
                              }
                            }
                          }
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
                      <DraggableMasonryLayout
                        header={numOfPinnedNotes > 0 && notPinnedHeader}
                        reverse={true}
                        key="layout-for-not-pinned-notes"
                        onRearrange={(dragItem, newOrder, allItems) => {
                          log.info("rearrange not pinned notes");
                          log.debug("all layout items", allItems);
                          let reorder = props.client.readQuery({
                            query: ALL_NOTES
                          });
                          for (let a = 0; a < allItems.length; a++) {
                            for (let b = 0; b < numOfNotes; b++) {
                              if (
                                reorder.allNotes.edges[b].node.id ===
                                allItems[a].id
                              ) {
                                reorder.allNotes.edges[b].node.order =
                                  allItems[a].order;
                                break;
                              }
                            }
                          }
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
                          log.info("endline");
                          /* Pagination. Infinite scroll */
                          if (data.allNotes.pageInfo.hasNextPage) {
                            log.info("load more notes");
                            var oldList = props.client.readQuery({
                              query: ALL_NOTES
                            });
                            setIsFetchingMore(true);
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
                                setIsFetchingMore(false);
                              })
                              .catch(() => setIsFetchingMore(false));
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
            {isFetchingMore && <Spinner type="bottom" size="middle" />}
          </Cursors.Provider>
        );
      }}
    </Query>
  );
}

export default withApollo(Notes);
