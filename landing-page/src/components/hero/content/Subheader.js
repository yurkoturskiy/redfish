import React from 'react'
import { css } from 'linaria'

const subheader = css`
  font-size: 18px;
`

function Subheader(props) {
  return <h2 className={subheader}>ReactJS, GraphQL, and Django inside</h2>
}

export default Subheader
