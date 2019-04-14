import React from 'react'
import { Mutation } from 'react-apollo'
import MaterialIcon from '@material/react-material-icon'
// queries
import { SWITCH_NOTES_SELECTOR } from './../queries'

function Selector(props) {
  return (
    <Mutation 
      mutation={SWITCH_NOTES_SELECTOR} 
      update={props.handleSelection}
      variables={props.variables}
    >
      {switchNotesSelector => (
        <div className="container">
          <MaterialIcon 
            className="checkmark" 
            onClick={switchNotesSelector} 
            icon='check_circle' 
          />
        </div>
      )}
    </Mutation>
  )
}

export default Selector