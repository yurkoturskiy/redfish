import React from 'react'
import { css } from 'linaria'

const header = css`
  font-size: 40px;
`

function Header(props) {
  return <h1 className={header}>Fullstack Boilerplate Web Application</h1>
}

export default Header
