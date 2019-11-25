import React from 'react'
import Button from '@material/react-button'
// Local components
import PlayIcon from '../../../../images/PlayIcon'

function BrieflyAboutBtn({ setDialog }) {
  const leftIcon = <PlayIcon />
  return (
    <div style={{ height: '52px' }}>
      <Button
        id="briefly-about"
        outlined={true}
        className="material-button"
        style={{ display: 'none' }}
        icon={leftIcon}
        onClick={() => setDialog(true)}
      >
        Briefly about
      </Button>
    </div>
  )
}

export default BrieflyAboutBtn
