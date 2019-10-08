import React from 'react'
import Particle from '../styledUIElements/Particle'

function Background() {
  var sceneWidth = window.innerWidth > 1280 ? 1280 : window.innerWidth
  var sceneHeight = 1300

  const maxSide =
    window.innerWidth >= window.innerHeight
      ? window.innerWidth
      : window.innerHeight

  var numOfParticles = Math.floor(sceneWidth / 50)
  numOfParticles = numOfParticles < 10 ? 10 : numOfParticles
  const particles = []
  for (let i = 0; i < numOfParticles; i++) {
    particles[i] = (
      <Particle
        key={`particle-num-${i}`}
        sceneWidth={sceneWidth}
        sceneHeight={sceneHeight}
      />
    )
  }

  return (
    <svg
      preserveAspectRatio="xMidYMid slice"
      className="background"
      width={sceneWidth}
      height={sceneHeight}
      viewBox={`0 0 ${sceneWidth} ${sceneHeight}`}
    >
      {particles}
    </svg>
  )
}

export default Background
