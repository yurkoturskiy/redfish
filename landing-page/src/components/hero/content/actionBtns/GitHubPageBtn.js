import React from 'react'
import { css } from 'linaria' // eslint-disable-line
import Button from '@material/react-button'

function GitHubPageBtn(props) {
  return (
    <Button
      onClick={() =>
        window.open('https://github.com/guandjoy/Redfish', '_blank')
      }
    >
      GitHub Page
    </Button>
  )
}

export default GitHubPageBtn
