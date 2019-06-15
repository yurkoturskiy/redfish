import React from 'react'
import { css } from 'linaria'

const container = css`
  position: relative;
  height: 100vh;
  width: 100%;
  background-color: #2e353b;
`

function TutorialsContainer(props) {
  return (
    <div className={container}>
      <h2>Tutorials</h2>
      <iframe
        width="640"
        height="360"
        src="https://www.youtube.com/embed/videoseries?list=PLip1ThU0gOFb8GUDeuek69aalgyM4yQOI"
        frameborder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      />
    </div>
  )
}

export default TutorialsContainer
