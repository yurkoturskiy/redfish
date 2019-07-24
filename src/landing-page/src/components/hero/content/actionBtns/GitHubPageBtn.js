import React from 'react'
import Button from '../../../styledUIElements/Button'

function GitHubPageBtn(props) {
  return (
    <Button
      onClick={() =>
        window.open('https://github.com/guandjoy/Redfish', '_blank')
      }
      romb="true"
    >
      GitHub
    </Button>
  )
}

export default GitHubPageBtn
