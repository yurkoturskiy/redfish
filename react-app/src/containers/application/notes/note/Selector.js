import React from 'react'
import PropTypes from 'prop-types'
import { Mutation } from 'react-apollo'
import MaterialIcon from '@material/react-material-icon'
import styled from 'styled-components'
// queries
import { SWITCH_NOTES_SELECTOR } from './../queries'

export const CheckmarkContainerStyledDiv = styled.div`
  position: absolute;
  padding: 0px;
  height: 18px;
  width: 18px;
  border-radius: 12px;
  background-color: ${(props) => props.isSelected ? "grey" : "white"};
  top: 0;
  left: 0;
  opacity: ${(props) => props.isSelected ? 100 : 0};
  transition: opacity 0.4s, background-color 0.2s;
`

export const CheckmarkStyledMaterialIcon = styled(MaterialIcon)`
  transform:translate(-3px, -3px);
  font-size: 24px;
  fill: #3E3E3E;
  user-select: none;
`

function Selector(props) {
  return (
    <Mutation 
      mutation={SWITCH_NOTES_SELECTOR} 
      update={props.handleSelection}
      variables={props.variables}
    >
      {switchNotesSelector => (
        <CheckmarkContainerStyledDiv isSelected={props.isSelected}>
          <CheckmarkStyledMaterialIcon
            onClick={switchNotesSelector} 
            icon='check_circle' 
          />
        </CheckmarkContainerStyledDiv>
      )}
    </Mutation>
  )
}

Selector.propTypes = {
  isSelected: PropTypes.bool,
  handleSelection: PropTypes.func,
  variables: PropTypes.object,
}

export default Selector