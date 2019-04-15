import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// local components
import DeleteOption from './DeleteOption'

export const OptionsContainerStyledDiv = styled.div`
  height: 48px;
  outline: 1px solid grey;
  width: 100%;
  left: 0;
`

function OptionsContainer(props) {
  return (
    <OptionsContainerStyledDiv>
      <DeleteOption node={props.node}/>
    </OptionsContainerStyledDiv>
  )
}

OptionsContainer.propTypes = {
  node: PropTypes.object,
}

export default OptionsContainer