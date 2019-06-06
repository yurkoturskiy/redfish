import React from "react";
// local components
import Notes from "./Notes";
import AddNote from "./AddNote";

function NotesContainer() {
	return (
		<React.Fragment>
			<AddNote />
			<Notes />
		</React.Fragment>
	);
}

export default NotesContainer;
