import React from 'react'
import { css } from 'linaria'

const dialog = css`
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -158px;
  margin-left: -280px;
  z-index: 6;
`

const background = css`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
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
          width="560"
          height="315"
          src="https://www.youtube.com/embed/yOM1nbqirQQ"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        />
      </div>
      <div className={background} onClick={() => props.setDialog(false)} />
    </React.Fragment>
  )
}

export default VideoDialog
