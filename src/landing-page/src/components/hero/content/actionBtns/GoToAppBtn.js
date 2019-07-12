import React from 'react'
import { navigate, Link } from 'gatsby'
import Button from '../../../styledUIElements/Button'

function GoToAppBtn(props) {
  return (
    <Button
      onClick={() => navigate('/authentication/navigate', { replace: true })}
    >
      Go to app
    </Button>
  )
}

export default GoToAppBtn
