import React from 'react'
import { Link } from 'gatsby'
import icon from '../../images/redfish-color-logo.svg'
import { css } from 'linaria'

export const logo = css`
  position: absolute;
  top: 32px;
  left: 32px;
  width: 44px;
  height: 44px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 12px;
`

function Logo(props) {
  return (
    <Link to="/">
      <img className={logo} src={icon} height="44px" width="44px" />
    </Link>
  )
}

export default Logo
