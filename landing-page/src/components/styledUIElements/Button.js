import React from 'react'
import { css, cx } from 'linaria'

const base = css`
  display: inline-block;
`

const big = css`
  padding: 12px;
  margin: 8px;
  border-radius: 8px;
`

const filled = css`
  background-color: lightblue;
`

function Button(props) {
  return <div className={cx(base, big, filled)}>{props.children}</div>
}

export default Button
