import React from 'react'
import Button from '@material/react-button'

function ExternalLinkButton({ to, children }) {
  return (
    <a className="button-link" href={to}>
      <Button className="material-button">{children}</Button>
    </a>
  )
}

export default ExternalLinkButton
