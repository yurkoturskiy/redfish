import React, { useState, useEffect } from 'react'
import Button from '@material/react-button'
import PrimitivoTransitionLink from '../../../styledUIElements/PrimitivoTransitionLink'

function GoToAppBtn(props) {
  return (
    <PrimitivoTransitionLink to="/authentication/">
      <Button className="material-button">Go to app</Button>
    </PrimitivoTransitionLink>
  )
}

export default GoToAppBtn
