// external
import React from "react";
import { Query, graphql, Mutation } from "react-apollo";
// local components
import Note from "./note/Note";
import DraggableMasonryLayout from "react-universal-dnd-layout";
import SelectedNotesOptionsBar from "./SelectedNotesOptionsBar/Container";
import Topics from "./topics/Container";
// queries
import { ALL_NOTES, REORDER_NOTE } from "../../graphql/queries";

export const Cursors = React.createContext();

function Notes() {
  const updateNotesOrder = (cache, { data: { reorderNote } }) => {
    var cacheData = cache.readQuery({ query: ALL_NOTES });
    var { oldOrder, newOrder, pinned } = reorderNote;
    cacheData.allNotes.edges.map(edge => {
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
    cache.writeQuery({ query: ALL_NOTES, data: cacheData });
  };
  return (
    <Query query={ALL_NOTES}>
      {({ loading, error, data }) => {
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

        return (
          <Cursors.Provider value={cursors}>
            {data.selectedNotes.length > 0 && (
              <SelectedNotesOptionsBar selectedNotes={data.selectedNotes} />
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

export default Notes;
