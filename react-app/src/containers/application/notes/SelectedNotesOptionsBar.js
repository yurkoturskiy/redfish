import React from 'react'
import { css } from 'linaria'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const barWrapper = css`
  position: fixed;
  display: var(--selected-notes-options-bar-wrapper-display);
  top: 0;
  left: 50%;
  z-index: 4;
  width: 500px;
  height: 48px;
  margin-left: -250px;
  background-color: lightgrey;
`
const query = gql`
  query {
    selectedNotes @client
  }
`
function SelectedNotesOptionsBar(props) {
  return (
    <Query query={query}>
    {({ loading, error, data, fetchMore }) => {
      if (loading) return <p>Loading...</p>
      if (error) return <p>Error</p>
      const numNotesSelected = data.selectedNotes.length
      return (
        <div 
          className={barWrapper}
          style={{'--selected-notes-options-bar-wrapper-display': numNotesSelected ? 'block' : 'none'}}
        >
          <p>items selected: {numNotesSelected}</p>
        </div>
      )
    }}

    </Query>
  )
}

export default SelectedNotesOptionsBar