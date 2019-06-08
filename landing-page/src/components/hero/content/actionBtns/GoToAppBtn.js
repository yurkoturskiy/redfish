import React from 'react'
import { css } from 'linaria'

const button = css`
  border: 1px solid lightgrey;
  border-radius: 4px;
  padding: 12px 12px 12px 12px;
  margin: 0 16px 0 16px;
`

function GoToAppBtn(props) {
  return <div className={button}>Go To App</div>
}

export default GoToAppBtn
