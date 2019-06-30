import React from 'react'
import { Link } from 'gatsby'
import icon from '../../images/redfish-color-logo.svg'
import RedfishLogoSolid from '../../images/RedfishLogoSolid'

function Logo() {
  return (
    <Link to="/">
      <div className="logo">
        <RedfishLogoSolid />
        <span>Redfish</span>
      </div>
    </Link>
  )
}

export default Logo
