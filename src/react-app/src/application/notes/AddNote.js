import React, { useState, useRef } from "react";
import { css } from "linaria";
import { Mutation } from "react-apollo";
// queries
import { ALL_NOTES, ADD_NOTE } from "../../graphql/queries";

export const wrapper = css`
  position: var(--add-note-wrapper-position);
  z-index: 2;
  border-radius: 6px;
  top: var(--add-note-wrapper-top);
  left: 50%;
  margin: 0 0 0 -250px;
  transition: top 0.4s, box-shadow 1s;
  background-color: white;
  box-shadow: var(--add-note-wrapper-box-shadow);
  padding: 0px;

  &:hover {
    box-shadow: 0px 3px 26px 0px rgba(0, 0, 0, 0.3);
  }
`;

export const background = css`
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100vw;
  height: 100vh;
  z-index: 1;
`;

export const titleLabel = css`
  position: absolute;
  top: 0;
  left: 0;
  padding: 16px 20px 16px 20px;
  line-height: 24px;
  font-size: 16px;
  height: 56px;
  pointer-events: none;
`;

export const titleInput = css`
  display: var(--add-note-title-input-display);
  vertical-align: top;
  padding: 16px 20px 16px 20px;
  border: 0px;
  border-radius: 6px;
  font-size: 16px;
  height: 56px;
  resize: none;
  width: 500px;
`;

export const contentLabel = css`
  position: absolute;
  padding: 16px 20px 16px 20px;
  line-height: 24px;
  font-size: 16px;
  height: 56px;
  pointer-events: none;
`;

export const contentInput = css`
  vertical-align: top;
  padding: 16px 20px 16px 20px;
  border: 0px;
  border-radius: 6px;
  width: 500px;
  font-size: 16px;
  resize: none;
  height: 56px;
`;

export const submitButton = css`
  display: var(--add-note-submit-button-display);
`;

const updateCache = (
  cache,
  {
    data: {
      addNote: { newNote }
    }
  }
) => {
  const cacheData = cache.readQuery({ query: ALL_NOTES });
  // remember cursors
  var allCursors = [];
  cacheData.allNotes.edges.forEach(edge => {
    allCursors.push(edge.cursor);
  });
  // new edge prototype
  var newEdge = {
    cursor: undefined, // setup in the reset cursors section
    node: newNote,
    __typename: "NoteNodeEdge"
  };
  // include new edge as first item
  // and exclude the last one without the cursor
  cacheData.allNotes.edges.unshift(newEdge);
  cacheData.allNotes.edges.pop();
  // Shift order by one for existed notes and reset cursors for all
  cacheData.allNotes.edges.map((edge, index) => {
    if (edge !== newEdge && !edge.node.pinned) edge.node.order += 1;
    edge.cursor = allCursors[index];
    return edge;
  });
  cache.writeQuery({ query: ALL_NOTES, data: cacheData });
};

function AddNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isActive, setIsActive] = useState(false);
  const contentInputRef = useRef();
  const titleInputRef = useRef();
  const reset = () => {
    setTitle("");
    setContent("");
    titleInputRef.current.style.height = "56px";
    contentInputRef.current.style.height = "56px";
  };
  const onTitleChange = event => {
    var outerHeight = parseInt(
      window.getComputedStyle(titleInputRef.current).height,
      10
    );
    var diff = outerHeight - titleInputRef.current.clientHeight;
    titleInputRef.current.style.height = 0;
    titleInputRef.current.style.height =
      Math.max(56, titleInputRef.current.scrollHeight + diff) + "px";
    setTitle(event.target.value);
  };
  const onContentChange = event => {
    var outerHeight = parseInt(
      window.getComputedStyle(contentInputRef.current).height,
      10
    );
    var diff = outerHeight - contentInputRef.current.clientHeight;
    contentInputRef.current.style.height = 0;
    contentInputRef.current.style.height =
      Math.max(56, contentInputRef.current.scrollHeight + diff) + "px";
    setContent(event.target.value);
  };
  return (
    <Mutation mutation={ADD_NOTE} update={updateCache}>
      {(addNote, { data }) => (
        <React.Fragment>
          <div
            className={wrapper}
            style={{
              "--add-note-wrapper-position": isActive ? "fixed" : "absolute",
              "--add-note-wrapper-top": isActive ? "20vh" : "20px",
              "--add-note-wrapper-box-shadow": isActive
                ? "0px 3px 26px 0px rgba(0,0,0,0.3)"
                : "0px 1px 1px 0px rgba(0,0,0,0.2)"
            }}
            onClick={() => setIsActive(true)}
          >
            <form
              onSubmit={async e => {
                e.preventDefault();
                await addNote({
                  variables: { title: title, content: content }
                });
                setIsActive(false);
                reset();
              }}
            >
              {isActive && (
                <label className={titleLabel}>{title === "" && "Title"}</label>
              )}
              <textarea
                className={titleInput}
                style={{
                  "--add-note-title-input-display": isActive ? "block" : "none"
                }}
                id="title"
                value={title}
                type="text"
                onChange={e => onTitleChange(e)}
                ref={titleInputRef}
              />
              <label className={contentLabel}>
                {content === "" && "Take a note..."}
              </label>
              <textarea
                className={contentInput}
                data-adaptheight
                id="content"
                value={content}
                type="text"
                onChange={e => onContentChange(e)}
                ref={contentInputRef}
              />
              <button
                type="submit"
                className={submitButton}
                style={{
                  "--add-note-submit-button-display": isActive
                    ? "block"
                    : "none"
                }}
              >
                Add Nodo
              </button>
            </form>
          </div>
          {isActive && (
            <div className={background} onClick={() => setIsActive(false)} />
          )}
        </React.Fragment>
      )}
    </Mutation>
  );
}

export default AddNote;
