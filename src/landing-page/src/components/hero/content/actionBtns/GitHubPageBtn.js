import React from 'react'
import Button from '@material/react-button'

function GitHubPageBtn(props) {
  return (
    <Button
      className="material-button"
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
