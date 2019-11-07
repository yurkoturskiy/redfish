import React, { useState, useEffect } from 'react'
import Button from '@material/react-button'
import PrimitivoTransitionLink from './PrimitivoTransitionLink'

function TransitionEffectButton(props) {
  return (
    <PrimitivoTransitionLink className="button-link" {...props}>
      <Button {...props} className="material-button">
        {props.children}
      </Button>
    </PrimitivoTransitionLink>
  )
}

export default TransitionEffectButton
