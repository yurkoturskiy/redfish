import React from 'react'
import { navigate, Link } from 'gatsby'
import Button from '../../../styledUIElements/Button'

function GoToAppBtn(props) {
  return (
    <Link to="/authentication/navigate">
      <Button>Go to app</Button>
    </Link>
  )
}

export default GoToAppBtn
