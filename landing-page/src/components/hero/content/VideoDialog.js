import React from 'react'
import styled from 'styled-components'

function VideoDialog({ className, setDialog }) {
  return (
    <div className={className}>
      <div className="wrapper">
        <iframe
          className="video"
          title="briefly-about"
          src="https://www.youtube.com/embed/yOM1nbqirQQ"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className="background" onClick={() => setDialog(false)} />
    </div>
  )
}

const StyledComp = styled(VideoDialog)`
  .wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 560px;
    height: 315px;
    margin: auto;
    z-index: 6;
  }

  .video {
    /* Inherit size from dialog */
    width: inherit;
    height: inherit;
  }

  .background {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background-color: black;
    opacity: 0.6;
    z-index: 5;
    overflow: hidden;
  }
`

export default StyledComp
