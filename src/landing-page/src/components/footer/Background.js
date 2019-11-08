import React, { useState, useEffect } from 'react'
import Particle from '../styledUIElements/Particle'

function Background() {
  const [sceneWidth, setSceneWidth] = useState(0)
  const [sceneHeight, setSceneHeight] = useState(0)
  const [numOfParticles, setNumOfParticles] = useState(0)

  useEffect(() => {
    let width = window.innerWidth > 1280 ? 1280 : window.innerWidth
    setSceneWidth(width)
    let height = 1300
    setSceneHeight(height)

    const maxSide = Math.max(window.innerWidth, window.innerHeight)

    setNumOfParticles(() => {
      let num = Math.floor(width / 50)
      return num < 10 ? 10 : num
    })
  })

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
