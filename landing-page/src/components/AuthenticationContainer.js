import React from 'react'
import { css } from 'linaria'

const wrapper = css`
  width: 300px;
  padding: 24px;
  boder: 1px solid lightgrey;
`

function AuthenticationContainer(props) {
  return <div className={wrapper}>Authentication container</div>
}

export default AuthenticationContainer
