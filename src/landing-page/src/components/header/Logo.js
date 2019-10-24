import React from 'react'
import { Link } from 'gatsby'
import icon from '../../images/redfish-color-logo.svg'
import RedfishLogoSolid from '../../images/RedfishLogoSolid'

import PrimitivoTransitionLink from '../styledUIElements/PrimitivoTransitionLink'

function Logo() {
  return (
    <PrimitivoTransitionLink to="/" className="logo">
      <div>
        <RedfishLogoSolid />
        <span>Redfish</span>
      </div>
    </PrimitivoTransitionLink>
  )
}

export default Logo
