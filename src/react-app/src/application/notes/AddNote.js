import React, { useState, useRef, useEffect } from "react";
import * as log from "loglevel";
import debounce from "lodash/debounce";
import { css } from "linaria";
import { Mutation, withApollo } from "react-apollo";
import Button from "@material/react-button";
// queries
import { ALL_NOTES, ADD_NOTE, ALL_NOTES_LOADED } from "../../graphql/queries";

export const wrapper = css`
  position: var(--add-note-wrapper-position);
  z-index: 2;
  border-radius: 6px;
  top: var(--add-note-wrapper-top);
  left: 0;
  right: 0;
  margin: 0 auto 0 auto;
  max-width: var(--add-note-wrapper-max-width);
  width: 500px;
  transition: top 0.4s, box-shadow 1s, max-width 0.4s;
  background-color: white;
  box-shadow: var(--add-note-wrapper-box-shadow);
  padding: 0px;

  animation-name: appearance;
  animation-duration: 0.5s;
  @keyframes appearance {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  &:hover {
    box-shadow: 0px 3px 26px 0px rgba(0, 0, 0, 0.3);
  }

  & button {
    margin-left: auto;
    margin-right: auto;
    display: var(--add-note-submit-button-display);
    font-size: 1rem;
    font-weight: normal;
    height: 44px;
    color: black;
    --mdc-theme-primary: #1d79ff;
    text-transform: capitalize;
    letter-spacing: 0;
    cursor: pointer;
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

export const contentContainer = css`
  flex-direction: column;
  max-height: 60vh;
  overflow-y: var(--add-note-wrapper-overflow-y);
  border-bottom: 1px solid lightgrey;

  &::-webkit-scrollbar {
    display: none;
  }

  & div {
    position: relative;
  }
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

  width: 100%;
`;

export const contentLabel = css`
  position: absolute;
  top: 0;
  left: 0;
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

  width: 100%;
  font-size: 16px;
  resize: none;
  height: 56px;
`;

const updateCache = (cache, { data }) => {
  log.info("new note", data);
  const cacheData = cache.readQuery({ query: ALL_NOTES });
  const { allNotesLoaded } = cache.readQuery({
    query: ALL_NOTES_LOADED
  });
  log.debug("all notes cache", cacheData);
  log.info("allNotesLoaded", allNotesLoaded);
  // remember cursors
  var allCursors = [];
  cacheData.allNotes.edges.forEach(edge => {
    allCursors.push(edge.cursor);
  });
  // new edge prototype
  var newEdge = {
    cursor: undefined, // setup in the reset cursors section
    node: Object.assign({}, data.addNote.note),
    __typename: "NoteNodeEdge"
  };
  // include new edge as first item
  // and exclude the last one without the cursor
  cacheData.allNotes.edges.unshift(newEdge);
  !allNotesLoaded ? cacheData.allNotes.edges.pop() : allCursors.push("none");
  // Shift order by one for existed notes and reset cursors for all
  cacheData.allNotes.edges.map((edge, index) => {
    if (edge !== newEdge && !edge.node.pinned) edge.node.order += 1;
    edge.cursor = allCursors[index];
    return edge;
  });
  cache.writeQuery({ query: ALL_NOTES, data: cacheData });
};

function AddNote(props) {
  // Node state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pinned, setPinned] = useState(false);
  const [color, setColor] = useState("WHITE");
  // Misc
  const [isActive, setIsActive] = useState();
  const [deactivate, setDeactivate] = useState(false);
  const contentInputRef = useRef();
  const titleInputRef = useRef();

  const reset = () => {
    log.info("reset addNote component");
    setTitle("");
    setContent("");
    setColor("WHITE");
    setPinned(false);
    titleInputRef.current.style.height = "56px";
    contentInputRef.current.style.height = "56px";
  };

  useEffect(() => {
    if (isActive) {
      // Initiate note creation
    } else {
      setDeactivate(false);
      reset();
    }
  }, [isActive, reset]);

  useEffect(() => {
    if (deactivate) {
      if (!title && !content) {
        setIsActive(false);
      } else {
        log.info("send update, update cache, and deactivate");
        addNote();
        setIsActive(false);
      }
    }
  }, [deactivate, content, title, addNote]);

  const addNote = () => {
    props.client.mutate({
      mutation: ADD_NOTE,
      variables: {
        color,
        title,
        content,
        pinned
      },
      update: updateCache
    });
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
    <React.Fragment>
      <div
        className={wrapper}
        style={{
          "--add-note-wrapper-position": isActive ? "fixed" : "absolute",
          "--add-note-wrapper-max-width": isActive ? "90%" : "50%",
          "--add-note-wrapper-overflow-y": isActive ? "scroll" : "hidden",
          "--add-note-wrapper-top": isActive ? "20vh" : "20px",
          "--add-note-wrapper-box-shadow": isActive
            ? "0px 3px 26px 0px rgba(0,0,0,0.3)"
            : "0px 1px 1px 0px rgba(0,0,0,0.2)",
          "--add-note-submit-button-display": isActive ? "block" : "none"
        }}
        onClick={() => setIsActive(true)}
      >
        <form
          onSubmit={async e => {
            e.preventDefault();
            setDeactivate(true);
          }}
        >
          <div className={contentContainer}>
            <div>
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
            </div>
            <div>
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
            </div>
          </div>
          <Button type="submit">Save</Button>
        </form>
      </div>
      {isActive && (
        <div className={background} onClick={() => setDeactivate(true)} />
      )}
    </React.Fragment>
  );
}

export default withApollo(AddNote);
