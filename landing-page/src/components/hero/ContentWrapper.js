import React from 'react'
import { css } from 'linaria'

const content = css`
  position: absolute;
  top: 300px;
  left: 180px;
  border: 1px solid grey;
`

function ContentWrapper(props) {
  return <div className={content}>{props.children}</div>
}

export default ContentWrapper
