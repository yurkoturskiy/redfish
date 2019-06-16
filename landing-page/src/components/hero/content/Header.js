import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const header = css`
  font-size: 2.5rem;
  font-weight: 500;
  margin: 0 0 0 25px;
`

function Header(props) {
  return <h1 className={header}>Fullstack Boilerplate Web Application</h1>
}

export default Header
