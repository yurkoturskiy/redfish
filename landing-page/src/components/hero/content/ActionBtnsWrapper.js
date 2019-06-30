import React from 'react'
import styled from 'styled-components'

function ActionBtnsWrapper({ className, children }) {
  return <div className={className}>{children}</div>
}

const StyledComp = styled(ActionBtnsWrapper)`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0;

  @media screen and (max-width: 540px) {
    flex-direction: column;
  }
`

export default StyledComp
