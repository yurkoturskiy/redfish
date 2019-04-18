import React from 'react'
import styled from 'styled-components'
import icon from '../../static/icon.svg'

export const IconStyledDiv = styled.div`
  position: fixed;
  bottom: 32px;
  left: 32px;
  width: 38px;
  height: 38px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
  border-radius: 32px;
  background-color: black;
`

function PreferencesBtn() {
  return (
    <IconStyledDiv />
  )
}

export default PreferencesBtn