import React from 'react'
import { navigate } from 'gatsby'
import Button from '@material/react-button'

function GoToAppBtn(props) {
  return (
    <Button
      className="material-button"
      onClick={() => navigate('/authentication/navigate', { replace: true })}
    >
      Go to app
    </Button>
  )
}

export default GoToAppBtn
