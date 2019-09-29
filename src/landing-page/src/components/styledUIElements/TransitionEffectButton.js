import React, { useState, useEffect } from 'react'
import Button from '@material/react-button'
import PrimitivoTransitionLink from './PrimitivoTransitionLink'

function TransitionEffectButton({ to, children }) {
  return (
    <PrimitivoTransitionLink className="button-link" to={to}>
      <Button className="material-button">{children}</Button>
    </PrimitivoTransitionLink>
  )
}

export default TransitionEffectButton
