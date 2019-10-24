import React from 'react'
import { Link } from 'gatsby'
import icon from '../../images/redfish-color-logo.svg'
import RedfishLogoSolid from '../../images/RedfishLogoSolid'

import PrimitivoTransitionLink from '../styledUIElements/PrimitivoTransitionLink'

function Logo() {
  return (
    <div className="logo">
      <PrimitivoTransitionLink to="/">
        <RedfishLogoSolid />
        <span>Redfish</span>
      </PrimitivoTransitionLink>
    </div>
  )
}

export default Logo
