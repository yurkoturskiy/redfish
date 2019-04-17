import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// local components
import DeleteOption from './DeleteOption'
import ColorOption from './ColorOption'

export const OptionsContainerStyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  height: 32px;
  outline: 1px solid grey;
  width: 100%;
  left: 0;
  opacity: 0;
`

function OptionsContainer(props) {
  return (
    <OptionsContainerStyledDiv>
      <DeleteOption node={props.node}/>
      <ColorOption node={props.node}/>
    </OptionsContainerStyledDiv>
  )
}

OptionsContainer.propTypes = {
  node: PropTypes.object,
}

export default OptionsContainer