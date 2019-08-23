import React from 'react'
import Button from '@material/react-button'
// Local components
import PlayIcon from '../../../../images/PlayIcon'

function BrieflyAboutBtn({ setDialog }) {
  const leftIcon = <PlayIcon />
  return (
    <Button
      id="briefly-about"
      className="material-button"
      icon={leftIcon}
      onClick={() => setDialog(true)}
    >
      Briefly about
    </Button>
  )
}

export default BrieflyAboutBtn
