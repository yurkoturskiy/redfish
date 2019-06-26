import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const dialog = css`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 560px;
  height: 315px;
  margin: auto;
  z-index: 6;
`

const video = css`
  /* Inherit size from dialog */
  width: 100%;
  height: 100%;
`

const background = css`
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: black;
  opacity: 0.6;
  z-index: 5;
  overflow: hidden;
`

function VideoDialog(props) {
  return (
    <React.Fragment>
      <div className={dialog}>
        <iframe
          className={video}
          title="briefly-about"
          src="https://www.youtube.com/embed/yOM1nbqirQQ"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <div className={background} onClick={() => props.setDialog(false)} />
    </React.Fragment>
  )
}

export default VideoDialog
