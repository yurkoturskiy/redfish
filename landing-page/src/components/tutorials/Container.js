import React from 'react'
import { css } from 'linaria' // eslint-disable-line

const container = css`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: #2e353b;
`

const video = css`
  position: relative;
  padding: 0px auto 0px auto;
`

function TutorialsContainer(props) {
  return (
    <div className={container}>
      <h2>Tutorials</h2>
      <div>
        <iframe
          className={video}
          title="tutorials"
          width="640"
          height="360"
          src="https://www.youtube.com/embed/videoseries?list=PLip1ThU0gOFb8GUDeuek69aalgyM4yQOI"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default TutorialsContainer
