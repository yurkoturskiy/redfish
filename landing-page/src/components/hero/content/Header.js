import React from 'react'
import { css } from 'linaria'

const header = css`
  font-size: 2.5rem;
  font-weight: 400;
`

function Header(props) {
  return <h1 className={header}>Fullstack Boilerplate Web Application</h1>
}

export default Header
