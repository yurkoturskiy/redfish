import React from 'react'
import { css } from 'linaria' // eslint-disable-line
import { navigate } from 'gatsby'
import Button from '@material/react-button'

function GoToAppBtn(props) {
  return (
    <Button onClick={() => navigate('/authentication/navigate')}>
      Go to app
    </Button>
  )
}

export default GoToAppBtn
