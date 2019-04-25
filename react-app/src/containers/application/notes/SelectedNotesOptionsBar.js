import React from 'react'
import styled from 'styled-components'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

const BarWrapperStyledDiv = styled.div`
  position: absolute;
  display: ${props => props.display};
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
      console.log(data)
      const numNotesSelected = data.selectedNotes.length
      return (
        <BarWrapperStyledDiv display={numNotesSelected ? 'block' : 'none'}>
          <p>items selected: {numNotesSelected}</p>
        </BarWrapperStyledDiv>
      )
    }}

    </Query>
  )
}

export default SelectedNotesOptionsBar