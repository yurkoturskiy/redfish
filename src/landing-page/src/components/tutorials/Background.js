import React from 'react'
import Particle from '../styledUIElements/Particle'

function Background() {
  const maxSide =
    window.innerWidth >= window.innerHeight
      ? window.innerWidth
      : window.innerHeight

  var numOfParticles = Math.floor(maxSide / 60)
  numOfParticles = numOfParticles < 10 ? 10 : numOfParticles
  const particles = []
  for (let i = 0; i < numOfParticles; i++) {
    particles[i] = <Particle key={`particle-num-${i}`} />
  }

  return (
    <svg
      preserveAspectRatio="xMidYMid slice"
      className="background"
      viewBox={`0 0 ${window.innerWidth} ${window.innerHeight}`}
    >
      {particles}
    </svg>
  )
}

export default Background
