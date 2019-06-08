import React from 'react'
import { css } from 'linaria'

const wrapper = css`
  display: flex;
  align-items: center;
`

function ActionBtnsWrapper(props) {
  return <div className={wrapper}>{props.children}</div>
}

export default ActionBtnsWrapper
