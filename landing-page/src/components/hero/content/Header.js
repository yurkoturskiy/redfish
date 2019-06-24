import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const header = css`
  font-style: normal;
  font-weight: bold;
  font-size: 3rem;
  line-height: 56px;
  margin: 0 0 0 12px;
  color: #444444;
`

function Header(props) {
  return <h1 className={header}>Fullstack Boilerplate Web Application</h1>
}

export default Header
